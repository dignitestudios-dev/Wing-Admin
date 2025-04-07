import React from "react";

const AuthSubmitBtn = ({ text, loading }) => {
  return (
    <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
      <button
        type="submit"
        disabled={loading}
        className="w-full h-[52px] lg:w-[434px] bg-[#5BAFEB] text-white rounded-full flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px] py-3"
      >
        {loading ? (
          <div className="flex justify-center items-center">
            <span>Loading...</span>
          </div>
        ) : (
          text
        )}
      </button>
    </div>
  );
};

export default AuthSubmitBtn;
