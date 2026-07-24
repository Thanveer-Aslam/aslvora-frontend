import { useEffect, useState } from "react";
import { MapPin, Plus } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import Modal from "../../components/common/Modal";

import AddressCard from "../../components/address/AddressCard";
import AddressForm from "../../components/address/AddressForm";

import useAddress from "../../hooks/useAddress";

const MyAddresses = () => {
  const {
    addresses,
    loading,
    error,
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
  }, [fetchAddresses]);

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

  const handleSubmit = async (formData) => {
    if (editingAddress) {
      await editAddress(editingAddress._id, formData);
    } else {
      await addAddress(formData);
    }

    setIsModalOpen(false);
    setEditingAddress(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Addresses"
        subtitle="Manage your delivery addresses."
        actionLabel="Add Address"
        actionIcon={<Plus size={18} />}
        onAction={handleAdd}
      />

      {loading && addresses.length === 0 ? (
        <Loader text="Loading addresses..." />
      ) : addresses.length === 0 ? (
        <EmptyState
          icon={MapPin}
          title="No Addresses Found"
          description="Add your first delivery address."
          buttonText="Add Address"
          onButtonClick={handleAdd}
        />
      ) : (
        <>
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-600">
              {error}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {addresses.map((address) => (
              <AddressCard
                key={address._id}
                address={address}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSetDefault={handleSetDefault}
              />
            ))}
          </div>
        </>
      )}

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

export default MyAddresses;
