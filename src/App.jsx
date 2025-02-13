import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import ProductDetails from './components/ProductDetails';
import Checkout from './pages/Checkout';
import UserProfileUpdate from './pages/userProfileUpdate';
import OrderHistory from './pages/orderHistory';
import OrderDetails from './pages/OrderDetails';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProduct from './pages/AdminProduct';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminEditProduct from './pages/AdminEditProducts';






function App() {
  

  return (
    <>
  
  
    
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/product/:id" element={<ProductDetails />}/>
      <Route path="/checkout" element={<Checkout/>} />
      <Route path="/profile" element={<UserProfileUpdate/>} />
      <Route path="/order-history" element={<OrderHistory/>} />
      <Route path="/order/:orderId" element={<OrderDetails />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admindash" element={<AdminDashboard />} />
      <Route path="/adminProducts" element={<AdminProduct />} />
      <Route path="/adminAddProduct" element={<AdminAddProduct/>} />
      <Route path="/adminEditProduct/:id" element={<AdminEditProduct/>} />





    </Routes>

    

      
    </>
  )
}

export default App
