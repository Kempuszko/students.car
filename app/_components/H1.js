function H1({ children, customClassName }) {
  return (
    <h1 className={`text-center font-bold text-3xl ${customClassName}`}>
      {children}
    </h1>
  );
}

export default H1;
