import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../redux/actions/userActions";
import { RootState, AppDispatch } from "../redux/store";
import SkewLoader from "react-spinners/SkewLoader";




function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.user);

  const initialValues = {
    email: "",
    password: "",
    username: ""
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    username: Yup.string().min(3).required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be at least 8 characters and include uppercase letter, lowercase letter,and special character"
      )
      .max(20, "Must be less than 20 characters"),
  });

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    dispatch(register(values))
    setSubmitting(false);

  };

  return (
    <div className="flex sm:px-[12%] flex-col-reverse sm:flex-row px-4 mt-4 ">
      <div className="lg:w-[50%] w-full flex justify-center items-center py-20 sm:backdrop-blur-[15px]  h-[680px] sm:bg-white sm:bg-opacity-30 sm:max-w-[640px] sm:min-w-[550px] rounded-[25px]">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col mt-10 max-w-full w-[410px] max-md:mt-10">
              <div className="self-start ml-2.5 text-4xl font-bold text-slate-900">
                Register
              </div>
              <p className="text-red-500 font-semibold text-center">
                {error}
              </p>
              <label className="mt-7 text-sm text-slate-900">Username</label>
              <Field
                type="text"
                name="username"
                className="justify-center h-14 items-start py-2 pr-2 pl-6 mt-2 text-sm whitespace-nowrap bg-white rounded-3xl text-black font-bold max-md:px-5 outline-none border-none"
                placeholder="username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-600"
              />
              <label className="mt-7 text-sm text-slate-900">Email</label>
              <Field
                type="text"
                name="email"
                className="justify-center h-14 items-start py-2 pr-2 pl-6 mt-2 text-sm whitespace-nowrap bg-white rounded-3xl text-black font-bold max-md:px-5 outline-none border-none"
                placeholder="email@gmail.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-600"
              />
              <label className="mt-8 text-sm text-slate-900">Password</label>
              <div className="relative flex">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="flex-1 px-6 py-4 pr-16 mt-2.5 text-sm whitespace-nowrap bg-white rounded-3xl text-black font-bold max-md:px-5 outline-none border-none"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-9 right-0 flex items-center px-4 focus:outline-none"
                >
                  {!showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-600"
              />
              <div className="flex flex-col pl-2.5 mt-5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex justify-center items-center px-16 py-3.5 mt-9 text-xl font-bold text-white whitespace-nowrap bg-orange-600 rounded-3xl max-md:px-5 relative"
                >
                  {loading ? (
                    <SkewLoader
                      color="#ffffff"
                      loading={loading}
                    />
                  ) : "Register"}
                </button>
                <div className="self-start mt-8 ml-10 ms-16 text-sm whitespace-nowrap text-slate-900 max-md:ml-2.5">
                  <div className="flex">
                    Already have account ?
                    <h1 className="text-blue-800  font-semibold">
                      <Link to="/login">Login</Link>
                    </h1>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="hidden lg:flex items-center justify-center lg:w-[50%] md:ml-[3%] ml-auto max-w-[700px]">
        <img
          src="/src/assets/undraw_sign_up_n6im.svg"
          alt="Login Image"
          className="object-cover "
        />
      </div>
    </div >
  );
}

export default Register;