export const getUserInfo = async () => {
  return await Promise.resolve({
    email: 'test@test.com',
    emailVerified: true,
    clerkId: 'test-clerk-id',
  })
}
