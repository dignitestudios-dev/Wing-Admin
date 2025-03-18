import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { ChangePasswordMockup } from "../../../assets/export";

const UpdatePassword = () => {
  // States to manage the data
  const [password, setPassword] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confPass, setConfPass] = useState("");

  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isNewPassVisible, setIsNewPassVisible] = useState(false);
  const [isConfPassVisible, setIsConfPassVisible] = useState(false);

  function handleChangePass(e) {
    e.preventDefault();
    if (newPass === "") {
      alert("New Password is required.");
    } else if (newPass.length < 6) {
      alert("Minimum Password length is 6.");
    } else if (newPass !== confPass) {
      alert("Passwords must match.");
    } else {
      // Simulate success (e.g., password updated)
      alert("Password updated successfully!");
    }
  }

  return (
    <div className="font-[sans-serif] text-[#333] bg-white p-6 mt-8 ml-1 rounded-xl">
      <div className="min-h-full flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-7xl w-full">
          <div className="rounded-md p-6 max-w-md  max-md:mx-auto">
            <form className="space-y-6" onSubmit={handleChangePass}>
              <div className="mb-10">
                <h3 className="text-3xl font-extrabold">Update Password.</h3>
                <p className="text-sm mt-4">Update your password!</p>
              </div>
              <div>
                <label className="text-sm mb-2 block">Current Password</label>
                <div className="relative flex items-center">
                  <input
                    name="pass1"
                    type={isPassVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-sm border border-gray-300 px-4 py-3 rounded-xl outline-[#333]"
                    placeholder="Current Password"
                  />
                  <button
                    type="button"
                    onClick={() => setIsPassVisible((prev) => !prev)}
                    className="w-[18px] h-[18px] absolute right-4"
                  >
                    {isPassVisible ? (
                      <BsEye color="#bbb" />
                    ) : (
                      <BsEyeSlash color="#bbb" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm mb-2 block">New Password</label>
                <div className="relative flex items-center">
                  <input
                    name="pass1"
                    type={isNewPassVisible ? "text" : "password"}
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full text-sm border border-gray-300 px-4 py-3 rounded-xl outline-[#333]"
                    placeholder="New Password"
                  />
                  <button
                    type="button"
                    onClick={() => setIsNewPassVisible((prev) => !prev)}
                    className="w-[18px] h-[18px] absolute right-4"
                  >
                    {isNewPassVisible ? (
                      <BsEye color="#bbb" />
                    ) : (
                      <BsEyeSlash color="#bbb" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm mb-2 block">
                  Confirm New Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="pass1"
                    type={isConfPassVisible ? "text" : "password"}
                    value={confPass}
                    onChange={(e) => setConfPass(e.target.value)}
                    className="w-full text-sm border border-gray-300 px-4 py-3 rounded-xl outline-[#333]"
                    placeholder="Confirm New Password"
                  />
                  <button
                    type="button"
                    onClick={() => setIsConfPassVisible((prev) => !prev)}
                    className="w-[18px] h-[18px] absolute right-4"
                  >
                    {isConfPassVisible ? (
                      <BsEye color="#bbb" />
                    ) : (
                      <BsEyeSlash color="#bbb" />
                    )}
                  </button>
                </div>
              </div>

              <div className="!mt-4">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-md text-white bg-[#5BAFEB] hover:bg-[#5BAFEB] focus:outline-none"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
          <div className="lg:h-[550px] md:h-[400px] max-md:mt-10">
            <img
              src={ChangePasswordMockup}
              className="w-full h-full object-cover"
              alt="Authentication Mockup"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
