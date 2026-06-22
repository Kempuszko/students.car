function H3({ children, customClassName }) {
  return (
    <h3 className={`font-semibold text-xl pb-1 ${customClassName}`}>
      {children}
    </h3>
  );
}

export default H3;
