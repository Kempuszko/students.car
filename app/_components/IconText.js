function IconText({ icon, text, size }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${size === "small" ? "text-sm" : ""}`}
    >
      {icon}
      <span className="font-semibold text-gold-light">{text}</span>
    </div>
  );
}

export default IconText;
