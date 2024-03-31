import type { Clerk } from '@clerk/backend'

export const getUserInfo = async (
  clerkClient: ReturnType<typeof Clerk>,
  clerkId: string,
) => {
  const clerkUser = await clerkClient.users.getUser(clerkId)
  return {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    email: clerkUser.emailAddresses.find(
      (emailAddress) => emailAddress.id === clerkUser.primaryEmailAddressId,
    )!.emailAddress,
    // we trust the email is verified since we use the 'Verify at sign-up' option in Clerk.
    // change it if you are a diffent strategy.
    // https://clerk.com/blog/how-we-roll-email-verification#when-to-verify
    emailVerified: true,
    clerkId: clerkUser.id,
  }
}
