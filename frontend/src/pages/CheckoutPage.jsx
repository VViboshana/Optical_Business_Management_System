import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../Inventory/redux/features/order/ordersApi';
import Swal from 'sweetalert2';

const CheckoutPage =() => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice * item.quantity, 0);
    const totalItemsCount = cartItems.reduce((acc,item) => acc + item.quantity, 0);
    const deliveryFee = 350 ;
    const currentUser = true;
    const {
        register,
        handleSubmit,
        watch,
        formState:{errors},
    } = useForm()

    const [createOrder, {isLoading, error}] = useCreateOrderMutation();

    const navigate =  useNavigate();

    const [isChecked, setIsChecked] = useState(false)

    const onSubmit = async (data) => {
        // Store user information in sessionStorage for card payment
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("address", data.address);
        sessionStorage.setItem("phone", data.phone);

        const newOrder = {
            name: data.name,
            email: data.email,
            address: data.address,
            phone: data.phone,
            productIds: cartItems.map(item => item._id),
            totalPrice: totalPrice,
        }

        try {
            await createOrder(newOrder).unwrap();
            Swal.fire({
                title: "Confirmed Order",
                text: "Your order placed successfully!",
                icon: "success",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            });
            navigate("/orders");
        } catch (error) {
            console.error("Error place an order", error);
            Swal.fire({
                title: "Error",
                text: "Failed to place an order",
                icon: "error"
            });
        }
    }

    if(isLoading) return <div>Loading...</div>
  return (
    <section> 
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <div>
                            <h2 className="font-semibold text-xl text-gray-600 mb-2">Check Out</h2>
                            <p className="text-gray-500 mb-2">Total Price: ${totalPrice}</p>
                            <p className="text-gray-500 mb-6">Items: {totalItemsCount > 0 ? totalItemsCount : 0}</p>
                            <p className="text-gray-500 mb-6">Delivery Fee: ${deliveryFee}</p>
                        </div>

                        
                            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"> 
                                    <div className="text-gray-600">
                                        <p className="font-medium text-lg">Personal Details</p>
                                        <p>Please fill out all the fields.</p>
                                    </div>

                                    <div className="lg:col-span-2">
                                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                            <div className="md:col-span-5">
                                                <label htmlFor="full_name">Full Name</label>
                                                <input
                                                    {...register("name", { required: true })}
                                                    type="text" name="name" id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                            </div>

                                            <div className="md:col-span-5">
                                            <label htmlFor="full_name">Email</label>
                                                <input
                                                    {...register("email", { required: true })}
                                                    type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"/>
                                                     
                                            </div>
                                            <div className="md:col-span-5">
                                                <label html="phone">Phone Number</label>
                                                <input
                                                    {...register("phone", { required: true })}
                                                    type="number" name="phone" id="phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="+123 456 7890" />
                                            </div>

                                            <div className="md:col-span-3">
                                                <label htmlFor="address">Address / Street</label>
                                                <input
                                                    {...register("address", { required: true })}
                                                    type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                                            </div>

                                            <div className="md:col-span-3">
                                            <label html="phone">Total Price: ${ totalPrice + deliveryFee}</label>
                                            </div>

                                            <div className="md:col-span-5 mt-3">
                                                <div className="inline-flex items-center">
                                                    <input
                                                        onChange={(e) => setIsChecked(e.target.checked)}
                                                        type="checkbox" name="billing_same" id="billing_same" className="form-checkbox" />
                                                    <label htmlFor="billing_same" className="ml-2 ">I am aggree to the <Link className='underline underline-offset-2 text-blue-600'>Terms & Conditions</Link> and <Link className='underline underline-offset-2 text-blue-600'>Shoping Policy.</Link></label>
                                                </div>
                                            </div>



                                            <div className="md:col-span-5 text-right">
                                                <div className="inline-flex items-end">
                                                    <button
                                                        disabled={!isChecked}
                                                        className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded">Cash On Delivery</button>
                                                         
                                                </div>
                                            </div>

                                            {/* <div className="md:col-span-5 text-right">
                                                <div className="inline-flex items-end">
                                                    <button
                                                        disabled={!isChecked}
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Card Payment</button>
                                                </div>
                                            </div> */}

                                        </div>
                                    </div>
                                </form>
                            <div className="md:col-span-5 text-right">
                                <div className="inline-flex items-end">
                                    <button  onClick={() => navigate('/cardPayment')}
                                    className="bg-primary hover:bg-primary text-white font-bold py-2 px-4 rounded ">Card Payment</button>
                                </div>
                            </div>
                        </div>
                        

                             
                    </div>

                </div>
            </div>
    </section>
  )
}

export default CheckoutPage

 