function createValidationRule(ruleName, errorMessage, validateFunc) {
    return {
      name: ruleName,
      message: errorMessage,
      validate: validateFunc
    };
  }
export function minSelectionsRule(inputName, minSelections) {
    return createValidationRule(
      "minSelections",
      `${inputName} should contain atleast ${minSelections} selections`,
      (inputValue, formObj) => inputValue >= minSelections
    );
  }
  
  export function maxSelectionsRule(inputName, maxSelections) {
    return createValidationRule(
      "maxSelections",
      `${inputName} should contain atleast ${maxSelections} selections`,
      (inputValue, formObj) => inputValue < maxSelections
    );
  }