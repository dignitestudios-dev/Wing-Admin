import * as Yup from "yup";

export const signInSchema = Yup.object({
  phone: Yup.string().required("Please enter your phone number"),
});

export const createNotificationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  date: Yup.string().required("Date is required"),
  time: Yup.string().required("Time is required"),
  userType: Yup.string().required("User type is required"),
});
