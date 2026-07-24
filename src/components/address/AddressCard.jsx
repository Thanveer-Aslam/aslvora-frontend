import {
  Home,
  Building2,
  MapPin,
  CheckCircle,
  Pencil,
  Trash2,
} from "lucide-react";

const AddressCard = ({ address, onEdit, onDelete, onSetDefault }) => {
  const getLabelIcon = () => {
    switch (address.label) {
      case "Home":
        return <Home className="h-4 w-4" />;
      case "Office":
        return <Building2 className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getLabelIcon()}

          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium">
            {address.label}
          </span>

          {address.isDefault && (
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              Default
            </span>
          )}
        </div>
      </div>

      {/* Customer */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{address.fullName}</h3>

        <p className="text-sm text-gray-600">{address.phoneNumber}</p>
      </div>

      {/* Address */}
      <div className="mt-4 space-y-1 text-sm text-gray-600">
        <p>{address.addressLine1}</p>

        {address.addressLine2 && <p>{address.addressLine2}</p>}

        <p>
          {address.city}, {address.state}
        </p>

        <p>
          {address.country} - {address.postalCode}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-2">
        {!address.isDefault && (
          <button
            onClick={() => onSetDefault(address._id)}
            className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition hover:bg-gray-100"
          >
            <CheckCircle size={16} />
            Set Default
          </button>
        )}

        <button
          onClick={() => onEdit(address)}
          className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition hover:bg-gray-100"
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          onClick={() => onDelete(address._id)}
          className="flex items-center gap-2 rounded-lg border border-red-300 px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
