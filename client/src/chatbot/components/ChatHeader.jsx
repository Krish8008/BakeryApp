import { FaTimes } from "react-icons/fa";

function ChatHeader({ onClose }) {
  return (
    <div className="bg-pink-600 text-white p-4 flex items-center justify-between">

      <div>

        <h2 className="font-bold text-lg">
          Sweet Bakery Assistant
        </h2>

        <p className="text-sm flex items-center gap-2">

          <span className="w-2 h-2 bg-green-400 rounded-full"></span>

          Online

        </p>

      </div>

      <button
        onClick={onClose}
        className="hover:bg-pink-700 p-2 rounded-full"
      >
        <FaTimes />
      </button>

    </div>
  );
}

export default ChatHeader;