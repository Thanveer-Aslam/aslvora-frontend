import { useEffect, useState } from "react";
import { MapPin, Plus } from "lucide-react";

import AddressCard from "../../components/address/AddressCard";
import AddressForm from "../../components/address/AddressForm";
import EmptyState from "../../components/common/EmptyState";
import Modal from "../../components/common/Modal";

import useAddress from "../../hooks/useAddress";

const Address = () => {
  const {
    addresses,
    loading,
    fetchAddresses,
    addAddress,
    editAddress,
    removeAddress,
    makeDefaultAddress,
  } = useAddress();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAdd = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?",
    );

    if (!confirmed) return;

    await removeAddress(id);
  };

  const handleSetDefault = async (id) => {
    await makeDefaultAddress(id);
  };

  const handleSubmit = async (data) => {
    if (editingAddress) {
      await editAddress(editingAddress._id, data);
    } else {
      await addAddress(data);
    }

    setIsModalOpen(false);
    setEditingAddress(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Addresses</h1>
          <p className="mt-1 text-gray-500">Manage your delivery addresses.</p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-white transition hover:bg-gray-800"
        >
          <Plus size={18} />
          Add Address
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="py-20 text-center">
          <p>Loading...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && addresses.length === 0 && (
        <EmptyState
          icon={MapPin}
          title="No Addresses Found"
          description="Add your first delivery address to continue shopping."
          buttonText="Add Address"
          onButtonClick={handleAdd}
        />
      )}

      {/* Address List */}
      {!loading && addresses.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {addresses.map((address) => (
            <AddressCard
              key={address._id}
              address={address}
              onEdit={() => handleEdit(address)}
              onDelete={() => handleDelete(address._id)}
              onSetDefault={() => handleSetDefault(address._id)}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAddress(null);
        }}
        title={editingAddress ? "Edit Address" : "Add Address"}
        width="max-w-2xl"
      >
        <AddressForm
          initialData={editingAddress}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default Address;
