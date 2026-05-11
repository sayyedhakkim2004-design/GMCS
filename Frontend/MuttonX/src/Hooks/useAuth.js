import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"


export default function useAuth(config) {

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [step, setStep] = useState(false);
    const [verified, setVerified] = useState(false);
    const [otpEmail, setOtpEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");


    async function sendOtp(e) {
        e.preventDefault();
        try {
            const payload = {
                email: otpEmail
            }
            const res = await axios.post(config.resetUrl, payload)
            toast.success("OTP Send to your Email")
            setStep(true);
        }
        catch (err) {
            console.log(err);
            const message = err.response?.data?.message || "OTP Not Send";
            toast.error(message)
        }
    }

    async function verifyOtp(e) {
        e.preventDefault();
        try {
            const payload = {
                email: otpEmail,
                otp: otp
            }
            const res = await axios.post(config.verifyUrl, payload,
                { withCredentials: true });
            toast.success("Enter Your New Password")
            setVerified(true);
        }
        catch (err) {
            console.log(err);
            const message = err.response?.data?.message || "OTP Not Verified";
            toast.error(message)
        }
    }

    async function resetPassword(e,navigate) {
        e.preventDefault();
        try {
            const payload = {
                email: otpEmail,
                password: newPassword
            }
            const res = await axios.post(config.resetPasswordUrl,
                payload,
                { withCredentials: true });
            toast.success("Now You Can Login")
            navigate(config.redirect)

        }
        catch (err) {
            console.log(err);
            const message = err.response?.data?.message || "Can't Reset Password";
            toast.error(message)
        }
    }

    return {
        show, setShow,navigate,
        step, setStep,
        verified, setVerified,
        otpEmail, setOtpEmail,
        otp, setOtp,
        newPassword, setNewPassword,
        sendOtp, verifyOtp, resetPassword


    };
}