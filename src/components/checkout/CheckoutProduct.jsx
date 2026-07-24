import Card from "../common/Card";

const CheckoutProduct = ({ cart }) => {
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold">Order Items</h2>

        <p className="text-gray-500">Your cart is empty.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      {/* Header */}
      <h2 className="mb-6 text-xl font-semibold">
        Order Items ({cart.totalItems})
      </h2>

      <div className="space-y-5">
        {cart.items.map((item) => {
          const image =
            item.product?.images?.find((img) => img.isPrimary)?.url ||
            item.product?.images?.[0]?.url ||
            "https://placehold.co/120x120?text=Product";

          return (
            <div
              key={item._id}
              className="flex gap-4 border-b pb-5 last:border-0 last:pb-0"
            >
              {/* Product Image */}
              <img
                src={image}
                alt={item.product?.name}
                className="h-24 w-24 rounded-lg border object-cover"
              />

              {/* Product Details */}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    {item.product?.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Size : {item.size}
                  </p>

                  <p className="text-sm text-gray-500">Color : {item.color}</p>

                  <p className="text-sm text-gray-500">
                    Quantity : {item.quantity}
                  </p>
                </div>

                <div className="mt-2">
                  <span className="text-lg font-bold">
                    ₹{item.price * item.quantity}
                  </span>

                  <span className="ml-2 text-sm text-gray-500">
                    (₹{item.price} × {item.quantity})
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default CheckoutProduct;
