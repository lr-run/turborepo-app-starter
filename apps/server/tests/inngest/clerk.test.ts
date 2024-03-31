import type { UserJSON } from '@clerk/backend'
import { describe, expect, it } from 'vitest'

import { db } from '../../src/connection'
import { syncUser } from '../../src/inngest/functions/clerk'
import { genId } from '../../src/models/utils'

// MEMO: webhook event type is different from the actual event
const event = {
  name: 'clerk/user.updated',
  data: {
    birthday: '',
    created_at: 1654012591514,
    email_addresses: [
      {
        email_address: 'example@example.org',
        id: 'idn_29w83yL7CwVlJXylYLxcslromF1',
        linked_to: [],
        object: 'email_address',
        reserved: true,
        verification: {
          attempts: null,
          expire_at: null,
          status: 'verified',
          strategy: 'admin',
        },
      },
    ],
    external_accounts: [],
    external_id: null,
    first_name: 'Example',
    gender: '',
    id: 'user_29w83sxmDNGwOuEthce5gg56FcC',
    image_url: 'https://img.clerk.com/xxxxxx',
    last_name: null,
    last_sign_in_at: null,
    object: 'user',
    password_enabled: true,
    phone_numbers: [],
    primary_email_address_id: 'idn_29w83yL7CwVlJXylYLxcslromF1',
    primary_phone_number_id: null,
    primary_web3_wallet_id: null,
    private_metadata: {},
    profile_image_url: 'https://www.gravatar.com/avatar?d=mp',
    public_metadata: {},
    two_factor_enabled: false,
    unsafe_metadata: {},
    updated_at: 1654012824306,
    username: null,
    web3_wallets: [],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any as UserJSON,
  id: '01HT9EVADPG1GR6P9X4MH0XCAF',
  ts: 1711862032822,
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const emailAddress = event.data.email_addresses.find(
  (e) => e.id === event.data.primary_email_address_id,
)!.email_address

describe('[inngest] clerk webhooks', () => {
  describe('syncUser()', () => {
    it('should sync a new user', async () => {
      await syncUser(event)

      const user = await db
        .selectFrom('User')
        .selectAll()
        .where('clerkId', '=', event.data.id)
        .executeTakeFirst()

      expect(user?.email).toBe(emailAddress)
      expect(user?.emailVerified).toBe(true)
    })
  })

  it('should sync an existing user', async () => {
    await db
      .insertInto('User')
      .values({
        id: genId(),
        clerkId: event.data.id,
        email: 'old@example.org',
        emailVerified: true,
      })
      .execute()

    await syncUser(event)

    const user = await db
      .selectFrom('User')
      .selectAll()
      .where('clerkId', '=', event.data.id)
      .executeTakeFirst()

    expect(user?.email).toBe(emailAddress)
    expect(user?.emailVerified).toBe(true)
  })
})
