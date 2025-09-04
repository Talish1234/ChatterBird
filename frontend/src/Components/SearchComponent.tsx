import MotionComponent from "./MotionComponent";
import InputField from "./InputFieldComponent/InputField";
import { CiSearch } from "react-icons/ci";
import { TbSearch, TbSearchOff } from "react-icons/tb";
import { useRef, useState, useEffect } from "react";
import { useDebounce } from "../utils/useDebounce";
import apiRequest from "../utils/apiRequest";
import UserCard from "./Cards/UserCard";

const SearchComponent = () => {
  const [searchItem, setSearchItem] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // Debounced value (wait 400ms after typing)
  const debouncedSearch = useDebounce(searchItem, 400);

  // API call on debounced value change
  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedSearch.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const res = await apiRequest.get(`/user?q=${debouncedSearch}`);
        const data = res.data;
        setResults(data.users || []);
      } catch (error) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedSearch]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearching(false);
        setSearchItem("");
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSearchClick = () => {
    if (!isSearching) {
      setIsSearching(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setIsSearching(false);
      setSearchItem("");
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      {isSearching && (
        <MotionComponent>
          <InputField
            ref={inputRef}
            type="text"
            value={searchItem}
            onChangeInputField={(e) => setSearchItem(e.target.value)}
            placeholder="Search..."
            className="border border-white px-3 py-1 rounded-2xl text-white 
                       bg-transparent placeholder-gray-300 focus:outline-none"
          />
        </MotionComponent>
      )}

      <button
        className="rounded-full p-1 border border-white hover:bg-white/20 transition"
        onClick={handleSearchClick}
      >
        {isSearching ? <TbSearchOff size={28} className="text-white" />: <TbSearch size={28} className="text-white" />}
      </button>

      {/* Dropdown Results */}
      {isSearching && searchItem && (
        <div className="absolute top-12 left-0 w-64 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
          {loading ? (
            <p className="p-3 text-gray-500">Loading...</p>
          ) : results.length > 0 ? (
            results.map((item, i) => (
              <div
                key={i}
                className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-none"
                onClick={() => {
                  setSearchItem("");
                  setIsSearching(false); // ✅ close dropdown
                }}
              >
                <UserCard user={item} />
              </div>
            ))
          ) : (
            <p className="p-3 text-gray-500">No results</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
