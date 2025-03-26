import React, { useState } from "react";
import AuthInput from "../../components/authentication/AuthInput";
import AuthSubmitBtn from "../../components/authentication/AuthSubmitBtn";
import { useNavigate } from "react-router";
import { Gradient, Black, Pill, Logo, LoginImage } from "../../assets/export";
import { useLogin } from "../../hooks/api/Post";
import { processLogin } from "../../lib/utils";
import { useFormik } from "formik";
import { loginValues } from "../../init/authentication/dummyLoginValues";
import { signInSchema } from "../../schema/authentication/dummyLoginSchema";

const Login = () => {
  const { loading, postData } = useLogin();
  const navigate = useNavigate();

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: loginValues,
      validationSchema: signInSchema,
      validateOnChange: true,
      validateOnBlur: true,
      onSubmit: async (values, action) => {
        const data = { phone: values.phone };

        postData("/auth/signIn/admin", false, null, data, processLogin);
      },
    });

  return (
    <div className="flex w-full h-screen overflow-hidden bg-gradient-to-b from-[#24638F] to-[#051724] ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        className="w-full lg:w-1/2 h-full bg-white p-8 lg:p-20 flex flex-col justify-start items-start gap-8"
      >
        <div className="flex justify-left items-left mr-14 w-full">
          <img
            src={Logo}
            alt="logo"
            className="h-[124px] W-[124px] hidden lg:block"
          />
        </div>

        <h1 className="text-left text-4xl font-bold text-black ml-8">Log in</h1>
        <span className="text-[14px] text-[#868686] ml-8 -mt-6">
          Enter your phone number below to log in
        </span>
        <div className="flex flex-col w-full h-auto justify-start items-start gap-4 ml-8 ">
          <AuthInput
            id="phone"
            text={"Phone"}
            placeholder={"Enter phone number here"}
            type={"tel"}
            name="phone"
            value={values?.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors?.phone}
            touched={touched?.phone}
          />
          {/* {errors.phone && touched.phone && (
            <p className="text-red-700 text-sm font-medium">{errors.phone}</p>
          )} */}
        </div>
        <div className="ml-8">
          <AuthSubmitBtn text={"Next"} loading={loading} />
        </div>
      </form>

      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 h-full relative">
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
