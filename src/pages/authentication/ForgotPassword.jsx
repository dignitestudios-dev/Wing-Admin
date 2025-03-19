import React, { useContext } from "react";
import AuthInput from "../../components/authentication/AuthInput";
import AuthSubmitBtn from "../../components/authentication/AuthSubmitBtn";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router";

import { Gradient, Black, Pill, Logo, VerifyOtpImg } from "../../assets/export";

const ForgotPassword = () => {
  const arr = [1, 2, 3, 4, 5, 6];
  const navigate = useNavigate();

  return (
    <>
      <div className="w-screen h-screen flex items-start justify-start bg-gradient-to-b from-[#24638F] to-[#051724] ">
        <form
          onSubmit={() => navigate("/auth/verify-otp")}
          className="w-full lg:w-1/2 h-full bg-white px-4  lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-center gap-6"
        >
          <div className="flex justify-left items-left mr-10 w-full ">
            <img
              src={Logo}
              alt="logo"
              className="h-[124px] W-[124px] hidden lg:block"
            />
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full flex justify-start items-start "
          >
            <BiArrowBack className="text-3xl text-black" />
          </button>

          <div className="w-full flex flex-col justify-start items-start">
            <h1 className="text-[48px] font-bold text-black leading-[64.8px] tracking-[-1.2px]">
              Forgot Password
            </h1>
            <p className="w-[90%] font-normal text-[16px] text-black leading-[21.6px] tracking-[-1.2px]">
              You can get them back easily.
            </p>
          </div>

          <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
            <AuthInput
              text={"Email Address"}
              placeholder={"Type your email here"}
              type={"text"}
            />
          </div>

          <AuthSubmitBtn text={"Next"} />
        </form>

        <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-full relative">
          {/* <img
            src={Gradient}
            alt="auth_mockup"
            className="absolute inset-25 w-full h-full"
          />

          <img
            src={Black}
            alt="black_overlay"
            className="absolute inset-25 w-[60%] h-[60%]"
          /> */}

          <div className="relative flex justify-center items-center h-full mb-28">
            <img
              src={VerifyOtpImg}
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
    </>
  );
};

export default ForgotPassword;
