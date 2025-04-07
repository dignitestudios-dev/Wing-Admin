import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { BiArrowBack } from "react-icons/bi";
import { useVerifyOtp } from "../../hooks/api/Post";
import AuthSubmitBtn from "../../components/authentication/AuthSubmitBtn";
import { ErrorToast } from "../../components/global/Toaster";
import { otpValues } from "../../init/authentication/dummyLoginValues";
import { useResendOtp } from "../../hooks/api/Post";

import Cookies from "js-cookie";

import {
  Gradient,
  Black,
  Pill,
  Logo,
  VerificationImg,
} from "../../assets/export";
import { processOtp } from "../../lib/utils";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const { loading, verifyOtp } = useVerifyOtp();
  const { loading: resendLoading, resendOtp } = useResendOtp();

  const [otp, setOtp] = useState(otpValues.otp);

  const [phone, setPhone] = useState("");
  const [fcmToken, setFcmToken] = useState("");
  const [deviceIdentity, setDeviceIdentity] = useState("");

  useEffect(() => {
    setPhone(Cookies.get("phone") || "");
    setFcmToken(Cookies.get("fcmToken") || "");
    setDeviceIdentity(Cookies.get("devinavigateceIdentity") || "");
  }, []);

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpValuesString = otp.join("");

    if (otpValuesString.length !== 4) {
      ErrorToast("Please enter a valid 4-digit OTP.");
      return;
    }

    if (!phone || !deviceIdentity || !fcmToken) {
      ErrorToast(
        "Required fields (phone, deviceIdentity, fcmToken) are missing."
      );
      return;
    }
    const requestData = {
      phone,
      deviceIdentity,
      fcmToken,
      otp: otpValuesString,
    };

    verifyOtp("/auth/otp/verify", false, null, requestData, processOtp);
  };

  const handleResendOtp = async () => {
    if (phone) {
      await resendOtp("/auth/otp/resend", phone, () => {
        console.log("OTP Resent to:", phone);
      });
    } else {
      ErrorToast("Phone number is missing. Please try again.");
    }
  };

  return (
    <div className="w-screen h-screen flex items-start justify-start bg-gradient-to-b from-[#24638F] to-[#051724]">
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-1/2 h-full bg-white px-4 py-8 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-center gap-8"
      >
        <div className="flex justify-left items-left mr-10 w-full">
          <img
            src={Logo}
            alt="logo"
            className="h-[124px] W-[124px] hidden lg:block"
          />
        </div>

        <div className="w-full flex justify-start items-start flex-col">
          <h1 className="text-[36px] font-bold text-black">OTP Verification</h1>
          <p className="font-normal text-[16px] text-[#868686]">
            You are one step away from logging in{" "}
          </p>
        </div>

        <div className="w-full h-auto flex justify-start items-center gap-2 my-2 flex-wrap">
          {otp.map((item, index) => (
            <input
              key={index}
              className="flex-1 min-w-[50px] max-w-[66px] h-[60px] rounded-xl bg-transparent outline-none text-center border border-[#5BAFEB] text-3xl focus:bg-[#cbe9ff] focus-within:border-[#55C9FA]"
              maxLength={1}
              value={item}
              onChange={(e) => handleOtpChange(e, index)}
            />
          ))}
        </div>

        <div className="w-full h-auto flex -mt-8 flex-col gap-1 justify-start items-start">
          <div className="w-full lg:w-[434px] flex gap-1 justify-start items-center">
            <span className="text-[13px] font-medium text-[#C2C6CB]">
              Didn't receive a code?
            </span>
            <button
              type="button"
              onClick={handleResendOtp}
              className="outline-none text-[13px] border-none text-[#5BAFEB] font-bold"
            >
              {resendLoading ? "Resending..." : "Resend now"}
            </button>
          </div>
        </div>

        <AuthSubmitBtn
          text={loading ? "Verifying..." : "Verify OTP"}
          disabled={loading}
        />
      </form>

      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-full relative">
        <div className="relative flex justify-center items-center h-full mb-28">
          <img
            src={VerificationImg}
            alt="login_mockup"
            className="relative w-[85%] h-full object-contain"
          />
        </div>

        <div className="absolute bottom-10 text-white text-center z-20">
          <h3 className="text-[20px] font-medium">This is the end!</h3>
          <p className="text-[16px] text-[#E0EAFFBF]">
            After entering the new password you will gain access to your
            account.
          </p>

          <div className="mt-2 flex justify-center">
            <img src={Pill} alt="pill" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
