import {Button} from '@repo/ui'

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='pb-4 text-4xl'>turborepo-app-starter</h1>
      <Button>Hello world</Button>
    </div>
  );
}
