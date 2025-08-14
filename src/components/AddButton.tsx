import { FiPlus } from 'react-icons/fi';

interface AddButtonProps {
  onClick: () => void;
}

const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <>
      <button
        onClick={onClick}
        className="p-4 rounded-full bg-gray-800/30 text-white blurred border border-gray-700/40 hover:bg-white/30 shadow-lg transition duration-300 cursor-pointer"
      >
        <FiPlus className="w-6 h-6" />
      </button>
    </>
  );
};

export default AddButton;
