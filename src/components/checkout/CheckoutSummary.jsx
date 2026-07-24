import Card from "../common/Card";

const CheckoutSummary = ({ cart }) => {
  const subtotal = cart?.totalPrice || 0;

  const shipping = subtotal >= 1000 ? 0 : subtotal === 0 ? 0 : 100;

  const tax = subtotal * 0.18;

  const discount = 0;

  const total = subtotal + shipping + tax - discount;

  return (
    <Card className="sticky top-24 p-6">
      <h2 className="mb-6 text-xl font-semibold">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Subtotal</span>

          <span className="font-medium">₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Tax (18%)</span>

          <span className="font-medium">₹{tax.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Discount</span>

          <span className="font-medium text-green-600">
            - ₹{discount.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Shipping</span>

          {shipping === 0 ? (
            <span className="font-medium text-green-600">FREE</span>
          ) : (
            <span className="font-medium">₹{shipping.toFixed(2)}</span>
          )}
        </div>
        <hr />

        <div className="flex items-center justify-between text-lg font-bold">
          <span>Total</span>

          <span>₹{total.toFixed(2)}</span>
        </div>

        {subtotal > 0 && shipping > 0 && (
          <p className="rounded-lg bg-yellow-50 p-3 text-sm text-yellow-700">
            Add <strong>₹{(1000 - subtotal).toFixed(2)}</strong> more to get
            FREE shipping.
          </p>
        )}

        {subtotal >= 1000 && (
          <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
            🎉 Congratulations! Your order qualifies for FREE shipping.
          </p>
        )}
      </div>
    </Card>
  );
};

export default CheckoutSummary;
