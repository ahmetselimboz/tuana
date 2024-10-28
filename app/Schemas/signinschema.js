import * as yup from "yup";

export const signinschema = yup.object().shape({
  name: yup.string().required("Firstname is required"),
  surname: yup.string().required("Lastname is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .min(8, "The password must be at least 8 characters")
    .max(20, "The password can be up to 20 characters")
    .matches(/[a-z]/, "The password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "The password must contain at least one capital letter")
    .matches(/\d/, "The password must contain at least one number")
    .matches(
      /[@$!%*#?&..+]/,
      "The password must contain at least one special character"
    )
    .required("Password is required"),

});
