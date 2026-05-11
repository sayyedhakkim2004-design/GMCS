import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import useAuth from "../../Hooks/useAuth.js"


function CustomerForgotPassword() {

  const { show, setShow,navigate,
    step, setStep,
    verified, setVerified,
    otpEmail, setOtpEmail,
    otp, setOtp,
    newPassword, setNewPassword,
    sendOtp, verifyOtp, resetPassword } = useAuth({
      resetUrl: `${import.meta.env.VITE_API_URL}/customer/reset`,
      verifyUrl: `${import.meta.env.VITE_API_URL}/customer/verify-otp`,
      resetPasswordUrl: `${import.meta.env.VITE_API_URL}/customer/reset-password`,
      redirect: "/customer/order"
    });


  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-[350px] space-y-5">

        {/* Title */}
        <h1 className="text-center text-xl font-bold text-red-700">
          Galaxy Mutton Stall Customer Reset Password
        </h1>

        {/* Email */}
        <div>
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
            <Mail size={18} className="text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              className="ml-2 w-full outline-none"
              required={true}
              onChange={(e) => setOtpEmail(e.target.value)}
            />
          </div>
        </div>


        {/* Password */}


        {!step ? (
          <button className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition " onClick={(e) => { sendOtp(e) }} >
            Send </button>) :
          verified ? (
            <div>Enter Your New Password

              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
                <Lock size={18} className="text-gray-500" />
                <input
                  type={show ? "text" : "password"}
                  placeholder="Enter New Password"
                  className="ml-2 w-full outline-none"
                  required={true}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="text-gray-500"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>

              </div>
              <button className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition mt-10" onClick={(e) => resetPassword(e,navigate)} >
                Submit
              </button>
            </div>
          ) : (
            <div>Enter Otp Send Through Your Gmail
              <div>
                <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-red-400">
                  <Lock size={18} className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Enter Otp"
                    className="ml-2 w-full outline-none"
                    required={true}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button
                    type="button"
                    className="text-gray-500"
                  >
                  </button>
                </div>

              </div>
              <button className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition mt-10 " onClick={(e) => { verifyOtp(e) }} >
                verify</button>
            </div>
          )}





      </div>
    </div>
  );
}
export default CustomerForgotPassword;