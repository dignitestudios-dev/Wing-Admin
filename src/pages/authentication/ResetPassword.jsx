import React, { useContext, useState } from "react";
import AuthInput from "../../components/authentication/AuthInput";
import AuthSubmitBtn from "../../components/authentication/AuthSubmitBtn";
// import { GlobalContext } from "../../contexts/GlobalContext";
import { BiArrowBack } from "react-icons/bi";
import PasswordUpdateModal from "../../components/authentication/PasswordUpdateModal";
import {
  Gradient,
  Black,
  Pill,
  ResetPasswordImg,
  Logo,
} from "../../assets/export";
import { useNavigate } from "react-router";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [isUpdated, setIsUpdated] = useState(false);

  return (
    <div className="w-screen h-screen flex items-start justify-start bg-gradient-to-b from-[#24638F] to-[#051724] ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsUpdated(true);
        }}
        className="w-full lg:w-1/2 h-full bg-white px-4 py-4 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-center gap-8"
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
          className="w-full flex justify-start items-start flex-col"
        >
          <BiArrowBack className="text-3xl text-black" />
        </button>

        <div className="w-full flex justify-start -mt-6 items-start flex-col">
          <h1 className="text-[36px] font-bold text-black leading-[64.8px] tracking-[-1.2px]">
            Reset Password{" "}
          </h1>
          <p className="#868686">Set new password</p>
        </div>

        <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
          <AuthInput
            text={"New Password"}
            placeholder={"Enter Password"}
            type={"password"}
          />
          <AuthInput
            text={"Confirm Password"}
            placeholder={"Enter Password"}
            type={"password"}
          />
        </div>

        <AuthSubmitBtn text={"Update "} />

        {isUpdated && (
          <PasswordUpdateModal
            isOpen={isUpdated}
            onRequestClose={() => setIsUpdated(false)}
          />
        )}
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
            src={ResetPasswordImg}
            alt="login_mockup"
            className="relative w-[90%] h-full object-contain"
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

export default ResetPassword;
