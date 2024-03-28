import {
  defineMembershipFactory,
  defineUserFactory,
  defineWorkspaceFactory,
} from '@/src/__generated__/fabbrica'

export const UserFactory = defineUserFactory({})

export const MembershipFactory = defineMembershipFactory({
  defaultData: () => ({
    user: UserFactory,
    workspace: WorkspaceFactory,
  }),
})

export const WorkspaceFactory = defineWorkspaceFactory({
  defaultData: ({ seq }) => ({
    slug: `workspace-${seq + 1}`,
    name: `Workspace ${seq + 1}`,
  }),
})
