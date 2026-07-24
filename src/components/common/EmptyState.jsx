import { PackageOpen } from "lucide-react";

const EmptyState = ({
  icon: Icon = PackageOpen,
  title = "Nothing Found",
  description = "There is nothing to display right now.",
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
      <div className="mb-4 rounded-full bg-white p-5 shadow">
        <Icon size={40} className="text-gray-500" />
      </div>

      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>

      <p className="mt-2 max-w-md text-gray-500">{description}</p>

      {buttonText && (
        <button
          onClick={onButtonClick}
          className="mt-6 rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
