import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import {
  TrendingUp, TrendingDown, ShoppingCart, AlertCircle, ArrowUpRight,
  AlertTriangle, Plus, FileText, Package, BarChart3, DollarSign,
  Beef,
  Drumstick,
  UserRoundCheck,
  ClipboardList,
  Boxes,
  Zap,
  Home,
  PlusCircle,
  User,
  Phone,
  LogOut,
  X, Search, Bell, Menu, Icon

} from "lucide-react";
import { Card, CardHeader, CardContent } from "../../components/adminPage//reusable/Card";
import { Badge } from "../../components/adminPage/reusable/Badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import toast from "react-hot-toast"
import axios from "axios"

function AdminDashboard() {


  const navigate = useNavigate();
  const [sideBar, setSideBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderData, setOrderData] = useState([]);
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [showLogout, setShowLogout] = useState(false);
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const dayStr = today.toLocaleDateString("en-US", { weekday: "long" });

  useEffect(() => {
    ordersData();
    getProduct();
  }, [page])

  //Users Data Fetch
  const ordersData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/customer?page=${page}&limit=8`);

      setOrderData(Array.isArray(res.data.data) ? res.data.data : []);
      setTotalPage(res.data?.pagination?.pages)
    }
    catch (err) {
      console.log(err);
      const message = err.response?.message || "Error Fetching Data"
      toast.error(message);
    }
  }

  //Get Products Data

  const getProduct = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/product/view`);

      setProduct(res.data);
    }
    catch (err) {
      console.log(err);
      const message = err.response?.message || "Error Fetching Data"
      toast.error(message);
    }
  }



  // Sales Data Graph

  const salesMap = {};
  orderData.forEach((item) => {
    const date = new Date(item.createdAt).toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "short"
      }
    );
    // Add sales amount by date
    if (salesMap[date]) {
      salesMap[date] += item.amount;
    } else {
      salesMap[date] = item.amount;
    }

  });
  const salesData = Object.keys(salesMap).map((date) => ({
    date,
    sales: salesMap[date]
  }));

  const productCount = {};

  orderData.forEach((order) => {

    order.product.forEach((item) => {

      const productName = item.toLowerCase();

      if (productCount[productName]) {
        productCount[productName] += 1;
      } else {
        productCount[productName] = 1;
      }

    });

  });
  const topProducts = Object.entries(productCount)
    .map(([name, count]) => ({
      name,
      count
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const quickActions = [
    {
      id: 1,
      title: "Add Product",
      icon: Plus,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      onClick: () => { navigate('/admin/addProduct') }
    },
    {
      id: 2,
      title: "Create Bill (POS)",
      icon: FileText,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      id: 3,
      title: "Purchase Stock",
      icon: Package,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      id: 4,
      title: "View Reports",
      icon: BarChart3,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
  ];



  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm ">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button

              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={24} className="text-gray-700" onClick={() => setSideBar(true)} />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Galaxy Mutton & Chicken Stall</h1>
          </div>
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
                  onClick={() => navigate("/")}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  <Home size={18} />
                  Home
                </button>

                <button
                  onClick={() => navigate("/admin/addProduct")}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  <PlusCircle size={18} />
                  Add Product
                </button>

                <button
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  <User size={18} />
                  Profile
                </button>

                <button
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  <Phone size={18} />
                  Contact
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


          {/* Center - Search Bar */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* Date Display */}
            <div className="hidden sm:block text-right">
              <p className="text-sm text-gray-600">{dateStr}</p>
              <p className="text-xs text-gray-400">{dayStr}</p>
            </div>

            {/* Notification */}
            <div className="relative">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell size={20} className="text-gray-700" />
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
            </div>

            {/* Admin Profile */}
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                AD
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-800">Admin</p>
                <p className="text-xs text-gray-500">Manager</p>
              </div>
            </div>
          </div>
        </div>


      </nav>

      {/* Dashboard Cards */}

      {(() => {

        const totalAmount = orderData.reduce(
          (total, items) => total + items.amount,
          0
        );

        const muttonOrders = orderData.filter(data =>
          data.product.some(item =>
            item.toLowerCase().includes("mutton")
          )
        );

        const totalMuttonAmount = muttonOrders.reduce(
          (total, items) => total + items.amount,
          0
        );

        const chickenOrders = orderData.filter(data =>
          data.product.some(item =>
            item.toLowerCase().includes("chicken")
          )
        );

        const totalChickenAmount = chickenOrders.reduce(
          (total, items) => total + items.amount,
          0
        );
        const loggedUser = orderData.filter((item) => item.userId);

        const dashBoard = [
          {
            id: 1,
            title: "Total Sales",
            value: `₹${totalAmount}`,
            icon: DollarSign,

            color: "from-blue-500 to-blue-600"
          },
          {
            id: 2,
            title: "Total Mutton Sales",
            value: `₹${totalMuttonAmount}`,
            icon: Beef,

            color: "from-red-500 to-red-600"
          },
          {
            id: 3,
            title: "Total Chicken Sales",
            value: `₹${totalChickenAmount}`,
            icon: Drumstick,

            color: "from-green-500 to-green-600"
          },
          {
            id: 4,
            title: "Total LoggedIn User",
            value: loggedUser.length,
            icon: UserRoundCheck,

            color: "from-purple-500 to-purple-600"
          }
        ];

        return (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-5">

            {dashBoard.map((item) => {

              const Icon = item.icon;



              return (

                <Card key={item.id}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">
                        {item.title}
                      </p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {item.value}
                      </p>
                    </div>
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white`}
                    >
                      <Icon size={24} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                  </div>
                </Card>
              );
            })}

          </div>

        );

      })()}




      <Card className="m-5">

        <CardHeader>

          <div>
            <h3 className="text-lg font-bold text-gray-900 flex gap-5 items-center mb-4">
              <TrendingUp className="text-blue-600" /> Sales Overview
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Weekly sales performance
            </p>
          </div>

          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>This Week</option>
            <option>Last Week</option>
            <option>This Month</option>
            <option>Last Month</option>
          </select>

        </CardHeader>

        <CardContent>

          <ResponsiveContainer width="100%" height={300}>

            <LineChart
              data={salesData}
              margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 5
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
              />

              <XAxis
                dataKey="date"
                stroke="#9ca3af"
              />

              <YAxis stroke="#9ca3af" />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value) => `₹${value}`}
              />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{
                  fill: "#3b82f6",
                  r: 5
                }}
                activeDot={{ r: 7 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </CardContent>

      </Card>



      <Card className="m-5">

        <CardHeader>
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex gap-5 items-center mb-4"><ClipboardList className="text-blue-600" />Recent Orders</h3>
            <p className="text-sm text-gray-500 mt-1">Today's order activity</p>
          </div>

          <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
            View All <ArrowUpRight size={16} />
          </a>
        </CardHeader>

        {/* TABLE AREA */}
        <CardContent>
          <div className="min-h-[400px]">

            <div className="overflow-x-auto w-full">
              <table className="w-full border-collapse text-sm">

                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-4 py-3 text-gray-600 font-semibold">Customer</th>
                    <th className="text-left px-4 py-3 text-gray-600 font-semibold">Items</th>

                    <th className="text-left px-4 py-3 text-gray-600 font-semibold">Amount</th>
                    
                  </tr>
                </thead>

                <tbody>
                  {orderData.map((order) => (
                    <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50">

                      <td className="px-4 py-3 text-gray-700">
                        {order.userName.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                          .join(" ")}
                      </td>

                      <td className="px-4 py-3 text-gray-700">
                        {order.product.join(", ")}
                      </td>



                      <td className="px-4 py-3 font-semibold text-gray-900">
                        {order.amount}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>

          {/* PAGINATION OUTSIDE TABLE FLOW */}
          <div className="flex items-center justify-center gap-3 mt-6  bg-white py-4">

            {/* Prev */}
            <button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
              className={`px-4 py-2 rounded-md border transition
        ${page === 1
                  ? "bg-blue-600 text-white font-semibold cursor-not-allowed"
                  : "bg-blue-600 text-white font-semibold "
                }`}
            >
              ← Prev
            </button>

            {/* Page Info */}
            <div className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 font-medium">
              Page <span className="font-bold">{page}</span> of{" "}
              <span className="font-bold">{totalPage}</span>
            </div>

            {/* Next */}
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPage}
              className={`px-4 py-2 rounded-md border transition
        ${page === totalPage
                  ? "bg-blue-600 text-white font-semibold  cursor-not-allowed"
                  : "bg-blue-600 text-white font-semibold  "
                }`}
            >
              Next →
            </button>

          </div>

        </CardContent>

      </Card>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10 mx-5 ">
        {/* Inventory Cards */}
        <div className="lg:col-span-2 max-h-[500px] overflow-y-auto pr-2 ">

          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-white py-3 border-b border-blue-100 ">
            <p className="text-lg font-bold flex gap-5 items-center mb-4">
              <Boxes className="text-blue-600" />Product Availability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">

            {product.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-blue-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      {item.productName
                        .split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                        )
                        .join(" ")}
                    </h3>

                    {item.isAvailable ? (
                      <p className="text-sm text-green-600 mt-1 font-medium">
                        Available
                      </p>
                    ) : (
                      <p className="text-sm text-red-500 font-bold mt-1">
                        Currently Not Available
                      </p>
                    )}
                  </div>

                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Package size={18} className="text-blue-600" />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-900">Rate / kg</span>
                  <span className="text-lg font-bold text-blue-600">
                    ₹{item.productRate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Selling Products */}
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">

          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3
                className="text-blue-600"
                size={20}
              />
              <h3 className="text-lg font-bold text-gray-900">
                Top Selling Products
              </h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topProducts.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-3 border border-orange-200 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 capitalize">
                      {item.name}
                    </p>
                    <p className="text-xs text-orange-600 font-semibold mt-1">
                      {item.count} Orders
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold">
                    #{index + 1}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors">
              View Full Report
            </button>
          </CardContent>
        </Card>
      </div>


      <div className="m-5">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex gap-5 items-center"> < Zap className="text-blue-600 " />Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={action.onClick}
                className={`group ${action.bgColor} border-2 ${action.borderColor} rounded-lg p-6 text-center transition-all hover:shadow-md hover:scale-105`}
              >
                <div
                  className={`w-16 h-16 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon size={28} />
                </div>
                <p className="font-semibold text-gray-900">{action.title}</p>
              </button>
            );
          })}
        </div>
      </div>
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
    </>
  );
}

export default AdminDashboard;