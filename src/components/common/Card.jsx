const Card = ({
  children,
  className = "",
  padding = "md",
  shadow = "sm",
  border = true,
  rounded = "xl",
  onClick,
}) => {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const shadows = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  const roundedStyles = {
    none: "",
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
  };

  return (
    <div
      onClick={onClick}
      className={`
        bg-white
        ${border ? "border border-gray-200" : ""}
        ${paddings[padding]}
        ${shadows[shadow]}
        ${roundedStyles[rounded]}
        ${onClick ? "cursor-pointer transition hover:shadow-md" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
