import React from "react";
import Input from "../components/textbox/textbox";
import LongInput from "../components/textarea/textarea";
import Multiselect from "../components/multiselect/multiselect"
import {
  requiredRule,
  minLengthRule,
  maxLengthRule,
} from "./inputValidationRules";
import { minSelectionsRule, maxSelectionsRule } from "./selectValidationRules";

function createFormFieldConfig(label, name, type,model, defaultValue = "") {
  return {
    renderInput: (handleChange, value, isValid, error, key) => {
      return (
        <Input
          key={key}
          name={name}
          type={type}
          label={label}
          isValid={isValid}
          value={value}
          model={model}
          handleChange={handleChange}
          errorMessage={error}
        />
      );
    },
    label,
    value: defaultValue,
    valid: false,
    errorMessage: "",
    touched: false,
    type,
    model
  };
}

function createFormSelectConfig(label, name, type, model, data, options = {}, defaultValue = []) {
  
  return {
    renderInput: (handleChange, checked, isValid, error, key) => {
      return (
        <Multiselect 
          key={key}
          name={name}
          type={type}
          label={label}
          isValid={isValid}
          checked={checked}
          model={model}
          errorMessage={error}
          data={data}
          options={options} 
          onSelectOptions={handleChange}  />
      );
    },
    label: label,
    checked: defaultValue,
    valid: true,
    errorMessage: "",
    touched: false,
    type,
    model
  };
}

function createFormTextareaConfig(label, name, type, model, defaultValue = "") {
  
  return {
    renderInput: (handleChange, value, isValid, error, key) => {
      return (
      <LongInput 
          handleChange={handleChange}  
          key={key}
          name={name}
          type={type}
          label={label}
          value={value}
          model={model}></LongInput>
      );
    },
    label,
    value: defaultValue,
    valid: true,
    errorMessage: "",
    touched: false,
    type,
    model
  };
}

// object representation of signup form
export const signupForm = {
  name: {
    ...createFormFieldConfig("Function Name", "name", "text", "metadata.name"),
    validationRules: [
      requiredRule("name"),
      minLengthRule("name", 3),
      maxLengthRule("name", 56)
    ]
  },
  description: {
    ...createFormTextareaConfig("Description", "description", "textarea", "spec.description"),
    validationRules: []
  },
  runtime: {
    ...createFormSelectConfig("Runtime", "runtime", "select", "spec.runtime", [
      {
        name: 'Go',
        value: 'golang',
      },
      {
        name: 'Java',
        value: 'java',
      },
      {
        name: 'Node JS',
        value: 'nodejs',
      },
      {
        name: 'Python',
        value: 'python',
      }],
      { 
        defaults: ['nodejs'] 
      }),
    validationRules: [
       minSelectionsRule("runtime",5),
      // maxSelectionsRule("runtime",1),
    ]
  },
  categories: {
    ...createFormSelectConfig("Categories", "categories", "select", "metadata.categories", [
      {
        name: 'Data Collection',
        value: 'collect',
      },
      {
        name: 'Data Processing',
        value: 'process',
      },
      {
        name: 'Analytics & Reports',
        value: 'report',
      },
      {
        name: 'Sorting & Filtering',
        value: 'sort',
      },
      {
        name: 'Izmir',
        value: 'izmir',
      }], {}),
    validationRules: [
       minSelectionsRule("categories",2),
    ]
  },
  service: {
    ...createFormFieldConfig("Service Name", "service", "text", "spec.serviceName"),
    validationRules: [
      requiredRule("service"),
      minLengthRule("service", 3),
      maxLengthRule("service", 56)
    ]
  },
  permissions: {
    ...createFormSelectConfig("Permissions", "permissions", "select", "spec.permissions", [
      {
        name: 'Read Files',
        value: 'read',
      },
      {
        name: 'Write Files',
        value: 'write',
      },
      {
        name: 'Execute Files',
        value: 'execute',
      }], {}),
    validationRules: [
       minSelectionsRule("permissions", 1),
    ]
  },
};
