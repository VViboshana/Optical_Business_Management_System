import React from "react";
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useGetOneOrderByIdQuery } from "../Inventory/redux/features/order/ordersApi";

import html2canvas from "html2canvas";
import {jsPDF} from "jspdf";

 const Invoice = () => {

    const { orderId } = useParams();
    const {data: order, isError } = useGetOneOrderByIdQuery(orderId);
    if(isError) return <div>Error</div>;

    const printRef = React.useRef(null);
    const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) {
       return;
    }

        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: "a4",
        });

        pdf.addImage(data, 'PNG', 0, 0, 100, 100);
        pdf.save('examplepdf.pdf');

    };
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice * item.quantity, 0).toFixed(2);
    const deliveryFee = (350).toFixed(2);
    
    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <div ref ={printRef} className="p-8 bg-white border border-gray-200">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
               
            </div>
            <div className="text-right">
              <h2 className="font-semibold">CLEAR VISION</h2>
              <p className="text-sm text-gray-600">
                No.123
                <br />
                New Road, Awissawella.
              </p>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Bill To:</h3>
            <p className="text-gray-700">
        
            <p>{order?.name}</p>
            <p>{order?.address}</p>
            <p>{order?.phone}</p> 
            </p>
          </div>

          <table className="w-full mb-8 border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Description</th>
                <th className="border p-2 text-right">Quantity</th>
                <th className="border p-2 text-right">Unit Price</th>
                <th className="border p-2 text-right">Total</th>
              </tr>
            </thead>
        {cartItems.map((product) => (
            <tbody>
              <tr>
                <td className="border p-2"><Link to="/">{product?.title}</Link></td>
                <td className="border p-2 text-right"><Link to="/">{product?.quantity}</Link></td>
                <td className="border p-2 text-right"><Link to="/">{product?.newPrice}</Link></td>
                <td className="border p-2 text-right"> <Link to="/">{product?.newPrice * product?.quantity}</Link></td>
              </tr>
            </tbody>
           ) )}
          </table>

          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>{totalPrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery Fee:</span>
                <span>{deliveryFee}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{totalPrice} + {deliveryFee}</span>
              </div>
            </div>
          </div>
          
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center bg-primary text-white px-4 py-2 rounded-md hover:primary transition duration-300">
            Download PDF
          </button>
        </div>
      </div>
    </div>
    );
}

export default Invoice;