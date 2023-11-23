import Layout from "../../components/Layout/Root";
import { useState } from "react";
import { RegisterApi } from "./../../services/fetch-apis";
// import { isAuthenticated } from "../services/Auth";
// import { storeUserData } from "../services/Storage";
import "./Register.css";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { useDispatch } from "react-redux";
import { uiAction } from "../../store/ui-slice/ui-slice";

// firstName
// lastName
// email
// password
//   age
//   picturePath
//   location
//   occupation

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    picturePath: "",
    location: "",
    occupation: "",
  });

  const initialStateErrors = {
    email: { required: false },
    password: { required: false },
    firstName: { required: false },
    lastName: { required: false },
    age: { required: false },
    picturePath: { required: false },
    location: { required: false },
    occupation: { required: false },
    custom_error: null,
  };
  const [errors, setErrors] = useState(initialStateErrors);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    let newErrors = { ...initialStateErrors };
    let hasError = false;
    if (inputs.firstName === "") {
      newErrors.firstName.required = true;
      hasError = true;
    }
    if (inputs.lastName === "") {
      newErrors.lastName.required = true;
      hasError = true;
    }
    if (inputs.age === "") {
      newErrors.age.required = true;
      hasError = true;
    }
    if (inputs.picturePath === "") {
      newErrors.picturePath.required = true;
      hasError = true;
    }
    if (inputs.location === "") {
      newErrors.location.required = true;
      hasError = true;
    }
    if (inputs.occupation === "") {
      newErrors.occupation.required = true;
      hasError = true;
    }
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
      const formData = new FormData();
      for (let value in inputs) {
        formData.append(value, inputs[value]);
      }
      console.log(inputs.picturePath.name);
      formData.append("picturePath", inputs.picturePath.name);
      dispatch(uiAction.loadingHandler(true));
      RegisterApi(formData)
        .then(() => {
          // console.log(data);
          dispatch(
            uiAction.addMessage({
              status: 200,
              title: "success",
              message: "successfully Registered",
            })
          );
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);

          dispatch(
            uiAction.addMessage({
              status: err.status || 400,
              title: "error",
              message: err?.response?.data
                ? err.response.data.error
                : err.message,
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

  // if (isAuthenticated()) {
  //   //redirect user to dashboard
  //   return <Navigate to="/dashboard" />;
  // }

  return (
    <Layout className="w-full">
      <section className="w-[100%] register-block gap-4 flex justify-center items-center mx-auto">
        <h2 className="mb-2 text-[1.5rem] text-orange-500 font-bold">
          Register to Dive in Books Library to Buy
        </h2>
        <div className=" shadow-lg shadow-orange-300  w-[90%] md:w-[60%] container">
          <div className="row ">
            <div className="col register-sec">
              <h2 className="text-center"> Register Now </h2>{" "}
              <form
                onSubmit={handleSubmit}
                className="register-form flex flex-col gap-3"
                action=""
              >
                <div className="flex flex-col md:flex-row gap-3">
                  <Input
                    label="First Name:"
                    errors={errors.firstName}
                    attributes={{
                      type: "text",
                      value: inputs.firstName,
                      onChange: handleInput,
                      name: "firstName",
                      id: "firstName",
                      placeholder: "first Name",
                    }}
                  />
                  <Input
                    label="Last Name:"
                    errors={errors.lastName}
                    attributes={{
                      type: "text",
                      onChange: handleInput,
                      name: "lastName",
                      id: "lastName",
                      value: inputs.lastName,
                      placeholder: "Last Name",
                    }}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                  <Input
                    label="Age:"
                    errors={errors.age}
                    attributes={{
                      type: "text",
                      onChange: handleInput,
                      name: "age",
                      id: "age",
                      value: inputs.age,
                      placeholder: "Age",
                    }}
                  />
                  <Input
                    label="Location:"
                    errors={errors.location}
                    attributes={{
                      type: "text",
                      onChange: handleInput,
                      name: "location",
                      id: "location",
                      value: inputs.location,
                      placeholder: "Location ",
                    }}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                  <Input
                    label="Occupation:"
                    errors={errors.occupation}
                    className="w-full"
                    attributes={{
                      type: "text",
                      onChange: handleInput,
                      name: "occupation",
                      id: "occupation",
                      value: inputs.occupation,
                      className: "w-full",
                      placeholder: "occupation ",
                    }}
                  />
                </div>
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
                      className: "w-full",
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
                      type: "text",
                      onChange: handleInput,
                      name: "password",
                      id: "password",
                      className: "w-full",
                      value: inputs.password,
                      placeholder: "Password ",
                    }}
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                  <Input
                    label="Picture Path"
                    errors={errors.picturePath}
                    className="w-full"
                    attributes={{
                      type: "file",
                      onChange: (e) => {
                        e.preventDefault();
                        console.log(e.target.files[0]);
                        setInputs({
                          ...inputs,
                          picturePath: e.target.files[0],
                        });
                      },
                      name: "picturePath",
                      id: "picturePath",
                      className: "w-full",
                      placeholder: "Profile Picture Path",
                    }}
                  />
                </div>
                <div className="form-group">
                  <Button
                    type="submit"
                    className="btn btn-login float-right"
                    disabled={loading}
                  >
                    Register
                  </Button>
                </div>
                <div className="form-group">
                  Already have account ? Please{" "}
                  <NavLink to="/login" className="text-blue-600 font-medium">
                    {" "}
                    Login{" "}
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
