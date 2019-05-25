import React from "react";
import { render } from "react-dom";
import { withFormik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

const App = ({ values, errors, touched, isSubmitting }) => (
  <Form>
    <div>
    {touched.email && errors.email && <p>{errors.email}</p>}
        <Field type="email" name="email" placeholder="Email" />
    </div>
    
    <div>
    {touched.password && errors.password && <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="Password" />
    </div>
    
    <label>
        <Field type="checkbox" name="newsletter" checked={values.newsletter} />
      Join our newsletter
    </label>
    <Field component="select" name="plan">
        <option value="free">Free</option>
        <option value="premium">Premiun</option>
    </Field>
    <button disabled={isSubmitting}>Submit!</button>
  </Form>
);
export default withFormik({
  mapPropsToValues({ email, password, newsletter, plan }) {
    return {
      email: email || "",
      password: password || "",
      newsletter: newsletter || false,
      plan: plan || 'free'
    };
  },
  validationSchema: Yup.object().shape({
    email:Yup.string().email("Email not valid").required("Email is required!!"),
    password: Yup.string().min(6, "Password is to short").required("Pass is required")
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
      setTimeout(()=>{
        if(values.email === 'andrew@test.io'){
            setErrors({ email: 'That email is already taken'})
            } else {
                resetForm()
            }
        setSubmitting(false)
      }, 2000)
    // console.log(values);
  }
})(App);
