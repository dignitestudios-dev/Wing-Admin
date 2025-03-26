import React from "react";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import { FaCalendarAlt, FaClock, FaArrowLeft } from "react-icons/fa";
import { useNotification } from "../../../hooks/api/Post";
import { processNotification } from "../../../lib/utils";
import { createNotificationValues } from "../../../init/authentication/dummyLoginValues";
import { createNotificationSchema } from "../../../schema/authentication/dummyLoginSchema";

const CreateNotification = () => {
  const navigate = useNavigate();
  const { loading, postNotificationData } = useNotification();

  const formik = useFormik({
    initialValues: createNotificationValues,
    validationSchema: createNotificationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const data = {
        title: values?.title,
        description: values?.description,
        date: `${values?.date}T${values?.time}:00Z`,
        role: values?.userType,
      };

      try {
        await postNotificationData(
          "/admin/notification",
          data,
          processNotification
        );
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="w-full h-full mx-auto bg-white p-6 ml-1 mt-8 rounded-xl shadow">
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate("/app/notifications")}
          className="flex items-center text-black hover:text-gray-800 mr-2"
        >
          <FaArrowLeft />
        </button>
        <h2 className="text-xl font-semibold">Create Notification</h2>
      </div>
      <div className="p-6">
        <form onSubmit={formik?.handleSubmit}>
          <div className="mb-4">
            <span className="text-gray-700 mb-2">Title of Notification</span>
            <input
              type="text"
              placeholder="Title of Notification"
              name="title"
              value={formik?.values?.title}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              className="w-full border rounded-md p-2 mb-4 outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formik?.touched?.title && formik?.errors?.title && (
              <p className="text-red-700 text-sm">{formik?.errors?.title}</p>
            )}
          </div>

          <div className="mb-4">
            <span className="text-gray-700 mb-2">
              Description of Notification
            </span>
            <textarea
              placeholder="Description of Notification"
              name="description"
              value={formik?.values?.description}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              className="w-full border rounded-md p-2 mb-4 outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formik?.touched?.description && formik?.errors?.description && (
              <p className="text-red-700 text-sm">
                {formik?.errors?.description}
              </p>
            )}
          </div>

          <div className="flex gap-0 mb-4">
            <div className="relative mr-2">
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                name="date"
                value={formik?.values?.date}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                className="w-[220px] border rounded-xl p-2 pl-10 outline-none focus:ring-2 focus:ring-blue-400"
              />
              {formik?.touched?.date && formik?.errors?.date && (
                <p className="text-red-700 text-sm">{formik?.errors?.date}</p>
              )}
            </div>
            <div className="relative">
              <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="time"
                name="time"
                value={formik?.values?.time}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                className="w-[220px] border rounded-xl p-2 pl-10 outline-none focus:ring-2 focus:ring-blue-400"
              />
              {formik?.touched?.time && formik?.errors?.time && (
                <p className="text-red-700 text-sm">{formik?.errors?.time}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <span className="text-gray-700">User Type-Based</span>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="userType"
                  value="winging"
                  checked={formik?.values?.userType === "winging"}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  className="form-radio"
                />
                Winging Only Users
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="userType"
                  value="dating"
                  checked={formik?.values?.userType === "dating"}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  className="form-radio"
                />
                Dating Plus Winging Users
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="userType"
                  value="all"
                  checked={formik?.values?.userType === "all"}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  className="form-radio"
                />
                All Users (Both Categories)
              </label>
            </div>
            {formik?.touched?.userType && formik?.errors?.userType && (
              <p className="text-red-700 text-sm">{formik?.errors?.userType}</p>
            )}
          </div>

          <div className="flex gap-4 mt-2">
            <button
              type="submit"
              className="bg-[#5BAFEB] w-[150px] h-[50px] text-white px-6 py-2 rounded-md hover:bg-[#41a1e6]"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/notifications")}
              className="bg-gray-300 text-[14px] w-[150px] h-[50px] font-bold text-black px-6 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNotification;
