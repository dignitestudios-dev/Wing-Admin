import React, { useContext } from "react";
import AuthInput from "../../components/authentication/AuthInput";
import AuthSubmitBtn from "../../components/authentication/AuthSubmitBtn";
import { useNavigate } from "react-router";
import { Gradient, Black, Pill, Logo, LoginImage } from "../../assets/export";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full h-screen overflow-hidden bg-gradient-to-b from-[#24638F] to-[#051724] ">
      <form
        onSubmit={() => navigate("/app/dashboard", "Home")}
        className="w-full lg:w-1/2 h-full bg-white p-8 lg:p-20 flex flex-col justify-start items-start gap-8"
      >
        <div className="flex justify-left items-left mr-14 w-full ">
          <img
            src={Logo}
            alt="logo"
            className="h-[124px] W-[124px] hidden lg:block"
          />
        </div>

        <h1 className="text-left text-4xl font-bold text-black ml-8">Log in</h1>

        <p className="text-[14px] text-[#868686] ml-8">
          Enter details below to log in
        </p>
        <div className="flex flex-col w-full h-auto justify-start items-start gap-4 ml-8 ">
          <AuthInput
            text={"Email"}
            placeholder={"Type your email address here"}
            type={"text"}
          />
          <div className="flex flex-col w-full lg:w-[434px] justify-start items-end gap-1">
            <AuthInput
              text={"Password"}
              placeholder={"Enter Password"}
              type={"password"}
            />
            <button
              type="button"
              onClick={() => navigate("auth/forgot-password")}
              className="text-sm font-medium text-[#109BFF]"
            >
              Forgot Password?
            </button>
          </div>
        </div>
        <div className="ml-8">
          <AuthSubmitBtn text={"Log in"} />
        </div>
      </form>

      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-full relative">
        {/* <img
          src={Gradient}
          alt="gradient"
          className="absolute inset-25 w-full h-full"
        />

        <img
          src={Black}
          alt="black_overlay"
          className="absolute inset-25 w-[60%] h-[60%]"
        /> */}

        <div className="relative flex justify-center items-center h-full mb-28">
          <img
            src={LoginImage}
            alt="login_mockup"
            className="relative w-[80%] h-auto object-contain"
          />
        </div>

        <div className="absolute bottom-10 text-white text-center z-20">
          <h3 className="text-lg font-medium">Connect with any device.</h3>
          <p className="text-sm">
            Everything you need is an internet connection.
          </p>

          <div className="mt-2 flex justify-center">
            <img src={Pill} alt="pill" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
