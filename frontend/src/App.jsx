import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import Home from './pages/Home'
import UserProfile from './pages/UserProfile'
import Dashboard from './pages/Dashboard'
import AddDoctor from './pages/AddDoctor'
import ManageInquiries from './pages/ManageInquiries'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Doctors from './lInara/pages/Doctors'
import MyAppointments from './lInara/pages/MyAppointments'
import Appointment from './linara/pages/Appointment'
import PatientDetailsForm from './linara/pages/PatientDetailsForm'
import Receipt from './linara/components/Receipt'

import Home1 from './lInara/pages/Home'

import CategoryList from './Inventory/pages/CategoryList.jsx'
import ProductList from './Inventory/pages/ProductList.jsx';
import ProductUpdate from './Inventory/pages/ProductUpdate.jsx';
import AllProducts from './Inventory/pages/AllProducts.jsx';
import ProductDashboard from './Inventory/pages/Dashboard.jsx';
import SupplierList from './Inventory/pages/SupplierList.jsx';
import SupplierForm from './Inventory/pages/SupplierForm.jsx';

// Import and register all API slices
import './Inventory/redux/api/EmailApiSlice.js'
import './Inventory/redux/api/ProductApiSlice.js'
import './Inventory/redux/api/CategoryApiSlice.js'
import './Inventory/redux/api/SupplierApiSlice.js'
import './Inventory/redux/api/PdfApiSlice.js'

import Home2 from "./Products/pages/home/Home.jsx";
import CartPage from "./Products/pages/glasses/CartPage";
import SingleGlass from "./Products/pages/glasses/SingleGlass";
import DashboardLayout from "./Products/pages/dashboard/DashboardLayout";
import GlassDashboard from "./Products/pages/dashboard/Dashboard";
import ManageBooks from "./Products/pages/dashboard/manageGlasses/ManageGlasses";
import AddGlass from "./Products/pages/dashboard/addGlass/AddGlass";
import UpdateGlass from "./Products/pages/dashboard/EditGlass/UpdateGlass";
import ManageGlasses from "./Products/pages/dashboard/manageGlasses/ManageGlasses";

import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrderPage from "./pages/OrderPage";
import Invoice from "./pages/Invoice";
import CardPaymentPage from "./pages/CardPaymentPage";

const App = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/email-verify' element={<EmailVerify/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/profile' element={<UserProfile/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/add-doctor' element={<AddDoctor/>}/>
        <Route path='/manage-inquiries' element={<ManageInquiries/>}/>

        <Route path = '/Home' element={<Home1 />} />
        <Route path = '/doctors' element={<Doctors />} />
        <Route path = '/patient-details' element={<PatientDetailsForm />} />
        <Route path="/doctors/:specialization?" element={<Doctors />} />
        <Route path = '/my-appointments' element={<MyAppointments />} />
        <Route path = '/appointment/:docId' element={<Appointment />} />
        <Route path = '/receipt' element={<Receipt />} /> 

      <Route path='/InventoryDashboard' element={<ProductDashboard />} />
      <Route path="/categoryList" element={<CategoryList />} />
      <Route path='/productList' element={<ProductList />} />
      <Route path='/allProductList' element={<AllProducts />} />
      <Route path='/product/update/:_id' element={<ProductUpdate />} />
      <Route path='/suppliers' element={<SupplierList />} />
      <Route path='/supplier/add' element={<SupplierForm />} />
      <Route path='/supplier/update/:supplierId' element={<SupplierForm />} />

      <Route path='/glasses' element={<Home2 />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/glasses/:id' element={<SingleGlass />} />
      <Route path='/glassDashboard' element={<DashboardLayout />} >
      <Route index element={<GlassDashboard />} />
      </Route>
      <Route path='/add-new-glass' element={<AddGlass/>} />
      <Route path='/edit-glass/:id' element={<UpdateGlass />} />
      <Route path='/manage-glasses' element={<ManageGlasses />} />
      
      <Route path='/checkout' element={<CheckoutPage />} />
      <Route path='/invoice/:orderId' element={<Invoice />} />
      <Route path='/cardPayment' element={<CardPaymentPage />} />
      <Route path='/orders' element={<OrderPage />} />
      
      </Routes>
    </div>
  )
}

export default App