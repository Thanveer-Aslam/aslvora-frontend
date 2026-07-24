import Button from "./Button";

const PageHeader = ({
  title,
  subtitle,
  actionLabel,
  onAction,
  actionIcon,
  children,
  className = "",
}) => {
  return (
    <div
      className={`mb-6 flex flex-col gap-4 border-b border-gray-200 pb-4 md:flex-row md:items-center md:justify-between ${className}`}
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-1 text-sm text-gray-500 md:text-base">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {children}

        {actionLabel && (
          <Button onClick={onAction}>
            {actionIcon && <span className="mr-2">{actionIcon}</span>}
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
