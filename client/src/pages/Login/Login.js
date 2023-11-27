import Layout from "../../components/Layout/Root";
import { useEffect, useState } from "react";
import {
  GetAllBooks,
  LoginApi,
  RegisterApi,
} from "./../../services/fetch-apis";

import classes from "./Login.module.css";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button/Button";

import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../../store/ui-slice/ui-slice";
import Input from "../../components/UI/Input/Input";
import { userAction } from "../../store/user-slice/user-slice";
import {
  addtolocalStorage,
  getfromLocalStorage,
} from "../../services/localStorage";
import { cartAction } from "../../store/cart-slice/cart-slice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const userSlice = useSelector((state) => state.user);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = getfromLocalStorage("user-slice");
    const cart = getfromLocalStorage("cart-slice");
    const addToStore = () => {
      console.log("sf", user);
      dispatch(cartAction.CartReplaceHandler({ ...cart }));
      dispatch(userAction.setLogin({ ...user }));
    };
    {
      const putData = () =>
        Object.keys(cart).length !== 0 && Object.keys(cart).length !== 0
          ? addToStore()
          : "";
      putData();
      console.log(cart, user);
    }
  }, []);

  const initialStateErrors = {
    email: { required: false },
    password: { required: false },
    custom_error: null,
  };
  const [errors, setErrors] = useState(initialStateErrors);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    let newErrors = { ...initialStateErrors };
    let hasError = false;

    if (inputs.email === "") {
      newErrors.email.required = true;
      hasError = true;
    }
    if (inputs.password === "") {
      newErrors.password.required = true;
      hasError = true;
    }
    console.log(inputs.picturePath);

    if (!hasError) {
      dispatch(uiAction.loadingHandler(true));
      LoginApi(inputs)
        .then((data) => {
          console.log(data);
          dispatch(
            uiAction.addMessage({
              status: 200,
              title: "success",
              message: "Login successfully!",
            })
          );
          dispatch(
            userAction.setLogin({
              user: data.user,
              token: data.token,
            })
          );
          addtolocalStorage("user-slice", { ...data });
          const cart = getfromLocalStorage("cart-slice");
          dispatch(cartAction.CartReplaceHandler({ ...cart }));
          navigate("/");
        })
        .catch((err) => {
          console.dir(err);

          dispatch(
            uiAction.addMessage({
              status: err.status || 400,
              title: "error",
              message: err.message,
            })
          );
        })
        .finally(() => {
          dispatch(uiAction.loadingHandler(false));
          setLoading(false);
        });
    }
    setErrors(newErrors);
  };

  const handleInput = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  return (
    <Layout>
      <section
        className={`w-[100%] ${classes["register-block"]} gap-4 flex justify-center items-center mx-auto`}
      >
        <h2 className="mb-2 text-[1.5rem] text-orange-500 font-bold">
          Login to Dive in Books Library to Buy
        </h2>
        <div
          className={` shadow-lg shadow-orange-300  w-[90%] md:w-[60%] ${classes.container}`}
        >
          <div className="row ">
            <div className={`col ${classes["register-sec"]}`}>
              <h2 className="text-center"> Login Now </h2>{" "}
              <form
                onSubmit={handleSubmit}
                className="register-form flex flex-col gap-3"
                action=""
              >
                <div className="flex flex-col md:flex-row gap-3">
                  <Input
                    label="Email:"
                    errors={errors.email}
                    className="w-full"
                    attributes={{
                      type: "text",
                      onChange: handleInput,
                      name: "email",
                      id: "email",
                      value: inputs.email,
                      placeholder: "Email ",
                    }}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                  <Input
                    label="Password:"
                    errors={errors.password}
                    className="w-full"
                    attributes={{
                      type: "password",
                      onChange: handleInput,
                      name: "password",
                      id: "password",
                      value: inputs.password,
                      placeholder: "Password ",
                    }}
                  />
                </div>

                <div className="form-group">
                  <Button
                    type="submit"
                    className="btn btn-login float-right"
                    disabled={loading}
                  >
                    Login
                  </Button>
                </div>
                <div className="form-group">
                  Don't have an account ? Please{" "}
                  <NavLink to="/register" className="text-blue-600 font-medium">
                    {" "}
                    Register{" "}
                  </NavLink>{" "}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
