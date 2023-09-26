import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from '../cart/EmptyCart'
import store from "../../store"
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const { username, status, position, address, error: errorAddress } = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const formErrors = useActionData();
  const isLoadingAddress = status == "loading";
  if (!cart.length) return <EmptyCart></EmptyCart>;

  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row  sm:items-center">
          <label className="w-[20%]">First Name</label>
          <input defaultValue={username} className="input w-full" type="text" name="customer" required />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row  sm:items-center">
          <label className="w-[16%]">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && <p className="text-xs mt-2 text-red-700 p-2 bg-red-100 rounded-md">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="w-[16%]">Address</label>
          <div className="grow">
            <input disabled={isLoadingAddress} defaultValue={address} className="input w-full" type="text" name="address" required />
            {status === 'error' && <p className="text-xs mt-2 text-red-700 p-2 bg-red-100 rounded-md">{errorAddress}</p>}
          </div>
          {!position.latitude && !position.longitude && <span className="relative right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
            <Button disabled={isLoadingAddress} onClick={(e) => {
              e.preventDefault();
              dispatch(fetchAddress())
            }}>Get position</Button>
          </span>}
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            className="h-6 w-6 foucs:ring-offset-2 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}></input>
          <input type="hidden" name="position" value={position.longitude && position.latitude ?`${position.latitude},${position.longitude}`:""}></input>
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>{isSubmitting ? "Pkacing oredr...." : `Order now for ${formatCurrency(totalPrice)}`}</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true"
  }


  const errors = {};
  if (!isValidPhone(order.phone)) errors.phone = "please give us your correct phone number , We might need it to contact you."

  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
