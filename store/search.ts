import {create} from "zustand";

interface SearchState{
    search : string;
    setSearch : (value: string) => void
}

export const useSearch = create<SearchState>()((set) => ({
    search:"",
    setSearch:(value) => set(() => ({search:value}))
}))
