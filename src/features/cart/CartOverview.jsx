import { Link } from "react-router-dom";

function CartOverview() {
  return (
    <div className="bg-stone-800 flex justify-between items-center text-sm md:text-base text-stone-200 sm:px-6 px-4 py-4 uppercase">
      <p className="text-stone-300 space-x-4 sm:space-x-6 font-semibold">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
