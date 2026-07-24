const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  error = "",
  required = false,
  disabled = false,
  readOnly = false,
  fullWidth = true,
  className = "",
  ...props
}) => {
  return (
    <div className={fullWidth ? "w-full" : ""}>
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        className={`w-full rounded-lg border px-4 py-2.5 outline-none transition
          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-black"
          }
          ${disabled ? "cursor-not-allowed bg-gray-100" : "bg-white"}
          ${readOnly ? "bg-gray-50" : ""}
          ${className}
        `}
        {...props}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
