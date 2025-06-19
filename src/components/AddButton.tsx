import { FiPlus } from 'react-icons/fi';

interface AddButtonProps {
  onClick: () => void;
}

const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <>
      <button
        onClick={onClick}
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 cursor-pointer"
      >
        <FiPlus className='w-6 h-6' />
      </button>
    </>
  );
};

export default AddButton;
