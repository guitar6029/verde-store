"use client";
import { Search } from "lucide-react";
import { useState } from "react";
import { debounce } from "es-toolkit";
import { useCallback } from "react";
export default function SearchBarWithClearBtn({
  handleChange,
  onClear,
}: {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}) {
  const debouncedHandleChange = useCallback(debounce(handleChange, 500), [
    handleChange,
  ]);
  const [userInput, setUserInput] = useState("");
  return (
    <div className="search-bar-container">
      <div className="flex flex-row items-center gap-5">
        <input
          type="text"
          value={userInput}
          placeholder="Search Plants"
          className="border-neutral-500 search-bar rounded-xl p-5 border-2  focus:outline-none focus:border-green-200"
          onChange={(e) => setUserInput(e.target.value)}
        />

        <button
          disabled={userInput.length === 0}
          onClick={() => {
            const mockEvent = {
              target: {
                value: userInput,
              },
              preventDefault: () => {},
              stopPropagation: () => {},
            };
            debouncedHandleChange(
              mockEvent as React.ChangeEvent<HTMLInputElement>
            );
          }}
          className="rounded-full p-5 disabled:bg-gray-300 disabled:cursor-default bg-green-200 group hover:cursor-pointer hover:bg-green-300 transition duration-300 ease-in border-2 border-white hover:border-green-300"
        >
          <Search className="group-hover:scale-105" />
        </button>
      </div>
      <button
        onClick={() => {
          setUserInput("");
          onClear();
        }}
        className="clear-btn rounded-xl p-2 verde text-5xl w-[150px] bg-cyan-100 hover:bg-cyan-200 transition duration-300 ease-in-out cursor-pointer"
      >
        Clear
      </button>
    </div>
  );
}
