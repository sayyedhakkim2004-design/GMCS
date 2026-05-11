import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";



function CustomerFormUI() {

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    async function submit(e) {
        e.preventDefault();
        try {
            const payload = {
                name: name,
                phoneNumber: phone,
                email: email,
                password: password
            }
            console.log(payload);
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/customer/create`, payload);
            toast.success("Account Created Successfully");
            navigate("/customer/order");

        }
        catch (err) {
            console.log(err);
            const message = err.response.data.message || "can't Create Account"
            toast.error(message);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Create Account For You
                </h2>

                <form className="space-y-5" onSubmit={(e) => submit(e)}>
                    {/* Name */}
                    <div>
                        <label className="text-sm text-gray-600">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition"
                            onChange={(e) => setName(e.target.value)}

                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="text-sm text-gray-600">Phone Number</label>
                        <input
                            type="tel"
                            placeholder="Enter phone number"
                            className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition"

                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm text-gray-600">Password</label>

                        <div className="flex items-center border rounded-xl px-3 mt-1">

                            <input
                                type={show ? "text" : "password"}
                                placeholder="Enter password"
                                className="w-full py-2 outline-none"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                type="button"
                                onClick={() => setShow(!show)}
                                className="text-gray-500 ml-2"
                            >
                                {show ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>

                        </div>
                    </div>

                    {/* Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-green-500 text-white py-2 rounded-xl font-semibold shadow-md hover:bg-green-600 transition"
                    >
                        Submit
                    </motion.button>
                    <p className="text-center">
                        Already have an Account?<span className="ml-2 text-blue-500 cursor-pointer hover:underline" onClick={() => navigate("/customer/login")}>
                            Login
                        </span>
                    </p>
                </form>
            </motion.div>
        </div>
    );
}
export default CustomerFormUI
