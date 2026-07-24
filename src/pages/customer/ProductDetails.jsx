import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, ChevronRight } from "lucide-react";

import { getProductById } from "../../services/product.service";
import useCart from "../../hooks/useCart";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
    
  const { addItem } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const data = await getProductById(id);

        setProduct(data);
        
        if (data.availableSizes?.length > 0) {
          setSelectedSize(data.availableSizes[0]);
        }

        if (data.availableColors?.length > 0) {
          setSelectedColor(data.availableColors[0]);
        }

      const primaryImage =
        data.images?.find((img) => img.isPrimary)?.url || data.images?.[0]?.url;

      setSelectedImage(primaryImage);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="py-32 text-center text-xl">Loading Product...</div>;
  }

  if (!product) {
    return <div className="py-32 text-center text-xl">Product Not Found</div>;
  }

  const discountedPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;
      
   const handleAddToCart = async () => {
     try {
       await addItem({
         product: product._id,
         size: selectedSize,
         color: selectedColor,
         quantity,
       });

       alert("Product added to cart successfully!");
     } catch (error) {
       alert(error.response?.data?.message || "Failed to add product to cart.");
     }
   }; 

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Breadcrumb */}

      <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/">Home</Link>

        <ChevronRight size={16} />

        <Link to="/products">Products</Link>

        <ChevronRight size={16} />

        <span>{product.name}</span>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Images */}

        <div>
          <div className="overflow-hidden rounded-3xl border">
            <img
              src={selectedImage}
              alt={product.name}
              className="h-[600px] w-full object-cover"
            />
          </div>

          <div className="mt-5 flex gap-4 overflow-x-auto">
            {product.images?.map((image) => (
              <button
                key={image.publicId}
                onClick={() => setSelectedImage(image.url)}
                className={`overflow-hidden rounded-xl border-2 ${
                  selectedImage === image.url
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
              >
                <img src={image.url} className="h-24 w-24 object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}

        <div>
          <p className="text-sm uppercase tracking-widest text-red-500">
            {product.brand}
          </p>

          <h1 className="mt-3 text-4xl font-bold">{product.name}</h1>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-4xl font-bold text-red-500">
              ₹{discountedPrice.toLocaleString()}
            </span>

            {product.discount > 0 && (
              <>
                <span className="text-2xl text-gray-400 line-through">
                  ₹{product.price.toLocaleString()}
                </span>

                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>

          <p className="mt-8 leading-8 text-gray-600">{product.description}</p>

          {/* Sizes */}

          <div className="mt-8">
            <h3 className="mb-3 font-semibold">Available Sizes</h3>

            <div className="flex flex-wrap gap-3">
              {product.availableSizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-lg border px-5 py-2 transition ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}

          <div className="mt-8">
            <h3 className="mb-3 font-semibold">Available Colors</h3>

            <div className="flex flex-wrap gap-3">
              {product.availableColors?.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`rounded-lg border px-5 py-2 transition ${
                    selectedColor === color
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:border-black"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Stock */}

          <div className="mt-8">
            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                product.stockQuantity > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.stockQuantity > 0
                ? `${product.stockQuantity} In Stock`
                : "Out Of Stock"}
            </span>
          </div>

          {/* Quantity */}

          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="rounded-lg border px-4 py-2"
            >
              -
            </button>

            <span className="text-xl font-semibold">{quantity}</span>

            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="rounded-lg border px-4 py-2"
            >
              +
            </button>
          </div>

          {/* Selected Options */}

          <div className="mt-6 rounded-xl bg-gray-100 p-4">
            <h3 className="mb-3 font-semibold">Selected Options</h3>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Size:</span> {selectedSize}
              </p>

              <p>
                <span className="font-semibold">Color:</span> {selectedColor}
              </p>

              <p>
                <span className="font-semibold">Quantity:</span> {quantity}
              </p>
            </div>
          </div>

          {/* Button */}

          <button
            onClick={handleAddToCart}
            className="mt-10 flex items-center gap-3 rounded-xl bg-black px-8 py-4 font-semibold text-white transition hover:bg-red-500"
          >
            <ShoppingCart size={20} />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
