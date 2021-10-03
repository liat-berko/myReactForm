import React from "react";
import { AlertCircle } from 'react-feather';
import "./tooltip.css";

function Tooltip(props) {
  
  function Errors() {
    const errors = [];
    const msgs = props.errorMessage.split("/");
    let key = 1;
    if (msgs && msgs.length > 0) {        
      msgs.forEach(element => errors.push(<li key={key++}>{element}</li>));
    } else {
      errors.push(<div><span key={key++}>{props.errorMessage}</span></div>)
    }
    return errors
  }

  return (
    <div className="tooptip-container">
        {props.errorMessage && !props.isValid && (
          <div className="tooltip">
            <AlertCircle></AlertCircle>
            <div className="tooltiptext" >
              <ol>{Errors()}</ol>              
            </div>
          </div>
      )}
      </div>  
  );
}

export default Tooltip;
