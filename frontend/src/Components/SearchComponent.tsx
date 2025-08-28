import MotionComponent from "./MotionComponent";
import InputField from "./InputFieldComponent/InputField";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";

const SearchComponent = () => {
  const [searchItem, setSearchItem] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const handleSearch = () => {
    if (!isSearching) setIsSearching(!isSearching);
    else {
      console.log(searchItem);
    }
  };
  return (
    <div className="flex items-center gap-2">
        {isSearching && (
          <MotionComponent>
            <InputField
              type="text"
              value={searchItem}
              onChangeInputField={(e) => setSearchItem(e.target.value)}
              placeholder="Search..."
              className="border-1 border-white px-4 py-1 rounded-2xl text-white"
            />
          </MotionComponent>
        )}
      <button className="border-1 rounded-full p-1 border-white bg-transparent" onClick={handleSearch}>
        <CiSearch size={30} color="white"/>
      </button>
    </div>
  );
};

export default SearchComponent;
