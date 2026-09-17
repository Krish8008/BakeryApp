function TypingIndicator() {

    return (

        <div className="flex justify-start mb-3">

            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 text-sm text-gray-500 shadow-sm">

                <span className="mr-2">🤖</span>
                <span className="animate-pulse">Typing...</span>

            </div>

        </div>

    );

}

export default TypingIndicator;