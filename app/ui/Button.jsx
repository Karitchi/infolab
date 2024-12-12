const Button = ({ onClick, isVisible, children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isVisible
          ? "bg-red-500 hover:bg-red-600 text-white"
          : "bg-green-500 hover:bg-green-600 text-white"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
