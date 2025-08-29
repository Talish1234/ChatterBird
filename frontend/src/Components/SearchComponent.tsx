import MotionComponent from "./MotionComponent";
import InputField from "./InputFieldComponent/InputField";
import { CiSearch } from "react-icons/ci";
import { useRef, useState } from "react";

const SearchComponent = ({ onSearch }: { onSearch?: (query: string) => void }) => {
  const [searchItem, setSearchItem] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSearchClick = () => {
    if (!isSearching) {
      setIsSearching(true);
      setTimeout(() => inputRef.current?.focus(), 100); // Auto-focus when input appears
    } else {
      if (onSearch) onSearch(searchItem);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(searchItem);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {isSearching && (
        <MotionComponent>
          <InputField
            ref={inputRef}
            type="text"
            value={searchItem}
            onChangeInputField={(e) => setSearchItem(e.target.value)}
            placeholder="Search..."
            onKeyDown={handleKeyDown}
            className="border border-white px-3 py-1 rounded-2xl text-white 
                       bg-transparent placeholder-gray-300 focus:outline-none"
          />
        </MotionComponent>
      )}

      <button
        className="rounded-full p-1 border border-white hover:bg-white/20 transition"
        onClick={handleSearchClick}
      >
        <CiSearch size={28} className="text-white" />
      </button>
    </div>
  );
};

export default SearchComponent;
