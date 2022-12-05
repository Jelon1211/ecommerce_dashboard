import * as Yup from "yup";

export const validationRules = {
  firstName: Yup.string().required("Please fulfill marked fields."),
  lastName: Yup.string().required("Please fulfill marked fields."),
  email: Yup.string()
    .required("Please fulfill marked fields.")
    .email("Invalid email adress"),
  password: Yup.string()
    .required("Please fulfill marked fields.")
    .min(3, "Miniumum length is 3"),
  retypePassword: Yup.string()
    .required("Please fulfill marked fields.")
    .oneOf([Yup.ref("password")], "The passwords does not match"),
};
