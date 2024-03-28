import type { Membership } from '@prisma/client'
import type { User } from '@prisma/client'
import type { Workspace } from '@prisma/client'
import { Prisma } from '@prisma/client'
import type { PrismaClient } from '@prisma/client'
import {
  createInitializer,
  ModelWithFields,
  createScreener,
  getScalarFieldValueGenerator,
  Resolver,
  normalizeResolver,
  normalizeList,
  getSequenceCounter,
} from '@quramy/prisma-fabbrica/lib/internal'
export {
  resetSequence,
  registerScalarFieldValueGenerator,
  resetScalarFieldValueGenerator,
} from '@quramy/prisma-fabbrica/lib/internal'

type BuildDataOptions = {
  readonly seq: number
}

const initializer = createInitializer()

const { getClient } = initializer

export const { initialize } = initializer

const modelFieldDefinitions: ModelWithFields[] = [
  {
    name: 'Membership',
    fields: [
      {
        name: 'user',
        type: 'User',
        relationName: 'MembershipToUser',
      },
      {
        name: 'workspace',
        type: 'Workspace',
        relationName: 'MembershipToWorkspace',
      },
    ],
  },
  {
    name: 'User',
    fields: [
      {
        name: 'memberships',
        type: 'Membership',
        relationName: 'MembershipToUser',
      },
    ],
  },
  {
    name: 'Workspace',
    fields: [
      {
        name: 'users',
        type: 'Membership',
        relationName: 'MembershipToWorkspace',
      },
    ],
  },
]

type MembershipScalarOrEnumFields = {
  id: string
}

type MembershipuserFactory = {
  _factoryFor: 'User'
  build: () => PromiseLike<
    Prisma.UserCreateNestedOneWithoutMembershipsInput['create']
  >
}

type MembershipworkspaceFactory = {
  _factoryFor: 'Workspace'
  build: () => PromiseLike<
    Prisma.WorkspaceCreateNestedOneWithoutUsersInput['create']
  >
}

type MembershipFactoryDefineInput = {
  id?: string
  user:
    | MembershipuserFactory
    | Prisma.UserCreateNestedOneWithoutMembershipsInput
  workspace:
    | MembershipworkspaceFactory
    | Prisma.WorkspaceCreateNestedOneWithoutUsersInput
}

type MembershipFactoryDefineOptions = {
  defaultData: Resolver<MembershipFactoryDefineInput, BuildDataOptions>
  traits?: {
    [traitName: string | symbol]: {
      data: Resolver<Partial<MembershipFactoryDefineInput>, BuildDataOptions>
    }
  }
}

function isMembershipuserFactory(
  x:
    | MembershipuserFactory
    | Prisma.UserCreateNestedOneWithoutMembershipsInput
    | undefined,
): x is MembershipuserFactory {
  return (x as any)?._factoryFor === 'User'
}

function isMembershipworkspaceFactory(
  x:
    | MembershipworkspaceFactory
    | Prisma.WorkspaceCreateNestedOneWithoutUsersInput
    | undefined,
): x is MembershipworkspaceFactory {
  return (x as any)?._factoryFor === 'Workspace'
}

type MembershipTraitKeys<TOptions extends MembershipFactoryDefineOptions> =
  keyof TOptions['traits']

export interface MembershipFactoryInterfaceWithoutTraits {
  readonly _factoryFor: 'Membership'
  build(
    inputData?: Partial<Prisma.MembershipCreateInput>,
  ): PromiseLike<Prisma.MembershipCreateInput>
  buildCreateInput(
    inputData?: Partial<Prisma.MembershipCreateInput>,
  ): PromiseLike<Prisma.MembershipCreateInput>
  buildList(
    inputData: number | readonly Partial<Prisma.MembershipCreateInput>[],
  ): PromiseLike<Prisma.MembershipCreateInput[]>
  pickForConnect(inputData: Membership): Pick<Membership, 'id'>
  create(
    inputData?: Partial<Prisma.MembershipCreateInput>,
  ): PromiseLike<Membership>
  createList(
    inputData: number | readonly Partial<Prisma.MembershipCreateInput>[],
  ): PromiseLike<Membership[]>
  createForConnect(
    inputData?: Partial<Prisma.MembershipCreateInput>,
  ): PromiseLike<Pick<Membership, 'id'>>
}

export interface MembershipFactoryInterface<
  TOptions extends
    MembershipFactoryDefineOptions = MembershipFactoryDefineOptions,
> extends MembershipFactoryInterfaceWithoutTraits {
  use(
    name: MembershipTraitKeys<TOptions>,
    ...names: readonly MembershipTraitKeys<TOptions>[]
  ): MembershipFactoryInterfaceWithoutTraits
}

function autoGenerateMembershipScalarsOrEnums({
  seq,
}: {
  readonly seq: number
}): MembershipScalarOrEnumFields {
  return {
    id: getScalarFieldValueGenerator().String({
      modelName: 'Membership',
      fieldName: 'id',
      isId: true,
      isUnique: false,
      seq,
    }),
  }
}

function defineMembershipFactoryInternal<
  TOptions extends MembershipFactoryDefineOptions,
>({
  defaultData: defaultDataResolver,
  traits: traitsDefs = {},
}: TOptions): MembershipFactoryInterface<TOptions> {
  const getFactoryWithTraits = (
    traitKeys: readonly MembershipTraitKeys<TOptions>[] = [],
  ) => {
    const seqKey = {}
    const getSeq = () => getSequenceCounter(seqKey)
    const screen = createScreener('Membership', modelFieldDefinitions)
    const build = async (
      inputData: Partial<Prisma.MembershipCreateInput> = {},
    ) => {
      const seq = getSeq()
      const requiredScalarData = autoGenerateMembershipScalarsOrEnums({ seq })
      const resolveValue = normalizeResolver<
        MembershipFactoryDefineInput,
        BuildDataOptions
      >(defaultDataResolver ?? {})
      const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
        const acc = await queue
        const resolveTraitValue = normalizeResolver<
          Partial<MembershipFactoryDefineInput>,
          BuildDataOptions
        >(traitsDefs[traitKey]?.data ?? {})
        const traitData = await resolveTraitValue({ seq })
        return {
          ...acc,
          ...traitData,
        }
      }, resolveValue({ seq }))
      const defaultAssociations = {
        user: isMembershipuserFactory(defaultData.user)
          ? {
              create: await defaultData.user.build(),
            }
          : defaultData.user,
        workspace: isMembershipworkspaceFactory(defaultData.workspace)
          ? {
              create: await defaultData.workspace.build(),
            }
          : defaultData.workspace,
      }
      const data: Prisma.MembershipCreateInput = {
        ...requiredScalarData,
        ...defaultData,
        ...defaultAssociations,
        ...inputData,
      }
      return data
    }
    const buildList = (
      inputData: number | readonly Partial<Prisma.MembershipCreateInput>[],
    ) => Promise.all(normalizeList(inputData).map((data) => build(data)))
    const pickForConnect = (inputData: Membership) => ({
      id: inputData.id,
    })
    const create = async (
      inputData: Partial<Prisma.MembershipCreateInput> = {},
    ) => {
      const data = await build(inputData).then(screen)
      return await getClient<PrismaClient>().membership.create({ data })
    }
    const createList = (
      inputData: number | readonly Partial<Prisma.MembershipCreateInput>[],
    ) => Promise.all(normalizeList(inputData).map((data) => create(data)))
    const createForConnect = (
      inputData: Partial<Prisma.MembershipCreateInput> = {},
    ) => create(inputData).then(pickForConnect)
    return {
      _factoryFor: 'Membership' as const,
      build,
      buildList,
      buildCreateInput: build,
      pickForConnect,
      create,
      createList,
      createForConnect,
    }
  }
  const factory = getFactoryWithTraits()
  const useTraits = (
    name: MembershipTraitKeys<TOptions>,
    ...names: readonly MembershipTraitKeys<TOptions>[]
  ) => {
    return getFactoryWithTraits([name, ...names])
  }
  return {
    ...factory,
    use: useTraits,
  }
}

/**
 * Define factory for {@link Membership} model.
 *
 * @param options
 * @returns factory {@link MembershipFactoryInterface}
 */
export function defineMembershipFactory<
  TOptions extends MembershipFactoryDefineOptions,
>(options: TOptions): MembershipFactoryInterface<TOptions> {
  return defineMembershipFactoryInternal(options)
}

type UserScalarOrEnumFields = {
  id: string
}

type UserFactoryDefineInput = {
  id?: string
  memberships?: Prisma.MembershipCreateNestedManyWithoutUserInput
}

type UserFactoryDefineOptions = {
  defaultData?: Resolver<UserFactoryDefineInput, BuildDataOptions>
  traits?: {
    [traitName: string | symbol]: {
      data: Resolver<Partial<UserFactoryDefineInput>, BuildDataOptions>
    }
  }
}

type UserTraitKeys<TOptions extends UserFactoryDefineOptions> =
  keyof TOptions['traits']

export interface UserFactoryInterfaceWithoutTraits {
  readonly _factoryFor: 'User'
  build(
    inputData?: Partial<Prisma.UserCreateInput>,
  ): PromiseLike<Prisma.UserCreateInput>
  buildCreateInput(
    inputData?: Partial<Prisma.UserCreateInput>,
  ): PromiseLike<Prisma.UserCreateInput>
  buildList(
    inputData: number | readonly Partial<Prisma.UserCreateInput>[],
  ): PromiseLike<Prisma.UserCreateInput[]>
  pickForConnect(inputData: User): Pick<User, 'id'>
  create(inputData?: Partial<Prisma.UserCreateInput>): PromiseLike<User>
  createList(
    inputData: number | readonly Partial<Prisma.UserCreateInput>[],
  ): PromiseLike<User[]>
  createForConnect(
    inputData?: Partial<Prisma.UserCreateInput>,
  ): PromiseLike<Pick<User, 'id'>>
}

export interface UserFactoryInterface<
  TOptions extends UserFactoryDefineOptions = UserFactoryDefineOptions,
> extends UserFactoryInterfaceWithoutTraits {
  use(
    name: UserTraitKeys<TOptions>,
    ...names: readonly UserTraitKeys<TOptions>[]
  ): UserFactoryInterfaceWithoutTraits
}

function autoGenerateUserScalarsOrEnums({
  seq,
}: {
  readonly seq: number
}): UserScalarOrEnumFields {
  return {
    id: getScalarFieldValueGenerator().String({
      modelName: 'User',
      fieldName: 'id',
      isId: true,
      isUnique: false,
      seq,
    }),
  }
}

function defineUserFactoryInternal<TOptions extends UserFactoryDefineOptions>({
  defaultData: defaultDataResolver,
  traits: traitsDefs = {},
}: TOptions): UserFactoryInterface<TOptions> {
  const getFactoryWithTraits = (
    traitKeys: readonly UserTraitKeys<TOptions>[] = [],
  ) => {
    const seqKey = {}
    const getSeq = () => getSequenceCounter(seqKey)
    const screen = createScreener('User', modelFieldDefinitions)
    const build = async (inputData: Partial<Prisma.UserCreateInput> = {}) => {
      const seq = getSeq()
      const requiredScalarData = autoGenerateUserScalarsOrEnums({ seq })
      const resolveValue = normalizeResolver<
        UserFactoryDefineInput,
        BuildDataOptions
      >(defaultDataResolver ?? {})
      const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
        const acc = await queue
        const resolveTraitValue = normalizeResolver<
          Partial<UserFactoryDefineInput>,
          BuildDataOptions
        >(traitsDefs[traitKey]?.data ?? {})
        const traitData = await resolveTraitValue({ seq })
        return {
          ...acc,
          ...traitData,
        }
      }, resolveValue({ seq }))
      const defaultAssociations = {}
      const data: Prisma.UserCreateInput = {
        ...requiredScalarData,
        ...defaultData,
        ...defaultAssociations,
        ...inputData,
      }
      return data
    }
    const buildList = (
      inputData: number | readonly Partial<Prisma.UserCreateInput>[],
    ) => Promise.all(normalizeList(inputData).map((data) => build(data)))
    const pickForConnect = (inputData: User) => ({
      id: inputData.id,
    })
    const create = async (inputData: Partial<Prisma.UserCreateInput> = {}) => {
      const data = await build(inputData).then(screen)
      return await getClient<PrismaClient>().user.create({ data })
    }
    const createList = (
      inputData: number | readonly Partial<Prisma.UserCreateInput>[],
    ) => Promise.all(normalizeList(inputData).map((data) => create(data)))
    const createForConnect = (
      inputData: Partial<Prisma.UserCreateInput> = {},
    ) => create(inputData).then(pickForConnect)
    return {
      _factoryFor: 'User' as const,
      build,
      buildList,
      buildCreateInput: build,
      pickForConnect,
      create,
      createList,
      createForConnect,
    }
  }
  const factory = getFactoryWithTraits()
  const useTraits = (
    name: UserTraitKeys<TOptions>,
    ...names: readonly UserTraitKeys<TOptions>[]
  ) => {
    return getFactoryWithTraits([name, ...names])
  }
  return {
    ...factory,
    use: useTraits,
  }
}

/**
 * Define factory for {@link User} model.
 *
 * @param options
 * @returns factory {@link UserFactoryInterface}
 */
export function defineUserFactory<TOptions extends UserFactoryDefineOptions>(
  options?: TOptions,
): UserFactoryInterface<TOptions> {
  return defineUserFactoryInternal(options ?? {})
}

type WorkspaceScalarOrEnumFields = {
  id: string
  name: string
  slug: string
}

type WorkspaceFactoryDefineInput = {
  id?: string
  name?: string
  slug?: string
  users?: Prisma.MembershipCreateNestedManyWithoutWorkspaceInput
}

type WorkspaceFactoryDefineOptions = {
  defaultData?: Resolver<WorkspaceFactoryDefineInput, BuildDataOptions>
  traits?: {
    [traitName: string | symbol]: {
      data: Resolver<Partial<WorkspaceFactoryDefineInput>, BuildDataOptions>
    }
  }
}

type WorkspaceTraitKeys<TOptions extends WorkspaceFactoryDefineOptions> =
  keyof TOptions['traits']

export interface WorkspaceFactoryInterfaceWithoutTraits {
  readonly _factoryFor: 'Workspace'
  build(
    inputData?: Partial<Prisma.WorkspaceCreateInput>,
  ): PromiseLike<Prisma.WorkspaceCreateInput>
  buildCreateInput(
    inputData?: Partial<Prisma.WorkspaceCreateInput>,
  ): PromiseLike<Prisma.WorkspaceCreateInput>
  buildList(
    inputData: number | readonly Partial<Prisma.WorkspaceCreateInput>[],
  ): PromiseLike<Prisma.WorkspaceCreateInput[]>
  pickForConnect(inputData: Workspace): Pick<Workspace, 'id'>
  create(
    inputData?: Partial<Prisma.WorkspaceCreateInput>,
  ): PromiseLike<Workspace>
  createList(
    inputData: number | readonly Partial<Prisma.WorkspaceCreateInput>[],
  ): PromiseLike<Workspace[]>
  createForConnect(
    inputData?: Partial<Prisma.WorkspaceCreateInput>,
  ): PromiseLike<Pick<Workspace, 'id'>>
}

export interface WorkspaceFactoryInterface<
  TOptions extends
    WorkspaceFactoryDefineOptions = WorkspaceFactoryDefineOptions,
> extends WorkspaceFactoryInterfaceWithoutTraits {
  use(
    name: WorkspaceTraitKeys<TOptions>,
    ...names: readonly WorkspaceTraitKeys<TOptions>[]
  ): WorkspaceFactoryInterfaceWithoutTraits
}

function autoGenerateWorkspaceScalarsOrEnums({
  seq,
}: {
  readonly seq: number
}): WorkspaceScalarOrEnumFields {
  return {
    id: getScalarFieldValueGenerator().String({
      modelName: 'Workspace',
      fieldName: 'id',
      isId: true,
      isUnique: false,
      seq,
    }),
    name: getScalarFieldValueGenerator().String({
      modelName: 'Workspace',
      fieldName: 'name',
      isId: false,
      isUnique: false,
      seq,
    }),
    slug: getScalarFieldValueGenerator().String({
      modelName: 'Workspace',
      fieldName: 'slug',
      isId: false,
      isUnique: true,
      seq,
    }),
  }
}

function defineWorkspaceFactoryInternal<
  TOptions extends WorkspaceFactoryDefineOptions,
>({
  defaultData: defaultDataResolver,
  traits: traitsDefs = {},
}: TOptions): WorkspaceFactoryInterface<TOptions> {
  const getFactoryWithTraits = (
    traitKeys: readonly WorkspaceTraitKeys<TOptions>[] = [],
  ) => {
    const seqKey = {}
    const getSeq = () => getSequenceCounter(seqKey)
    const screen = createScreener('Workspace', modelFieldDefinitions)
    const build = async (
      inputData: Partial<Prisma.WorkspaceCreateInput> = {},
    ) => {
      const seq = getSeq()
      const requiredScalarData = autoGenerateWorkspaceScalarsOrEnums({ seq })
      const resolveValue = normalizeResolver<
        WorkspaceFactoryDefineInput,
        BuildDataOptions
      >(defaultDataResolver ?? {})
      const defaultData = await traitKeys.reduce(async (queue, traitKey) => {
        const acc = await queue
        const resolveTraitValue = normalizeResolver<
          Partial<WorkspaceFactoryDefineInput>,
          BuildDataOptions
        >(traitsDefs[traitKey]?.data ?? {})
        const traitData = await resolveTraitValue({ seq })
        return {
          ...acc,
          ...traitData,
        }
      }, resolveValue({ seq }))
      const defaultAssociations = {}
      const data: Prisma.WorkspaceCreateInput = {
        ...requiredScalarData,
        ...defaultData,
        ...defaultAssociations,
        ...inputData,
      }
      return data
    }
    const buildList = (
      inputData: number | readonly Partial<Prisma.WorkspaceCreateInput>[],
    ) => Promise.all(normalizeList(inputData).map((data) => build(data)))
    const pickForConnect = (inputData: Workspace) => ({
      id: inputData.id,
    })
    const create = async (
      inputData: Partial<Prisma.WorkspaceCreateInput> = {},
    ) => {
      const data = await build(inputData).then(screen)
      return await getClient<PrismaClient>().workspace.create({ data })
    }
    const createList = (
      inputData: number | readonly Partial<Prisma.WorkspaceCreateInput>[],
    ) => Promise.all(normalizeList(inputData).map((data) => create(data)))
    const createForConnect = (
      inputData: Partial<Prisma.WorkspaceCreateInput> = {},
    ) => create(inputData).then(pickForConnect)
    return {
      _factoryFor: 'Workspace' as const,
      build,
      buildList,
      buildCreateInput: build,
      pickForConnect,
      create,
      createList,
      createForConnect,
    }
  }
  const factory = getFactoryWithTraits()
  const useTraits = (
    name: WorkspaceTraitKeys<TOptions>,
    ...names: readonly WorkspaceTraitKeys<TOptions>[]
  ) => {
    return getFactoryWithTraits([name, ...names])
  }
  return {
    ...factory,
    use: useTraits,
  }
}

/**
 * Define factory for {@link Workspace} model.
 *
 * @param options
 * @returns factory {@link WorkspaceFactoryInterface}
 */
export function defineWorkspaceFactory<
  TOptions extends WorkspaceFactoryDefineOptions,
>(options?: TOptions): WorkspaceFactoryInterface<TOptions> {
  return defineWorkspaceFactoryInternal(options ?? {})
}
