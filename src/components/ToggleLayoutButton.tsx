import { BsGridFill, BsListUl } from 'react-icons/bs';

interface ToggleLayoutButtonProps {
  layout: 'grid' | 'list';
  onToggle: () => void;
}

const ToggleLayoutButton = ({
  layout,
  onToggle,
}: ToggleLayoutButtonProps) => {
  return (
    <>
      <button
        onClick={onToggle}
        className="p-2 bg-gray-800/30 text-white blurred border border-gray-700/40 hover:bg-white/30 transition-colors duration-300 ease-in-out hidden sm:flex cursor-pointer"
      >
        <span
          className={`block transform transition-all duration-300 ease-in-out ${
            layout === 'grid'
              ? 'rotate-0 opacity-100'
              : 'rotate-180 opacity-100'
          }`}
        >
          {layout === 'grid' ? (
            <BsGridFill className="h-5 w-5" />
          ) : (
            <BsListUl className="h-5 w-5" />
          )}
        </span>
      </button>
    </>
  );
};

export default ToggleLayoutButton;
