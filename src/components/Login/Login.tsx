/* eslint-disable react-refresh/only-export-components */
import { getLoginStatus } from "../../util/getLoginstatus";
import { redirect } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { RegistrationHandler } from "../../entities/RegistrationManage";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../App/hooks";
import { login } from "../../App/store";

export function Component() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          localStorage.setItem("loggedInEmail", values.email);
          document.querySelector(".navbar")?.classList.toggle("active");
          dispatch(login(values.email));
          setSubmitting(false);
          navigate("/");
        }}
        validate={(values) => {
          const errors: { [key: string]: string } = {};
          if (
            !RegistrationHandler.getRegisteredUsers()?.find(
              (item) =>
                item.email === values.email &&
                item.password === values.password,
            )
          ) {
            errors.email = "Неправильный(ые) логин и/или пароль";
          }
          return errors;
        }}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="form-group m-1 p-1">
              <label htmlFor="exampleFormControlEmail">Email address</label>
              <Field
                type="email"
                name="email"
                id="exampleFormControlEmail"
                className="form-control"
                required
              />
            </div>
            <div className="form-group m-1 p1">
              <label htmlFor="exampleFormControlPassword">Password</label>
              <Field
                type="password"
                name="password"
                id="exampleFormControlPassword"
                className="form-control"
                required
              />
            </div>
            {errors.email && (
              <div className="alert alert-danger m-1" role="alert">
                {errors.email}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary m-3"
            >
              Sign on
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export async function loader() {
  try {
    if (getLoginStatus() !== null) {
      throw Error("Доступно после выхода");
    }
  } catch (error) {
    return redirect("/");
  }
  return 0;
}
