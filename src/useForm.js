import { useState, useCallback } from "react";

function useForm(formObj) {
  const [form, setForm] = useState(formObj);

  function renderFormInputs() {
    return Object.values(form).map((inputObj) => {
      const { value, label, errorMessage, valid, renderInput, type, model, checked } = inputObj;
      if (type === "select") {
          return renderInput(onSelectChange, checked, valid, errorMessage, label);
      } else {
        return renderInput(onInputChange, value, valid, errorMessage, label);

      }
    });
  }

  const isInputFieldValid = useCallback(
    (inputField) => {
      let isValid = true;
      inputField.errorMessage = "";
      for (const rule of inputField.validationRules) {       
        if (!rule.validate(inputField.value, form)) {
          inputField.errorMessage += inputField.errorMessage?.length > 0 ? `/${rule.message}` : rule.message;
          isValid = false;
        }
      }
      return isValid;
    },[form]
  );

  const onInputChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      const inputObj = Object.assign(form[name]);
      inputObj.value = value;
      const isValidInput = isInputFieldValid(inputObj);
      // if input is valid and it was previously set to invalid
      // set its valid status to true
      if (isValidInput && !inputObj.valid) {
        inputObj.valid = true;
      } else if (!isValidInput && inputObj.valid) {
        // if input is not valid and it was previously valid
        // set its valid status to false
        inputObj.valid = false;
      }
      inputObj.touched = true; // mark input field as touched
      setForm({ ...form, [name]: inputObj });
    },
    [form, isInputFieldValid]
  );

  const onSelectChange = useCallback(
    (target) => {
      const { state, props } = target;

      // copy input object whose value was changed
      const inputObj = Object.assign(form[props.name])
      
      // update value of selections
      inputObj.value = state.checked.length;

      const isValidInput = isInputFieldValid(inputObj);
      inputObj.checked = state.checked;
      if (isValidInput && !inputObj.valid) {
        inputObj.valid = true;
        inputObj.value = {...state.checked}
      } else if (!isValidInput && inputObj.valid) {
        inputObj.valid = false;
      }
      inputObj.touched = true;
      setForm({ ...form, [props.name]: inputObj });
    },
    [form, isInputFieldValid]
  );

  const isFormValid = useCallback(() => {
    let isValid = true;
    const arr = Object.values(form);

    for (let i = 0; i < arr.length; i++) {
      if (!arr[i].valid) {
        isValid = false;
        break;
      }
    }

    return isValid;
  }, [form]);

  const formState =   useCallback(() => {
     
    return form;
    
  }, [form]);

  return { renderFormInputs, isFormValid, formState };
}

export default useForm;
