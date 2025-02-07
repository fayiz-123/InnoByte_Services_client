import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import ProductDetails from './components/ProductDetails';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';






function App() {
  

  return (
    <>
  
  
    
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/productDetails" element={<ProductDetails/>} />
      <Route path="/checkout" element={<Checkout/>} />
      <Route path="/profile" element={<Profile/>} />




    </Routes>

    

      
    </>
  )
}

export default App
