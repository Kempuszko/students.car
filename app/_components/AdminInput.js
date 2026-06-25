function AdminInput({
  text,
  data = "",
  formName,
  disabled = false,
  type = "text",
  inputMode,
  pattern,
  maxLength,
}) {
  return (
    <div
      className={` trannsition duration-150 flex gap-6 p-2 bg-surface rounded-2xl border-2 items-center w-full ${disabled ? "border-surfaceHover" : "border-gold-dark "} `}
    >
      <p className="font-semibold text-gold-dark">{text}</p>
      <input
        disabled={disabled}
        defaultValue={data}
        name={formName}
        className={`p-1 w-full ${type === "number" ? "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" : ""}`}
        type={type}
        inputMode={inputMode}
        pattern={pattern}
        maxLength={maxLength}
      />
    </div>
  );
}

export default AdminInput;
