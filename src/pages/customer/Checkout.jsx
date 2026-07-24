import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useCart from "../../hooks/useCart";
import useAddress from "../../hooks/useAddress";
import useOrder from "../../hooks/useOrder";
import usePayment from "../../hooks/usePayment";

import AddressSelection from "../../components/checkout/AddressSelection";
import CheckoutProduct from "../../components/checkout/CheckoutProduct";
import PaymentMethod from "../../components/checkout/PaymentMethod";
import CheckoutSummary from "../../components/checkout/CheckoutSummary";
import PlaceOrderButton from "../../components/checkout/PlaceOrderButton";

import Loader from "../../components/common/Loader";

const Checkout = () => {
  const navigate = useNavigate();

  // Cart
  const { cart, loading: cartLoading, fetchCart } = useCart();

  // Address
  const { addresses, loading: addressLoading, fetchAddresses } = useAddress();

  // Order
  const { loading: orderLoading, createOrder } = useOrder();

  const {
    loading: paymentLoading,
    createPaymentOrder,
    verifyPayment,
    paymentFailed,
  } = usePayment();

  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  useEffect(() => {
    fetchCart();
    fetchAddresses();
  }, []);

  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddress =
        addresses.find((address) => address.isDefault) || addresses[0];

      setSelectedAddress(defaultAddress._id);
    }
  }, [addresses]);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }

    try {
      // Step 1: Create Order
      const response = await createOrder({
        shippingAddress: selectedAddress,
        paymentMethod,
      });

      console.log("Order Response:", response);
      console.log("Order Data:", response.data);

      const order = response.data;

      // ===============================
      // COD Flow
      // ===============================
      if (paymentMethod === "COD") {
        navigate("/order-success", {
          state: {
            order,
          },
        });

        return;
      }

      // ===============================
      // Razorpay Flow
        // ===============================
        console.log("Selected Payment Method:", paymentMethod);
        console.log("Order ID:", order?._id);
        console.log("Calling createPaymentOrder...");
      const razorpayResponse = await createPaymentOrder(order._id);

      const razorpayData = razorpayResponse.data;

      const options = {
        key: razorpayData.key,
        amount: razorpayData.amount,
        currency: razorpayData.currency,
        order_id: razorpayData.orderId,
        name: "Clothing Store",
        description: `Order #${order.orderNumber}`,

        handler: async function (paymentResponse) {
          try {
            await verifyPayment({
              orderId: order._id,
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
            });

            navigate("/order-success", {
              state: {
                order,
              },
            });
          } catch (error) {
            console.error(error);
            alert("Payment verification failed.");
          }
        },

        modal: {
          ondismiss: async () => {
            try {
              await paymentFailed(order._id);
            } catch (error) {
              console.error(error);
            }
          },
        },

        theme: {
          color: "#000000",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  if (cartLoading || addressLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Checkout</h1>

        <p className="mt-2 text-gray-500">
          Review your order before placing it.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Side */}
        <div className="space-y-8 lg:col-span-2">
          <AddressSelection
            addresses={addresses}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />

          <CheckoutProduct cart={cart} />

          <PaymentMethod
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        </div>

        {/* Right Side */}
        <div>
          <CheckoutSummary cart={cart} />

          <div className="mt-6">
            <PlaceOrderButton
              loading={orderLoading || paymentLoading}
              onClick={handlePlaceOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
