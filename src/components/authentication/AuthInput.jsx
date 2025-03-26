import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const AuthInput = ({
  type,
  id,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  text,
  error,
  touched,
}) => {
  const [isPassVisible, setIsPassVisible] = useState(false);

  return (
    <div className="w-full h-auto flex flex-col gap-1 justify-start items-start  ">
      <label className="ml-1 text-[16px] font-medium text-black capitalize">
        {text}
      </label>

      <div
        className={`w-full h-[52px] lg:w-[434px] text-white border border-gray-300 focus-within:border-[1px]
            rounded-lg bg-white bg-opacity-30 flex items-center justify-start  ${
              error && "focus-within:border-red-600 focus-within:border-[1px]"
            } `}
      >
        <div
          className={` w-full  h-full flex items-center justify-center  rounded-[12px] relative`}
        >
          <input
            id={id}
            name={name}
            type={isPassVisible ? "text" : type}
            placeholder={placeholder}
            // placeholder={placeholder}
            className={`w-full outline-none bg-transparent rounded-full
              ${
                type == "password"
                  ? ` text-[14px]  ${
                      isPassVisible
                        ? "font-medium tracking-wide"
                        : "font-verdana tracking-wider text-[18px]"
                    }`
                  : "text-[14px] text-black font-medium tracking-wide"
              } h-full px-4`}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
          <button
            type="button"
            onClick={() => setIsPassVisible((prev) => !prev)}
            className="absolute top-4 text-lg right-2"
            style={{
              color: "#6B7373",
            }}
          >
            {type == "password" &&
              (!isPassVisible ? <BsEyeSlash /> : <BsEye />)}
          </button>
        </div>
      </div>
      {error && touched && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default AuthInput;
