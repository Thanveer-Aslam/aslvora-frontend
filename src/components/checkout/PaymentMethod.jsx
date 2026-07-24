import Card from "../common/Card";

const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => {
  const methods = [
    {
      id: "COD",
      title: "Cash on Delivery",
      description: "Pay when your order is delivered.",
    },
    {
      id: "Razorpay",
      title: "Razorpay",
      description: "Pay securely using UPI, Cards or Net Banking.",
      disabled: false,
    },
    {
      id: "Stripe",
      title: "Stripe",
      description: "Pay securely using Credit/Debit Cards.",
      disabled: true,
    },
  ];

  return (
    <Card className="p-6">
      {/* Header */}
      <h2 className="mb-6 text-xl font-semibold">Payment Method</h2>

      <div className="space-y-4">
        {methods.map((method) => (
          <label
            key={method.id}
            className={`flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition ${
              paymentMethod === method.id
                ? "border-black bg-gray-50"
                : "border-gray-200"
            } ${method.disabled ? "cursor-not-allowed opacity-60" : ""}`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={paymentMethod === method.id}
              disabled={method.disabled}
              onChange={() => setPaymentMethod(method.id)}
              className="mt-1"
            />

            <div>
              <h3 className="font-semibold">{method.title}</h3>

              <p className="text-sm text-gray-500">{method.description}</p>

              {method.disabled && (
                <p className="mt-2 text-xs font-medium text-orange-500">
                  Coming Soon
                </p>
              )}
            </div>
          </label>
        ))}
      </div>
    </Card>
  );
};

export default PaymentMethod;

