import Home from "./components/homePage/home";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Order from "./components/orderPage/order";
import Login from "./components/login/adminLogin";
import ForgotPassword from "./components/login/adminForgetPassword";
import CustomerLogin from "./components/login/customerLogin";
import CustomerForgotPassword from "./components/login/customerForgetPassword";
import AdminDashboard from "./components/adminPage/adminDashboard";
import CustomerFormUI from "./components/login/createAccount";
import { Toaster } from "react-hot-toast";
import AddProduct from "./components/adminPage/addProduct";





function App() {
 
  return (
    <>
    <Toaster position="top-right" reverseOrder={false}  />
    <BrowserRouter>
    <Routes>
     <Route path="/"  element={<Home/>}/>
     <Route path="/customer/order" element={<Order/>}/>
     <Route path="/admin/login" element={<Login/>}/>
     <Route path="/admin/forgetPassword" element={<ForgotPassword/>}/>
     <Route path="/customer/login" element={<CustomerLogin/>}/>
       <Route path="/customer/create/account" element={<CustomerFormUI/>}/>
     <Route path="/customer/forgetPassword" element={<CustomerForgotPassword/>}/>
     <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
     <Route path="/admin/addProduct" element={<AddProduct/>}/>
     </Routes>
     </BrowserRouter>
     </>
  )
}

export default App
