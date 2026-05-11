import { Menu, User, Plus, Drumstick, Beef, 
    Sailboat, Leaf, Truck, ForkKnife, ShoppingCart, 
    ShoppingBag, Backpack, Sidebar,X, Home,
  PlusCircle,
  
  Phone,
  LogOut,
   Search, Bell, Icon } from "lucide-react"
import mutton from "../../assets/mutton.png"
import farm_chicken from "../../assets/Whole_Farm_Chicken.jpg"
import goat from "../../assets/goat.png"
import chops from "../../assets/chops.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom";


function Navbar() {
    const navigate=useNavigate();
     const [sideBar, setSideBar] = useState(false);
     const [showLogout, setShowLogout] = useState(false);
    function goTo(path) {
  navigate(path);
}

    return (
        <>

            <div className="flex justify-between items-center mx-2 sm:mx-4 py-2 sm:py-4 border-b border-gray-300">
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg"><Menu  onClick={() => setSideBar(true)}/></button>
                    <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-[#7F1D1D]">Galaxy Mutton & Chicken Stall</h1>
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
              onClick={() => navigate("/admin/login")}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <Home size={18} />
              Admin
            </button>

            <button
              onClick={() => navigate("/customer/login")}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition"
            >
              <PlusCircle size={18} />
              Order Product
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

                <div>
                    <button className="p-2"><ShoppingBag className="text-[#7F1D1D] w-6 h-6" /></button>
                </div>
            </div>
            <header className="bg-[#B6171F] px-4 sm:px-5 py-8 sm:py-12 mx-2 sm:mx-8 rounded-md">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-14 max-w-7xl mx-auto">
                    <div className="w-full lg:w-[45%] text-center lg:text-left">
                        <p className="bg-[#A0F399] text-[#21712C] w-full sm:w-[35%] mx-auto lg:mx-0 p-2 text-center rounded-md mb-4 text-sm sm:text-base">Today's Special Deals</p>
                        <h1 className="text-white text-3xl sm:text-4xl lg:text-6xl font-bold mb-4">The Prime Cut Standard</h1>
                        <p className="text-white mb-6 text-base sm:text-lg">Experience the difference of heritage-bred livestock and artisanal butchery delivered to your door.</p>
                        <button className="bg-white text-[#B6171F] px-6 py-3 rounded-lg hover:scale-110 transition text-sm sm:text-base font-medium" onClick={()=> goTo("/customer/login")}>Shop Deals Now</button>
                    </div>

                    <img src={mutton} alt="" className="w-full max-w-sm lg:max-w-none lg:w-[30%] h-auto max-h-64 lg:h-[25vw] rounded-lg rotate-5 hover:-rotate-0 transition duration-300" />
                </div>
            </header>

            <div className="p-4 sm:p-6 bg-gray-50">

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">

                    {/* LEFT BIG CARD */}
                    <div className="lg:col-span-2 bg-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-5 relative shadow-sm">

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-2">
                            <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                                ORGANIC
                            </span>
                            <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                                15% OFF
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-lg sm:text-xl font-bold">Whole Farm Chicken</h2>
                        <p className="text-gray-500 text-sm mb-3">
                            Pasture-raised, hormone-free birds from the valleys of Glenwood.
                        </p>

                        {/* Image */}
                        <img
                            src={farm_chicken}
                            className="rounded-xl sm:rounded-2xl w-full h-48 sm:h-60 object-cover"
                            alt="chicken"
                        />

                        {/* Bottom overlay */}
                        <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-red-600 font-bold mb-2 text-sm sm:text-base">$12.99 / kg</p>
                            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-base" onClick={()=> navigate("/customer/login")}>
                                <ShoppingCart size={18} />
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="space-y-4">

                        {/* TOP SMALL CARDS */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">

                            {/* Card 1 */}
                            <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm">
                                <img
                                    src={mutton}
                                    className="rounded-lg sm:rounded-xl mb-2 h-16 sm:h-20 w-full object-cover"
                                    alt=""
                                />
                                <h3 className="font-semibold text-sm">Tender Breasts</h3>
                                <p className="text-xs text-gray-500">Lean & Skinless</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-red-600 font-bold text-sm">$8.50</span>
                                    <button className="bg-gray-200 rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
                                        <Plus size={12} />
                                    </button>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm">
                                <img
                                    src={mutton}
                                    className="rounded-lg sm:rounded-xl mb-2 h-16 sm:h-20 w-full object-cover"
                                    alt=""
                                />
                                <h3 className="font-semibold text-sm">Juicy Thighs</h3>
                                <p className="text-xs text-gray-500">Skin-on, Bone-in</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-red-600 font-bold text-sm">$7.20</span>
                                    <button className="bg-gray-200 rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
                                        <Plus size={12} />
                                    </button>
                                </div>
                            </div>

                        </div>

                        {/* BOTTOM LIST */}
                        <div className="space-y-3">

                            <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-3 flex justify-between items-center shadow-sm">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={mutton}
                                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover"
                                        alt=""
                                    />
                                    <div>
                                        <p className="text-sm font-medium">Party Pack Wings</p>
                                        <p className="text-xs text-gray-500">Bulk 2kg pack</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-red-600 font-semibold text-sm">$14.00</p>
                                    <p className="text-green-500 text-xs">IN STOCK</p>
                                </div>
                            </div>

                            <div className="bg-gray-100 rounded-xl sm:rounded-2xl p-3 flex justify-between items-center shadow-sm">
                                <div className="flex items-center gap-3">
                                    <img
                                        src="https://images.unsplash.com/photo-1604908554165-4a59cfd0fbb3"
                                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover"
                                        alt=""
                                    />
                                    <div>
                                        <p className="text-sm font-medium">Drumstick Lollipops</p>
                                        <p className="text-xs text-gray-500">Kids favorite</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-red-600 font-semibold text-sm">$9.50</p>
                                    <p className="text-green-500 text-xs">LIMITED</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <section className="px-4 sm:px-8 py-8 sm:py-12">
                <p className="text-[#9B593D] font-medium text-sm sm:text-base mb-2">Highland Pastures</p>
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Farm Fresh Mutton</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-7xl mx-auto">
                    <div className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                        <img src={chops} alt="" className="w-full h-48 sm:h-64 lg:h-[30vw] max-h-80 object-cover" />
                        <div className="p-4 sm:p-6">
                            <h2 className="font-bold text-lg sm:text-xl mb-2">Heritage Mutton Chops</h2>
                            <p className="text-gray-600 text-sm sm:text-base mb-4">Cut from 18-month grass-fed Highland sheep. Intense flavor and incredible tenderness.</p>
                            <div className="flex justify-between items-center">
                                <p className="text-sm sm:text-base">Price per 500g</p>
                                <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors" onClick={()=> navigate("/customer/login")}>
                                    <Sailboat size={16} />
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                        <img src={goat} alt="" className="w-full h-48 sm:h-64 lg:h-[30vw] max-h-80 object-cover" />
                        <div className="p-4 sm:p-6">
                            <h2 className="font-bold text-lg sm:text-xl mb-2">Prime Shoulder Roast</h2>
                            <p className="text-gray-600 text-sm sm:text-base mb-4">Perfect for slow roasting. The fat renders beautifully for a melt-in-mouth experience.</p>
                            <div className="flex justify-between items-center">
                                <p className="text-sm sm:text-base">Price per 500g</p>
                                <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors" onClick={()=> navigate("/customer/login")}>
                                    <Sailboat size={16} />
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                        <img src={mutton} alt="" className="w-full h-48 sm:h-64 lg:h-[30vw] max-h-80 object-cover" />
                        <div className="p-4 sm:p-6">
                            <h2 className="font-bold text-lg sm:text-xl mb-2">Artisan Mince</h2>
                            <p className="text-gray-600 text-sm sm:text-base mb-4">Daily ground prime cuts. Ideal for traditional curries, kebabs and gourmet burgers.</p>
                            <div className="flex justify-between items-center">
                                <p className="text-sm sm:text-base">Price per 500g</p>
                                <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors" onClick={()=> navigate("/customer/login")}>
                                    <Sailboat size={16} />
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <aside className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-8 py-8 sm:py-12 max-w-7xl mx-auto">
                <div className="p-4 sm:p-7">
                    <button className="bg-green-300 p-3 rounded-xl mb-4"><Leaf size={24} className="text-[#217128]" /></button>
                    <h1 className="text-lg sm:text-xl font-bold mb-2">Farm to Fork</h1>
                    <p className="text-sm sm:text-base text-gray-600">We partner directly with ethical farmers. No middlemen, just fresh, quality livestock traceably sourced.</p>
                </div>
                <div className="p-4 sm:p-7">
                    <button className="bg-[#D32F2F] p-3 rounded-xl mb-4"><Truck size={24} className="text-white" /></button>
                    <h1 className="text-lg sm:text-xl font-bold mb-2">Fast Cold Chain</h1>
                    <p className="text-sm sm:text-base text-gray-600">Temperature-controlled delivery within 2 hours. Your meat stays at peak freshness from our shop to your fridge.</p>
                </div>
                <div className="p-4 sm:p-7">
                    <button className="bg-[#FFDF9E] p-3 rounded-xl mb-4"><ForkKnife size={24} /></button>
                    <h1 className="text-lg sm:text-xl font-bold mb-2">Master Butchery</h1>
                    <p className="text-sm sm:text-base text-gray-600">Every cut is hand-prepared by our in-house master butchers, ensuring the perfect grain and trimming.</p>
                </div>
            </aside>
            <footer className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 sm:px-8 py-8 sm:py-12 max-w-7xl mx-auto">
                <div>
                    <h1 className="text-2xl sm:text-4xl font-bold mb-2">The Atelier</h1>
                    <h1 className="text-2xl sm:text-4xl font-bold text-red-700 mb-4 sm:mb-7">Heritage</h1>
                    <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-10">Born from a generations-old family tradition, The Butcher's Atelier was founded to bring the quality of a village butcher to the digital age. We believe meat should be honored—sourced with respect, handled with care, and enjoyed with gratitude</p>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                        <div className="relative bg-gray-100 rounded-2xl p-4 sm:p-6 shadow-md w-full sm:w-64">
                            <div className="absolute left-0 top-0 h-full w-2 bg-red-600 rounded-l-2xl"></div>
                            <h1 className="text-2xl sm:text-3xl font-bold">24+</h1>
                            <p className="text-gray-600 font-semibold text-sm sm:text-base">PARTNER FARMS</p>
                        </div>
                        <div className="relative bg-gray-100 rounded-2xl p-4 sm:p-6 shadow-md w-full sm:w-64">
                            <div className="absolute left-0 top-0 h-full w-2 bg-green-600 rounded-l-2xl"></div>
                            <h1 className="text-2xl sm:text-3xl font-bold">100%</h1>
                            <p className="text-gray-600 font-semibold text-sm sm:text-base">Antibiotic Free</p>
                        </div>
                    </div>
                </div>
                <div className="relative bg-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-md max-w-full lg:max-w-xl mx-auto lg:mx-0">
                    <div className="absolute -top-3 sm:-top-4 right-3 sm:right-4 bg-white w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full shadow">
                        <span className="text-red-600 text-lg sm:text-2xl font-bold">99</span>
                    </div>

                    <p className="text-gray-700 italic leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                        "The quality is unmatched. You can see the freshness in the color and taste the heritage in the flavor. The doorstep delivery is a life-changer for my weekly meal prep."
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img
                                src="https://i.pravatar.cc/40"
                                alt="profile"
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                            />
                            <div>
                                <h4 className="font-semibold text-sm sm:text-base">Marcello Rossi</h4>
                                <p className="text-xs sm:text-sm text-gray-500">Executive Chef</p>
                            </div>
                        </div>

                        <div className="flex gap-1 text-yellow-500">
                            ⭐ ⭐ ⭐ ⭐ ⭐
                        </div>
                    </div>
                </div>
            </footer>
            <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-4 sm:py-6 border-t border-gray-200">
                <div className="mb-4 sm:mb-0 text-center sm:text-left">
                    <h1 className="text-lg sm:text-2xl font-bold text-[#7F1D1D]">The Butcher's Atelier</h1>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">© 2024 The Butcher's Atelier. Artisanal Quality.</p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                    <p className="hover:text-[#7F1D1D] transition-colors cursor-pointer text-sm sm:text-base">Sourcing</p>
                    <p className="hover:text-[#7F1D1D] transition-colors cursor-pointer text-sm sm:text-base">Privacy</p>
                    <p className="hover:text-[#7F1D1D] transition-colors cursor-pointer text-sm sm:text-base">Shopping</p>
                    <p className="hover:text-[#7F1D1D] transition-colors cursor-pointer text-sm sm:text-base">Contact</p>
                </div>
            </div>


        </>
    )
}

export default Navbar;