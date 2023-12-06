import SignInBtn from '@/components/buttons/SignInBtn'
import ThemeBtn from '@/components/buttons/ThemeBtn'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='w-full h-screen flex flex-col'>
      <header className='py-6 px-4 border-b-2 dark:border-[#3c3c3c]'>
        <div className='flex item-center justify-between container mx-auto'>
          <ThemeBtn />
          <SignInBtn />
        </div>
      </header>
      <main></main>
      <footer></footer>
    </div>
  )
}
