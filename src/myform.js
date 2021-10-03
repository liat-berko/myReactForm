import React from "react";
import useForm from "./useForm";
import { signupForm } from "./utils/formConfig";

import "./styles.css";
import "./myform.css";

export default function MyForm() {
  const { renderFormInputs, isFormValid, formState } = useForm(signupForm);
  let state = formState();

  function printResult () {
    let result = {};
    Object.keys(state).forEach(item => {
      const naems = state[item].model.split('.');
      const innerResult = {...result[naems[0]], [naems[1]]: 
        (typeof state[item].value !== "object" ? state[item].value : Object.values(state[item].value))};
      result = {...result, [naems[0]]: innerResult };
      return result;
    });

    console.log(result);
  }

  return (
    <form className="signupForm">
      <h1>Form object</h1>
      {renderFormInputs()}
      <button type="button" 
       disabled={!isFormValid()} 
       onClick={printResult}>
        Submit
      </button>
    </form>
  );
}
