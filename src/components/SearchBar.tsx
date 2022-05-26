import React from "react";
import { MdSearch } from "react-icons/md";

const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        className="h-12 w-full appearance-none rounded-lg border-none bg-transparent pr-4 pl-12 text-base outline-none ring-1 ring-gray-200 focus:bg-transparent focus:ring-2 focus:ring-indigo-500 dark:ring-gray-700 dark:focus:ring-indigo-500"
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl" />
    </div>
  );
};

export default SearchBar;
