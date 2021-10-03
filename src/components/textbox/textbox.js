import React from "react";
import Tooltip from '../tooltip/tooltip';

import "./textbox.css";

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
      <div>
        <label>{label}</label>
        <Tooltip errorMessage={errorMessage} isValid={isValid}></Tooltip>
        {/* {errorMessage && !isValid && (
          <div class="tooltip">
            <AlertCircle></AlertCircle>
          <span class="tooltiptext">{errorMessage}</span>
        </div>
      )} */}
      </div>  
      <input type={type} name={name} value={value} onChange={handleChange} />
    </div>
  );
}

export default React.memo(InputField);
