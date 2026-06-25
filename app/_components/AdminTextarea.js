function AdminTextarea({ text, data, formName, disabled = false }) {
  return (
    <div
      className={`flex transition-all duration-150 bg-surface rounded-2xl border-2 items-center p-2 flex-wrap ${disabled ? "border-surfaceHover" : "border-gold-dark "}`}
    >
      <p className=" font-semibold text-gold-dark w-full">{text}</p>
      <textarea
        disabled={disabled}
        defaultValue={data}
        name={formName}
        className="m-1 w-full h-28 resize-none overflow-y-scroll custom-scroll-mini"
      />
    </div>
  );
}

export default AdminTextarea;
