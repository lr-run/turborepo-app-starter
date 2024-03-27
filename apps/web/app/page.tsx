import { Button } from '@repo/ui'

export const Home = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="pb-4 text-4xl">turborepo-app-starter</h1>
      <Button>Hello world</Button>
    </div>
  )
}

export default Home
