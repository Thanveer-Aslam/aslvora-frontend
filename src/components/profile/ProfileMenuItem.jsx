const ProfileMenuItem = ({
  icon: Icon,
  label,
  active = false,
  danger = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left
        transition-all duration-200
        ${
          active
            ? "bg-black text-white shadow-sm"
            : danger
              ? "text-red-600 hover:bg-red-50"
              : "text-gray-700 hover:bg-gray-100"
        }
      `}
    >
      {Icon && <Icon size={20} />}

      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default ProfileMenuItem;
