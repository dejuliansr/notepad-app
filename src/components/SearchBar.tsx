import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <>
      <div className="relative w-full mb-4">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search note..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 pl-10 rounded bg-gray-800 text-white border-none outline-none focus:outline-none focus:ring-0"
        />
      </div>
    </>
  );
};

export default SearchBar;
