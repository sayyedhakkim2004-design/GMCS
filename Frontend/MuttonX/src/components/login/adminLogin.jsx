import { Mail, Lock, Eye, EyeOff, GitBranch, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";




function Login() {

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState("");


  async function submit(e) {
    e.preventDefault();
    try {
      const payload = {
        email: email,
        password: password,
        branch: branch
      }


      const res = await axios.post(`${import.meta.env.VITE_API_URL}/admin/verify`, payload, {
        withCredentials: true
      });
      toast.success("Admin Login Successfull");
      navigate("/admin/dashboard");
    }
    catch (err) {

      const message =
        err.response?.data?.message || "Invalid Email or Password";
      toast.error(message)

    }


  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

      {/* Title */}





      <h1 className="text-xl font-bold text-red-700 mb-6 flex items-center gap-2">
        <ArrowLeft size={18} onClick={() => navigate("/")} />
        Galaxy Mutton Stall Admin Login
      </h1>



      <form className="bg-white p-8 rounded-2xl shadow-md w-[400px] space-y-4" onSubmit={(e) => submit(e)}>

        {/* Email */}
        <div>
          <label className="font-semibold text-sm">Email</label>
          <div className="flex items-center border rounded-lg px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-blue-400">
            <Mail size={18} />
            <input
              type="email"
              placeholder="Enter your Email"
              className="ml-2 w-full outline-none"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="font-semibold text-sm">Password</label>
          <div className="flex items-center border rounded-lg px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-blue-400">
            <Lock size={18} />
            <input
              type={show ? "text" : "password"}
              placeholder="Enter your Password"
              className="ml-2 w-full outline-none"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="text-gray-500"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <div>
          <label className="font-semibold text-sm">Branch</label>

          <div className="flex items-center border rounded-lg px-3 py-2 mt-1 focus-within:ring-2 focus-within:ring-blue-400">

            <GitBranch size={18} />

            <select
              className="ml-2 w-full outline-none bg-transparent"
              required
              onChange={(e) => setBranch(e.target.value)}
            >
              <option value="">Select Branch</option>
              <option value="Papanasam">Papanasam</option>
              <option value="Andakudi">Andakudi</option>
            </select>

          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="flex justify-between items-center text-sm">


          <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => navigate("/admin/forgetPassword")}>
            Forgot password?
          </span>
        </div>

        {/* Button */}
        <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition" >
          Sign In
        </button>
        <button className="text-blue-600 text-center hover:underline transition" onClick={() => navigate("/admin/dashboard")}>
          Skip now
        </button>

        {/* Signup */}


      </form>
    </div>
  );
}
export default Login;