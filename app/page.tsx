import SignInBtn from "@/components/buttons/SignInBtn";
import ThemeBtn from "@/components/buttons/ThemeBtn";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <div className="w-full h-screen flex flex-col">
      <header className="py-6 px-4 border-b-2 dark:border-[#3c3c3c]">
        <div className="flex item-center justify-between container mx-auto">
          <ThemeBtn />

          {session ? (
            <p className="btn text-[25px] flex items-center justify-center btn-circle dark:text-white dark:bg-neutral text-neutral bg-transparent hover:text-white">
              🙂
            </p>
          ) : (
            <SignInBtn />
          )}
        </div>
      </header>
      <main></main>
      <footer></footer>
    </div>
  );
}
