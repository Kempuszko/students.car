function H2({ children, customClassName }) {
  return (
    <h2 className={`font-semibold text-2xl ${customClassName}`}>{children}</h2>
  );
}

export default H2;
