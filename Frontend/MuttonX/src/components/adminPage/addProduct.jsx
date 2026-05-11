import { useState, useEffect } from "react";
import { Plus, Users, UserX, ArrowLeft } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"






function AddProduct() {
    const [currentView, setCurrentView] = useState('addProduct');
    const [productName, setProductName] = useState("");
    const [productRate, setProductRate] = useState("");
    const [available, setAvailable] = useState("");
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
         if (currentView === "viewLoggedUser") {
      getLogUser();
    }
        
    }, [page,currentView]);


    const addProduct = async (e) => {
        e.preventDefault();
        const payload = {
            productName,
            productRate: Number(productRate),
            isAvailable: available
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/product/create`, payload);
            toast.success("Product Added Successfully");
        }
        catch (err) {
            console.log(err);
            const message = err.response?.message || "Error Posting Data"
            toast.error(message);
        }
    }
    const getLogUser = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/customer/view?page=${page}&limit=6`);
          
            setUser(res.data.data);
            setTotalPage(res.data.pagination.totalPages);
        }
        catch (err) {
            console.log(err);
            const message = err.response?.message || "Error Posting Data"
            toast.error(message);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-orange-50 p-6">
            {/* Buttons */}
            <div className="flex gap-4 mb-6 justify-center">
                <button
                    onClick={() => navigate('/admin/dashboard')}
                    className="flex items-center gap-2 bg-gray-100 text-gray-800 px-5 py-2.5 rounded-lg hover:bg-gray-200 transition shadow-sm"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>
                <button
                    onClick={() => setCurrentView('addProduct')}

                    className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition shadow-lg"
                >
                    <Plus size={20} />
                    Add Product
                </button>
                <button
                    onClick={() => setCurrentView('viewLoggedUser')}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition shadow-lg"
                >
                    <Users size={20} />
                    View Logged User
                </button>

            </div>

            {/* Content */}
            {currentView === 'addProduct' && (
                <div className="max-w-md bg-white p-6 rounded-2xl shadow-lg border border-gray-200 space-y-5 mx-auto">

                    {/* Title */}
                    <h2 className="text-xl font-bold text-red-600 text-center">
                        🥩 Add Product - Galaxy Mutton & Chicken Stall 🐔
                    </h2>

                    {/* Product Name */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                            Product Name
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., Fresh Mutton, Chicken Breast"
                            className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>

                    {/* Rate */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                            Rate / kg (₹)
                        </label>
                        <input
                            type="number"
                            placeholder="e.g., 450"
                            className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
                            onChange={(e) => setProductRate(e.target.value)}
                        />
                    </div>

                    {/* Availability */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">
                            Is Available
                        </label>

                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 text-sm text-gray-700">
                                <input type="radio" name="availability" className="text-red-500" onClick={() => setAvailable(true)} />
                                Yes
                            </label>

                            <label className="flex items-center gap-2 text-sm text-gray-700">
                                <input type="radio" name="availability" className="text-red-500" onClick={() => setAvailable(false)} />
                                No
                            </label>

                        </div>
                        <button className="w-full bg-green-600 p-2 rounded-lg text-white font-semibold m-2" onClick={(e) => addProduct(e)} type="submit">Add</button>
                    </div>


                </div>
            )}

            {currentView === 'viewLoggedUser' && (
                <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-blue-700">
                            👥 User Directory
                        </h2>

                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                            {user.length} Users
                        </span>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                        {user.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition p-5 group"
                            >

                                {/* Top Section */}
                                <div className="flex items-center gap-3">

                                    {/* Avatar */}
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                                        {item.name?.charAt(0).toUpperCase()}
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
                                            {item.name
                                                .split(" ")
                                                .map(
                                                    (w) =>
                                                        w.charAt(0).toUpperCase() +
                                                        w.slice(1).toLowerCase()
                                                )
                                                .join(" ")}
                                        </h3>

                                        <p className="text-xs text-gray-500">
                                            Registered User
                                        </p>
                                    </div>

                                </div>

                                {/* Divider */}
                                <div className="my-4 border-t border-gray-100"></div>

                                {/* Info */}
                                <div className="space-y-2 text-sm">

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Email</span>
                                        <span className="text-gray-800 truncate max-w-[150px]">
                                            {item.email}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">Phone</span>
                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                            {item.phoneNumber}
                                        </span>
                                    </div>

                                </div>

                                {/* Action (optional future use) */}
                                <button className="mt-4 w-full py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
                                    View Profile
                                </button>

                            </div>

                        ))}
                    </div>
                    <div className="flex items-center justify-center gap-3 mt-6  bg-white py-4">

                        {/* Prev */}
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
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
                            onClick={() => setPage((prev) => Math.min(prev + 1, totalPage))}
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
                </div>
            )}


        </div>
    );
}
export default AddProduct;