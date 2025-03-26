"use client";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { debounce } from "es-toolkit";
import { useCallback } from "react";
export default function SearchBar({
  handleChange,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const debouncedHandleChange = useCallback(debounce(handleChange, 500), [
    handleChange,
  ]);
  const [userInput, setUserInput] = useState("");
  return (
    <div className="flex flex-row items-center gap-2">
      <input
        type="text"
        value={userInput}
        placeholder="Search Plants"
        className="border-neutral-500 search-bar rounded-xl p-5 border-2  focus:outline-none focus:border-green-200"
        onChange={(e) => {
          setUserInput(e.target.value);
          debouncedHandleChange(e);
        }}
      />
      {userInput.length > 0 && (
        <div className="rounded-full p-5 bg-cyan-100 group hover:cursor-pointer hover:bg-cyan-200 transition duration-300 ease-in">
          <X onClick={() => setUserInput("")} />
        </div>
      )}

      {userInput.length === 0 && (
        <div className="rounded-full p-5 bg-cyan-100 group hover:cursor-pointer hover:bg-cyan-200 transition duration-300 ease-in">
          <Search />
        </div>
      )}
    </div>
  );
}
