import { SearchIcon } from "lucide-react";
import React from "react";

export default function QuickFilter({
  onSubmit,
}: {
  onSubmit: (value: string) => void;
}) {
  const [value, setValue] = React.useState<string>("");
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(value);
  };

  return (
    <form className="w-60" onSubmit={handleOnSubmit}>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <SearchIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          type="q"
          className="block w-full py-1.5 pe-2 ps-8 text-xs text-gray-900 border border-gray-200 bg-white outline-none focus:ring-none rounded-sm"
          placeholder="Filter..."
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </form>
  );
}
