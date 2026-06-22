function Input({
  type,
  disabled = false,
  defaultValue = "",
  placeholder = "",
  name = "",
  required = false,
  onChange,
}) {
  const commonStyles =
    "mx-auto bg-background px-4 py-2 border border-gold-dark rounded-2xl placeholder-gray-700 transition-[background-color,_box-shadow,_border] w-full";

  return (
    <input
      className={`${commonStyles} ${defaultValue ? "font-bold" : ""}`}
      type={type}
      disabled={disabled}
      defaultValue={defaultValue}
      placeholder={placeholder}
      name={name}
      required={required}
      onChange={onChange}
    />
  );
}

export default Input;
