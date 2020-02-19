import React from 'react';
import PropTypes from 'prop-types';

export function Input(props) {


  return (
    <>
      {props.label}
      {props.required && <span style={{ color: "red" }}>*</span>}
      <input type={props.type}
        value={props.value}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}></input>
        <br></br>
    </>
  )

}



export const Checkbox = ({ type = 'checkbox',data,name,single, label,required,onChange }) => (
  <>
  {label}
  {required && <span style={{ color: "red" }}>*</span>}
  :&nbsp; 
  {
    data.map((item, key) => (
      <label key={key}>
        {item}
        <input type={type} name={name} value={item}  onChange={onChange} />
      </label>
    ))
  }
  <br></br>
  </> 
);

Checkbox.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

export const Radio = ({ type,data,name,label,required,onChange }) => (
  <>
  {label}
  {required && <span style={{ color: "red" }}>*</span>}
  :&nbsp; 
  {
    data.map((item, key) => {
      return <label key={key}>
        {item}
        <input type={type} name={name} value={item}  onChange={onChange} />
      </label>
    })
  }
  <br></br>
  </> 
);

Radio.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

export const Dropdown = ({ data,name, label,required,onChange }) => (
  <>
   {label}
   {required && <span style={{ color: "red" }}>*</span>}
  :&nbsp; 
  <select name={name} onChange={onChange}>
  <option value="" selected disabled hidden>--Select---</option>
  {
    data.map((item, key) => (
      // <label key={key}>
        // {item}
        <option value={item}>{item}</option>
     
    ))
  }
  </select>
  <br></br>
  </> 
);

Radio.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}


Input.defaultProps = {
  type: "text",
  name: "name",
  placeholder: "please enter value",
  isRequired: false,
  className: ''
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string
}


