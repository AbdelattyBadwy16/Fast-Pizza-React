import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from './ui/Home'
import Menu, { loader as menuLoader } from "./features/menu/Menu"
import Error from "./ui/Error"
import Cart from "./features/cart/Cart"
import Order, { loader as orderLoader } from "./features/order/Order"
import CreateOrder,{action as createOrderAction} from "./features/order/CreateOrder"
import AppLayout from "./ui/AppLayout"
const router = createBrowserRouter([
  {
    element: <AppLayout></AppLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/menu",
        element: <Menu></Menu>,
        loader: menuLoader,
      },
      {
        path: "/cart",
        element: <Cart></Cart>
      },
      {
        path: "/order/new",
        element: <CreateOrder></CreateOrder>,
        action : createOrderAction
      },
      {
        path: "/order/:orderId",
        element: <Order></Order>,
        loader: orderLoader,
        errorElement: <Error></Error>,
      }
    ]
  }

])

function App() {

  return <RouterProvider router={router}></RouterProvider>
}

export default App