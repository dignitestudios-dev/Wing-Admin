import React, { useContext } from "react";
import AuthSubmitBtn from "../../components/authentication/AuthSubmitBtn";
import { useNavigate } from "react-router";
import { BiArrowBack } from "react-icons/bi";

import {
  Gradient,
  // OnboardingImage,
  Black,
  Pill,
  Logo,
  VerificationImg,
} from "../../assets/export";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const arr = [1, 2, 3, 4, 5, 6];
  return (
    <div className="w-screen h-screen flex items-start justify-start bg-gradient-to-b from-[#24638F] to-[#051724] ">
      <form
        onSubmit={() => navigate("/app/dashboard")}
        className="w-full lg:w-1/2 h-full bg-white px-4 py-8 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-center gap-8"
      >
        <div className="flex justify-left items-left mr-10 w-full ">
          <img
            src={Logo}
            alt="logo"
            className="h-[124px] W-[124px] hidden lg:block"
          />
        </div>
        {/* <button
          onClick={() => navigate(-1)}
          className="w-full flex justify-start items-start flex-col"
        >
          <BiArrowBack className="text-3xl text-black" />
        </button> */}

        <div className="w-full flex justify-start items-start flex-col">
          <h1 className="text-[36px] font-bold text-black ">
            OTP Verification
          </h1>
          <p className="font-normal text-[16px] text-[#868686] ">
            You are one step away from logging in{" "}
          </p>
        </div>

        <div className="w-full h-auto flex justify-start items-center gap-2 my-2 flex-wrap">
          {arr.map((item) => (
            <input
              key={item}
              className="flex-1 min-w-[50px] max-w-[66px] h-[60px] rounded-xl bg-transparent outline-none text-center border border-[#c2c6cb] text-3xl focus:bg-[#D0FCB333] focus-within:border-[#55C9FA]"
              maxLength={1}
            />
          ))}
        </div>

        <div className="w-full h-auto flex -mt-8 flex-col gap-1 justify-start items-start">
          <div className="w-full lg:w-[434px] flex gap-1 justify-start items-center">
            <span className="text-[13px] font-medium text-[#C2C6CB]">
              Didn't receive a code?
            </span>
            <button className="outline-none text-[13px] border-none text-[#5BAFEB] font-bold">
              Resend now
            </button>
          </div>
        </div>
        <AuthSubmitBtn text={"Log In"} />
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
