import { FaComments } from "react-icons/fa";

function ChatButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        fixed
        bottom-6
        right-6
        w-16
        h-16
        rounded-full
        bg-pink-600
        text-white
        shadow-xl
        hover:scale-110
        transition
        duration-300
        flex
        items-center
        justify-center
        z-50
      "
    >
      <FaComments size={28} />
    </button>
  );
}

export default ChatButton;