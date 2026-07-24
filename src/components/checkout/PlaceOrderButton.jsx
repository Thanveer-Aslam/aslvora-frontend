import Button from "../common/Button";

const PlaceOrderButton = ({ loading, onClick }) => {
  return (
    <Button onClick={onClick} disabled={loading} className="w-full">
      {loading ? "Placing Order..." : "Place Order"}
    </Button>
  );
};

export default PlaceOrderButton;
