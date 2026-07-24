import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Card from "../common/Card";
import Badge from "../common/Badge";

const AddressSelection = ({
  addresses,
  selectedAddress,
  setSelectedAddress,
}) => {
    const navigate = useNavigate();
  return (
    <Card className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <MapPin className="h-5 w-5" />

        <h2 className="text-xl font-semibold">Delivery Address</h2>
      </div>

      {addresses.length === 0 ? (
        <div className="py-8 text-center">
          <p className="mb-4 text-gray-500">
            No address found. Please add an address first.
          </p>

          <button
            onClick={() => navigate("/addresses")}
            className="rounded-lg bg-black px-5 py-2 text-white transition hover:bg-gray-800"
          >
            + Add Address
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <label
              key={address._id}
              className={`block cursor-pointer rounded-lg border p-4 transition ${
                selectedAddress === address._id
                  ? "border-black bg-gray-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="shippingAddress"
                  value={address._id}
                  checked={selectedAddress === address._id}
                  onChange={() => setSelectedAddress(address._id)}
                  className="mt-1"
                />

                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="font-semibold">{address.fullName}</h3>

                    <Badge variant="primary">{address.label}</Badge>

                    {address.isDefault && (
                      <Badge variant="success">Default</Badge>
                    )}
                  </div>

                  <p className="text-sm text-gray-600">{address.phoneNumber}</p>

                  <p className="mt-2 text-sm text-gray-600">
                    {address.addressLine1}
                  </p>

                  {address.addressLine2 && (
                    <p className="text-sm text-gray-600">
                      {address.addressLine2}
                    </p>
                  )}

                  <p className="text-sm text-gray-600">
                    {address.city}, {address.state}
                  </p>

                  <p className="text-sm text-gray-600">
                    {address.country} - {address.postalCode}
                  </p>
                </div>
              </div>
            </label>
          ))}
        </div>
      )}
    </Card>
  );
};

export default AddressSelection;
