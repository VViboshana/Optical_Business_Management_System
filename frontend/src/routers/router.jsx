import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import CartPage from "../pages/glasses/CartPage";
import CheckoutPage from "../pages/glasses/CheckoutPage";
import OrderPage from "../pages/glasses/OrderPage";
import Invoice from "../pages/glasses/Invoice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/orders",
        element: <OrderPage/>,
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage/>
      },
      {
        path: "/invoice/:orderId",
        element: <Invoice/>
      }
    //   {
    //     path: "/cardPayment",
    //     element: <
    // }
    ],
  },
]);

export default router;
