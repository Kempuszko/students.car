function UL({ children, customClassName }) {
  return <ul className={`list-disc px-6 ${customClassName}`}>{children}</ul>;
}

export default UL;
