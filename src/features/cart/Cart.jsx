import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem'
import EmptyCart from "./EmptyCart"
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, deleteItem, getCart } from './cartSlice';


function Cart() {

  const username = useSelector((state)=>state.user.username)
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  if(!cart.length) return <EmptyCart></EmptyCart>

  return (
    <div className='px-4 py-3 '>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className='mt-7 text-xl font-semibold'>Your cart, {username}</h2>
      <ul className='divide-y divide-stone-200 border-b mt-3'>
        {cart.map((item) => {
          return <CartItem item={item} key={item.pizzaId}></CartItem>
        })}
      </ul>
      <div className='mt-6 space-x-2 flex justify-between items-center'>
        <Button to="/order/new">Order pizzas</Button>
        <Button type="secondry" onClick={()=>dispatch(clearCart())}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
