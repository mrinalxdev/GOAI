import SignInBtn from "@/components/buttons/SignInBtn";
import ThemeBtn from "@/components/buttons/ThemeBtn";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import Avatar from "@/components/Avatar";
import Logo from "../assets/Logo.png";
import Image from "next/image";
import SearchInput from "@/components/SearchInput";
import "./globals.css"

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <div className="w-full h-screen flex flex-col">
      <header className="py-6 px-4 border-b-2 dark:border-[#3c3c3c]">
        <div className="flex item-center justify-between container mx-auto">
          <ThemeBtn />

          {session ? <Avatar user={session.user?.name?.[0]} /> : <SignInBtn />}
        </div>
      </header>
      <main className="flex container mx-auto justify-center h-screen items-center flex-col gap-10">
        <Image src={Logo} alt="logo" className="rounded-full w-[250px]" />

        <SearchInput />
      </main>
      <footer></footer>
    </div>
  );
}
