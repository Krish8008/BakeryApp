function MessageBubble({ role, message }) {
  const isUser = role === "user";

  return (
    <div
      className={`flex mb-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          max-w-[80%]
          px-4
          py-3
          rounded-2xl
          text-sm
          shadow

          ${
            isUser
              ? "bg-pink-600 text-white"
              : "bg-white text-gray-800"
          }
        `}
      >
        {message}
      </div>
    </div>
  );
}

export default MessageBubble;