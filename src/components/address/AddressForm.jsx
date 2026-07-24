import { useEffect, useState } from "react";

const initialState = {
  fullName: "",
  phoneNumber: "",
  label: "Home",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "India",
  postalCode: "",
  isDefault: false,
};

const AddressForm = ({ initialData = null, onSubmit, loading = false }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (initialData) {
      setFormData({
        fullName: initialData.fullName || "",
        phoneNumber: initialData.phoneNumber || "",
        label: initialData.label || "Home",
        addressLine1: initialData.addressLine1 || "",
        addressLine2: initialData.addressLine2 || "",
        city: initialData.city || "",
        state: initialData.state || "",
        country: initialData.country || "India",
        postalCode: initialData.postalCode || "",
        isDefault: initialData.isDefault || false,
      });
    } else {
      setFormData(initialState);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Full Name */}
      <div>
        <label className="mb-1 block text-sm font-medium">Full Name</label>

        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="mb-1 block text-sm font-medium">Phone Number</label>

        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
        />
      </div>

      {/* Label */}
      <div>
        <label className="mb-1 block text-sm font-medium">Address Label</label>

        <select
          name="label"
          value={formData.label}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
        >
          <option value="Home">Home</option>
          <option value="Office">Office</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Address Line 1 */}
      <div>
        <label className="mb-1 block text-sm font-medium">Address Line 1</label>

        <input
          type="text"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={handleChange}
          required
          className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
        />
      </div>

      {/* Address Line 2 */}
      <div>
        <label className="mb-1 block text-sm font-medium">Address Line 2</label>

        <input
          type="text"
          name="addressLine2"
          value={formData.addressLine2}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
        />
      </div>

      {/* City + State */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">City</label>

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">State</label>

          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
          />
        </div>
      </div>

      {/* Country + Postal Code */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Country</label>

          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Postal Code</label>

          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
            className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
          />
        </div>
      </div>

      {/* Default Address */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="default"
          name="isDefault"
          checked={formData.isDefault}
          onChange={handleChange}
        />

        <label htmlFor="default" className="text-sm">
          Set as Default Address
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-black py-3 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Saving..." : initialData ? "Update Address" : "Add Address"}
      </button>
    </form>
  );
};

export default AddressForm;
