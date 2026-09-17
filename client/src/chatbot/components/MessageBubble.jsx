function MessageBubble({ role, message }) {
  const isUser = role === "user";

  return (
    <div
      className={`flex mb-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          max-w-[85%]
          px-3.5
          py-2.5
          rounded-2xl
          text-sm
          leading-relaxed
          shadow-sm
          break-words
          ${
            isUser ? "rounded-br-md" : "rounded-bl-md"
          }

          ${
            isUser
              ? "bg-pink-600 text-white"
              : "bg-white text-gray-800 border border-gray-100"
          }
        `}
      >
        {message}
      </div>
    </div>
  );
}

export default MessageBubble;