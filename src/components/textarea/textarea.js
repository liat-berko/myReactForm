import React from "react";
import { Camera } from 'react-feather';
import "./textarea.css";

function InputField(props) {
  const {
    label,
    type,
    name,
    handleChange,
    errorMessage,
    isValid,
    value
  } = props;

  return (
    <div className="inputContainer">
      <div className="rowContainer">
        <label>{label}</label>
        {errorMessage && !isValid && (
        <Camera tooltip="sss" />
      )}
      </div>      
      <textarea  type={type} name={name} defaultValue={value} onChange={handleChange} />      
    </div>
  );
}

export default React.memo(InputField);
