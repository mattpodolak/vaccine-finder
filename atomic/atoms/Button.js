export const Button = (props) => {
  const { children, ...rest } = props;
  return (
    <button
      {...rest}
      className="bg-one-normal border border-one-normal font-medium p-3 py-2 hover:bg-opacity-80 focus:outline-none focus:ring focus:ring-green-200 focus:ring-opacity-50 text-white transition duration-500 ease-in-out"
    >
      {children}
    </button>
  );
};
