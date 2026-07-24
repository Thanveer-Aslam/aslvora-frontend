import { Trash2 } from "lucide-react";

const CartItem = ({ item, updateItem, removeItem }) => {
  const { _id, product, quantity, size, color, price } = item;

  const increaseQuantity = () => {
    updateItem(_id, quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      updateItem(_id, quantity - 1);
    }
  };

  return (
    <div className="flex flex-col gap-6 rounded-2xl border bg-white p-5 shadow-sm md:flex-row">
      {/* Product Image */}

      <div className="h-36 w-36 overflow-hidden rounded-xl border">
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product Details */}

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold">{product.name}</h2>

          <p className="mt-1 text-sm text-gray-500">{product.brand}</p>

          <div className="mt-3 flex flex-wrap gap-6 text-sm">
            <p>
              <span className="font-semibold">Size:</span> {size}
            </p>

            <p>
              <span className="font-semibold">Color:</span> {color}
            </p>
          </div>

          <h3 className="mt-4 text-2xl font-bold text-red-500">
            ₹{price.toLocaleString()}
          </h3>
        </div>

        {/* Quantity */}

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={decreaseQuantity}
              className="rounded-lg border px-4 py-2 hover:bg-gray-100"
            >
              -
            </button>

            <span className="min-w-[30px] text-center text-lg font-semibold">
              {quantity}
            </span>

            <button
              onClick={increaseQuantity}
              className="rounded-lg border px-4 py-2 hover:bg-gray-100"
            >
              +
            </button>
          </div>

          {/* Remove */}

          <button
            onClick={() => removeItem(_id)}
            className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
          >
            <Trash2 size={18} />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
