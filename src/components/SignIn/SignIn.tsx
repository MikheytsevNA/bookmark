import { Field, Form, Formik } from "formik";
import { RegistrationHandler } from "../../entities/RegistrationManage";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../App/hooks";
import { login } from "../../App/store";

export function SignIn() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          new RegistrationHandler({ ...values, favorites: [], history: [] });
          await localStorage.setItem("loggedInEmail", values.email);
          dispatch(login(values.email));
          setSubmitting(false);
          navigate("/");
        }}
        validate={(values) => {
          const errors: { [key: string]: string } = {};
          if (
            RegistrationHandler.getRegisteredUsers()?.find(
              (item) => item.email === values.email,
            )
          ) {
            errors.email = "Такой пользователь уже есть!";
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

              {errors.email && (
                <div className="alert alert-danger m-1" role="alert">
                  {errors.email}
                </div>
              )}
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
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary m-3"
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
