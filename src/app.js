import React from "react";
import { withFormik, Field, ErrorMessage, Form } from "formik";


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function MyForm(props) {
  const {
    handleSubmit, // lo provee el formik que es mi higher order component
    isSubmitting, // inidica si actualmente se está haciendo el submit del form.
    handleChange,
    handleBlur,
    values,
    errors,
    isValid,
    touched
  } = props;

  return (
    <Form>
      {/*   
      <input
       name="email"
       type="email"
       onChange={handleChange}
       onBlur={handleBlur}
       value={values.email} 
    //    values.el_name del control

      /> */}
      <div className="row">
        Email:
        {/* //field reemplaza los inputs */}
        <Field name="email" type="email" className="input" />
        {/* podría personalizar este componente con:
         {bundle => <div> {bundle.field.touched} </div>}
         bundle.field.error o . touched
         */}
        <ErrorMessage name="email">
          {message => <div className="error"> {message}</div>}
        </ErrorMessage>
      </div>

      <div className="row">
        Password:
        <Field name="password" type="password" className="input" />
        <ErrorMessage name="password">
          {message => <div className="error"> {message}</div>}
        </ErrorMessage>
      </div>

      <div className="row">
        <button
          type="submit"
          className={`submit ${isSubmitting || !isValid ? "disabled" : ""}`}
          disabled={isSubmitting || !isValid}
        >
          Submit
        </button>
      </div>
    </Form>
  );
}

export default withFormik({
  // si no linkeo props to value, se produce el error de uncontrolled component. min31
  mapPropsToValues(props) {
    return {
      email: props.defaultEmail,
      password: ""
    };
  },

async  validate(values) {
    const errors = {};

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    await sleep(3000);

    if (Object.keys(errors).length) { // valida si const errors tiene algun error y hace un throw para que falle la promesa (validate)
      throw errors;
    }

    return errors;
  },

  handleSubmit(values, formikBag) {
    console.log(values);
    formikBag.setSubmitting(false); //hay que deshabilitarla al final del Submit
  }
})(MyForm);
// validacion sincrónica:
//
// validate(values) {
//   const errors = {};

//   if (!values.password) {
//     errors.password = "Password is required";
//   } else if (values.password.length < 8) {
//     errors.password = "Password must be at least 8 characters";
//   }
//   return errors;
// },
