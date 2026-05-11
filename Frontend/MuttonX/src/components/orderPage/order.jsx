import {
  Menu, ShoppingBag, Sailboat, Minus, Plus, X, Home,
  PlusCircle,
  User,
  Phone,
  LogOut,
  Search, Bell, Icon
} from "lucide-react"
import mutton from "../../assets/mutton.png"
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/loader.jsx"

function Order() {

  const [count, setCount] = useState(0)
  const [products, setProducts] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [cart, setCart] = useState([]);
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [flesh, setFlesh] = useState("");
  const [amount, setAmount] = useState("");
  const [sideBar, setSideBar] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [showLogout, setShowLogout] = useState(false);




  useEffect(() => {
    getData();
  }, []);

  // Reusable Product Card Component
  const ProductCard = ({ product, onAddToCart, image }) => {
    const [quantity, setQuantity] = useState(1);


    const handleAddToCart = () => {
      // Add the product multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        onAddToCart(product);
      }
      setQuantity(1); // Reset quantity after adding
    };

    return (
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden">
        <div className="p-4">
          <img
            src={image}
            alt={product.productName}
            className="w-full h-32 object-cover rounded-lg mb-3"
          />

          <h3 className="text-lg font-bold text-gray-800 capitalize mb-2">
            {product.productName}
          </h3>

          <p className="text-xl font-semibold text-red-600 mb-4">
            ₹{product.productRate}/kg
          </p>

          {/* Quantity Control */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  };

  // Reusable Cart Item Component
  const CartItem = ({ item, onIncrease, onDecrease }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
      <div className="flex-1">
        <h4 className="font-medium text-gray-800 capitalize">{item.productName}</h4>
        <p className="text-sm text-gray-600">₹{item.productRate}/kg</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onDecrease(item)}
            className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
          <button
            onClick={() => onIncrease(item)}
            className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>

        <span className="font-semibold text-gray-800 w-16 text-right">
          ₹{item.productRate * item.qty}
        </span>
      </div>
    </div>
  );


  const getData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/view`);
      const datas = await axios.get(`${import.meta.env.VITE_API_URL}/users`, { withCredentials: true });
      setUser(datas.data);


      setTimeout(() => {
        setProducts(res.data);
        toast.success("Data Fetch Successfully");
      }, 2000);


    }
    catch (err) {
      console.log(err);
      const message = err.response?.data?.message || "Data Was Not Fetch"
      toast.error(message)
    }
  }
  const addToCart = (product) => {
    const existing = cart.find(item => item._id === product._id);

    if (existing) {
      setCart(cart.map(item =>
        item._id === product._id
          ? { ...item, qty: item.qty + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // 🔹 Decrease Qty
  const decreaseQty = (product) => {
    const existing = cart.find(item => item._id === product._id);

    if (existing.qty === 1) {
      setCart(cart.filter(item => item._id !== product._id));
    } else {
      setCart(cart.map(item =>
        item._id === product._id
          ? { ...item, qty: item.qty - 1 }
          : item
      ));
    }
  };

  // 🔹 Total
  const total = cart.reduce(
    (sum, item) => sum + item.productRate * item.qty,
    0
  );


  // 🔹 POST ORDER
  const placeOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      return toast.error("Cart is empty");
    }

    try {
      const payload = {
        userName: userName,
        phoneNumber: phoneNumber,
        address: address,
        product: cart.map(item => item.productName),
        amount: total

      }
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders`, payload,
        {
          withCredentials: true
        }
      );
      toast.success("Order placed successfully!");
    } catch (err) {
      console.log(err);
      const message = err.response?.data?.message || "Order was not placed";
      toast.error(message);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSideBar(true)}
                className="p-2 hover:bg-gray-100 rounded-lg "
              >
                <Menu size={24} className="text-gray-700" />
              </button>
              <h1 className="text-2xl font-bold text-red-700">
                Galaxy Mutton & Chicken Stall
              </h1>
            </div>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                MG
              </div>
              <div className="hidden sm:block">
                {user?.length > 0 ? (
                  <>
                    <p className="text-sm font-medium text-gray-800">Guest</p>
                    <p className="text-xs text-gray-500">Hello</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-gray-800">Hello</p>
                    <p className="text-xs text-gray-500">Customer</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {sideBar && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSideBar(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-white z-50 shadow-lg
        transform transition-transform duration-300
        ${sideBar ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        {sideBar && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setSideBar(false)}
          />
        )}
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50
    transform transition-transform duration-300 flex flex-col
    ${sideBar ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center px-5 py-5 border-b">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                🧭 Admin Panel
              </h2>
              <p className="text-xs text-gray-400">
                Galaxy Dashboard
              </p>
            </div>
            <X
              size={18}
              className="cursor-pointer text-gray-500 hover:text-red-500 transition"
              onClick={() => setSideBar(false)}
            />
          </div>
          {/* MENU */}
          <div className="p-4 flex flex-col gap-2 flex-1">
            <button
              onClick={() => navigate("/customer/login")}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <Home size={18} />
              Logout
            </button>
          </div>
          {/* LOGOUT */}
          <div className="px-4 pb-3">
            <button
              onClick={() => setShowLogout(true)}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
          {/* BOTTOM BRAND CARD */}
          <div className="p-4">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-2xl shadow-lg">
              <p className="font-semibold">🥩 Galaxy Stall</p>
              <p className="text-xs text-blue-100">
                Premium Meat Management System
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT - Products Section (70%) */}
          <div className="lg:w-7/12">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Fresh Meat Selection</h2>
              <p className="text-gray-600">Choose from our premium quality chicken and mutton cuts</p>
            </div>

            {products.length <= 0 ? (
              <div className="flex justify-center items-center h-64">
                <Loader />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product, id) => (
                  <ProductCard
                    key={id}
                    product={product}
                    onAddToCart={addToCart}
                    image={mutton}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT - Cart/Order Summary (30%) */}
          <div className="lg:w-5/12">
            <div className="sticky top-5">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <ShoppingBag className="text-red-600" size={24} />
                  Your Order
                </h2>

                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="mx-auto text-gray-300 mb-4" size={48} />
                    <p className="text-gray-500 text-lg">No items added yet</p>
                    <p className="text-gray-400 text-sm mt-2">Add some delicious meat to your cart!</p>
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    <div className="space-y-1 mb-6">
                      {cart.map(item => (
                        <CartItem
                          key={item._id}
                          item={item}
                          onIncrease={addToCart}
                          onDecrease={decreaseQty}
                        />
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="border-t border-gray-200 pt-4 space-y-2 mb-6">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>₹{total}</span>
                      </div>

                      <div className="flex justify-between text-xl font-bold text-gray-900 border-t border-gray-200 pt-2">
                        <span>Total</span>
                        <span>₹{total}</span>
                      </div>
                    </div>

                    {/* Customer Form */}
                    <form onSubmit={placeOrder} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="Enter your phone number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                          required
                        />
                      </div>



                      <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-lg"
                      >
                        Place Order
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h1 className="text-[#7F1D1D] font-bold text-2xl">The Butcher's Atelier</h1>
              <p className="text-gray-600 mt-1">© 2024 The Butcher's Atelier. Artisanal Quality.</p>
            </div>
            <div className="flex gap-6">
              <p className="hover:text-[#7F1D1D] transition-colors cursor-pointer">Sourcing</p>
              <p className="hover:text-[#7F1D1D] transition-colors cursor-pointer">Privacy</p>
              <p className="hover:text-[#7F1D1D] transition-colors cursor-pointer">Shopping</p>
              <p className="hover:text-[#7F1D1D] transition-colors cursor-pointer">Contact</p>
            </div>
          </div>
        </div>
      </footer>
      {showLogout && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">

          <div className="bg-white w-[340px] p-6 rounded-2xl shadow-2xl relative">

            <button
              onClick={() => setShowLogout(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>

            <div className="flex justify-center mb-3">
              <div className="p-3 rounded-full bg-red-50 text-red-600">
                <AlertTriangle size={26} />
              </div>
            </div>

            <h2 className="text-center text-lg font-bold text-gray-900">
              Confirm Logout
            </h2>

            <p className="text-center text-sm text-gray-500 mt-2">
              Are you sure you want to logout?
            </p>

            <div className="flex gap-3 mt-6">

              <button
                onClick={() => setShowLogout(false)}
                className="w-1/2 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  localStorage.clear();
                  navigate("/admin/login");
                }}
                className="w-1/2 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 flex items-center justify-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>

            </div>

          </div>

        </div>
      )}
    </div>

  );
}
export default Order;