import { Inngest, EventSchemas } from 'inngest'

import type { Events } from './types'

export const inngest = new Inngest({
  id: '@lr',
  schemas: new EventSchemas().fromRecord<Events>(),
})
