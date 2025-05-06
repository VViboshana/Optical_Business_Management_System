import React from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useCreatePaymentMutation } from "../Inventory/redux/features/payment/paymentApi"
import { useCreateOrderMutation } from "../Inventory/redux/features/order/ordersApi"
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function CardPaymentPage(){
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice * item.quantity, 0);

  const { register, handleSubmit, formState: { errors }} = useForm();
  const [ createPayment, { isLoading: isPaymentLoading }] = useCreatePaymentMutation();
  const [ createOrder, { isLoading: isOrderLoading }] = useCreateOrderMutation();

  const onSubmit = async (data) => {
    const newPayment = {
      cardHolderName: data.cardHolderName,
      cardNumber: data.cardNumber,
      expiryDate: data.expiryDate,
      cvv: data.cvv
    };

    try {
      // Process payment
      await createPayment(newPayment);
      
      // Create order
      // const orderData = {
      //   name: data.cardHolderName,
      //   email: sessionStorage.getItem("email") || "test@gmail.com", // Use stored email or fallback
      //   address: sessionStorage.getItem("address") || "test address",
      //   phone: sessionStorage.getItem("phone") || "0123456789",
      //   productIds: cartItems.map(item => item._id),
      //   totalPrice: totalPrice
      // };

      const orderData = {
        name: data.cardHolderName,
        email: sessionStorage.getItem("email"), // Use stored email or fallback
        address: sessionStorage.getItem("address"),
        phone: sessionStorage.getItem("phone"),
        productIds: cartItems.map(item => item._id),
        totalPrice: totalPrice
      };

      console.log("test order");

      await createOrder(orderData);
      
      Swal.fire({
        title: "Success!",
        text: "Payment processed and order created successfully!",
        icon: "success"
      });
      
      navigate("/orders");
    } catch(error) {
      console.error("Transaction Failed!", error);
      Swal.fire({
        title: "Error",
        text: "Transaction failed. Please try again.",
        icon: "error"
      });
    }
  };

  if(isPaymentLoading || isOrderLoading) return <div className="text-center text-lg mt-10">Processing Transaction...</div>;

  return(
    <div>
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-6">
      <div className="container max-w-md mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">Card Payment</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-gray-700">Card Holder Name</label>
            <input
              {...register("cardHolderName", { required: true })}
              type="text"
              placeholder="Enter card holder name"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            />
            {errors.cardHolderName && <p className="text-red-500 text-sm">Card Holder Name is required.</p>}
          </div>

          <div>
            <label className="block text-gray-700">Card Number</label>
            <input
              {...register("cardNumber", { required: true })}
              type="text"
              placeholder="Enter card number"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            />
            {errors.cardNumber && <p className="text-red-500 text-sm">Card Number is required.</p>}
          </div>

          <div>
            <label className="block text-gray-700">Expiry Date</label>
            <input
              {...register("expiryDate", { 
                required: "Expiry Date is required.",
                validate : (value) => {
                  const [month, year] = value.split('/').map(str => parseInt(str));
                  if (!month || !year ||month <1 || month > 12){
                    return "Invalid format. Use MM/YY.";
                  }
                  const inputYear = 2000 + year;
                  const today = new Date();
                  const expiryDate = new Date(inputYear, month-1);

                  if(inputYear < 2025){
                    return "Expiry year must be 2025 or later.";
                  }
                  if(inputYear === today.getFullYear() && month <= today.getMonth()+1){
                    return "Expiry month must be in the future.";
                  }
                  return true;
                }
               })}
              type="text"
              placeholder="MM/YY"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            />
            {errors.expiryDate && <p className="text-red-500 text-sm">Expiry Date is required.</p>}
          </div>

          <div>
            <label className="block text-gray-700">CVV</label>
            <input
              {...register("cvv", { required: true })}
              type="password"
              placeholder="Enter CVV"
              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
            />
            {errors.cvv && <p className="text-red-500 text-sm">CVV is required.</p>}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded"
            >
              Make Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}