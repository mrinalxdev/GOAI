"use client";
import Image from "next/image";
import { shallow } from "zustand/shallow";
import { useSearch } from "@/store/search";
import { useRouter } from "next/navigation";
import SearchIcon from "../assets/search.png";

const SearchInput = () => {
  const router = useRouter();
  const { search, setSearch } = useSearch(
    (state) => ({
      search: state.search,
      setSearch: state.setSearch,
    }),
    shallow
  );

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (search) {
      router.push("/search" + "?q=" + search + "&start=1");
    } else {
      return false
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative md:w-3/4 xl:W-1/2 w-full px-4"
    >
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Questify"
        className="input gr input-lg caret-black dark:caret-white dark:text-white pl-14  placeholder:font-semibold focus:outline-none shadow-md w-full"
      />
      <Image
        src={SearchIcon}
        width={35}
        height={35}
        className="absolute right-8 top-1/2 -translate-y-1/2"
        alt="Search icon"
      />
    </form>
  );
};

export default SearchInput;
