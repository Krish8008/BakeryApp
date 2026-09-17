import { FaComments } from "react-icons/fa";

function ChatButton({ onClick }) {
  return (
    <button
      type="button"
      aria-label="Open chat assistant"
      onClick={onClick}
      className="
        fixed
        bottom-4
        right-4
        sm:bottom-6
        sm:right-6
        w-14
        h-14
        sm:w-16
        sm:h-16
        rounded-full
        bg-gradient-to-br from-pink-500 to-rose-600
        text-white
        shadow-lg shadow-pink-600/30
        hover:scale-105
        active:scale-95
        transition-transform
        duration-200
        flex
        items-center
        justify-center
        z-[60]
        focus:outline-none
        focus:ring-4
        focus:ring-pink-200
      "
    >
      <FaComments size={28} />
    </button>
  );
}

export default ChatButton;