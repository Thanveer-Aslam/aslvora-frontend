import { useMemo, useState } from "react";
import { Box, Paper, Stack, TextField, Typography } from "@mui/material";

import useAdmin from "../../hooks/useAdmin";
import { getCustomerById } from "../../services/admin.service";

import CustomerStats from "../../components/admin/customer/CustomerStats";
import CustomerTable from "../../components/admin/customer/CustomerTable";
import BlockCustomerModal from "../../components/admin/customer/BlockCustomerModal";
import CustomerDetailsModal from "../../components/admin/customer/CustomerDetailsModal";

const Customers = () => {
  const { customers, loading, blockUser, unblockUser } = useAdmin({
    customers: true,
  });

  const [search, setSearch] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [openBlockModal, setOpenBlockModal] = useState(false);

  const [openDetails, setOpenDetails] = useState(false);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const keyword = search.toLowerCase();

      return (
        customer.fullName?.toLowerCase().includes(keyword) ||
        customer.email?.toLowerCase().includes(keyword) ||
        customer.phoneNumber?.includes(keyword)
      );
    });
  }, [customers, search]);

  const handleView = async (customer) => {
    try {
      const response = await getCustomerById(customer._id);

      setSelectedCustomer(response.customer);
      setOpenDetails(true);
    } catch (error) {
      console.error("Failed to fetch customer details:", error);
    }
  };

  const handleBlock = (customer) => {
    setSelectedCustomer(customer);
    setOpenBlockModal(true);
  };

  const handleUnblock = (customer) => {
    setSelectedCustomer(customer);
    setOpenBlockModal(true);
  };

  const handleConfirm = async () => {
    if (!selectedCustomer) return;

    if (selectedCustomer.isBlocked) {
      await unblockUser(selectedCustomer._id);
    } else {
      await blockUser(selectedCustomer._id);
    }

    setOpenBlockModal(false);
    setSelectedCustomer(null);
  };

  return (
    <>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Customers
          </Typography>

          <Typography color="text.secondary" mt={1}>
            Manage customer accounts and access.
          </Typography>
        </Box>

        <CustomerStats customers={customers} />

        <Paper sx={{ p: 3 }}>
          <TextField
            fullWidth
            placeholder="Search by name, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Paper>

        <CustomerTable
          customers={filteredCustomers}
          loading={loading}
          onView={handleView}
          onBlock={handleBlock}
          onUnblock={handleUnblock}
        />
      </Stack>

      <BlockCustomerModal
        open={openBlockModal}
        customer={selectedCustomer}
        loading={loading}
        onClose={() => {
          setOpenBlockModal(false);
          setSelectedCustomer(null);
        }}
        onConfirm={handleConfirm}
      />

      <CustomerDetailsModal
        open={openDetails}
        customer={selectedCustomer}
        onClose={() => {
          setOpenDetails(false);
          setSelectedCustomer(null);
        }}
      />
    </>
  );
};

export default Customers;
