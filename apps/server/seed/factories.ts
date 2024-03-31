import {
  defineUserFactory,
  defineWorkspaceFactory,
} from '../src/__generated__/fabbrica'

export const UserFactory = defineUserFactory({})

export const WorkspaceFactory = defineWorkspaceFactory({
  defaultData: ({ seq }) => ({
    id: (seq + 1).toString(),
    slug: `workspace-${(seq + 1).toString()}`,
    name: `Workspace ${(seq + 1).toString()}`,
  }),
})
