import { FaTimes } from "react-icons/fa";

function ChatHeader({ onClose }) {
  return (
    <div className="bg-gradient-to-r from-pink-600 to-rose-500 text-white px-4 py-3.5 flex items-center justify-between">

      <div>

        <h2 className="font-bold text-base sm:text-lg">
          Sweet Bakery Assistant
        </h2>

        <p className="text-xs sm:text-sm flex items-center gap-2 text-pink-100">

          <span className="w-2 h-2 bg-green-400 rounded-full"></span>

          Online

        </p>

      </div>

      <button
        type="button"
        aria-label="Close chat assistant"
        onClick={onClose}
        className="hover:bg-white/20 active:bg-white/30 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/70"
      >
        <FaTimes />
      </button>

    </div>
  );
}

export default ChatHeader;