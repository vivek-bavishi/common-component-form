import React from 'react';
import { Input, Checkbox, Radio, Dropdown } from './input.js';
import './App.css';

class Form extends React.Component {
  constructor() {
    super()
    this.state = {
      firstname: '',
      middlename: '',
      lastname: '',
      email: '',
      mobile: '',
      gender: '',
      city: '',
      occupation: '',
      password: '',
      rpassword: '',
      Hobbies: [],
      error: {
      }
    }
  }
  inputhandler = (e) => {
    var strongregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    var mediumregex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
    this.setState({ [e.target.name]: e.target.value, error: { ...this.state.error, [e.target.name]: "" } })
    if (e.target.name === "password") {
      if (strongregex.test(e.target.value)) {
        this.setState({ passwordflag: "strong" })
      } else if (mediumregex.test(e.target.value)) { this.setState({ passwordflag: "medium" }) } else {
        this.setState({ passwordflag: "poor" })
      }
    }
  }
  setmobile = (e) => {
    if (Number(e.target.value)) {
      if (e.target.value.length <= 10) {
        this.setState({ mobile: e.target.value })
      }
    } else if (Number(e.target.value) === 0) {
      this.setState({ mobile: '' })
    }
  }
  sethobby = (e) => {
    let { Hobbies } = this.state;
    let { value, checked } = e.target;
    let index;
    if (checked)
      Hobbies.push(value);
    else {
      index = Hobbies.indexOf(value)
      Hobbies.splice(index, 1)
    }
    this.setState({ Hobbies, error: { ...this.state.error, Hobbies: "" } });

  }
  setoccupation = (e) => {
    let { value } = e.target;
    this.setState({ occupation: value, error: { ...this.state.error, [e.target.name]: "" } })
  }
  validateformate = (e) => {
    const { error } = this.state
    const { value, name } = e.target
    var nameregex = /^[A-Za-z]{2,20}$/
    var mnameregex = /^[A-Za-z]{0,20}$/
    var emailregex = /^[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,}$/
    if (name === "firstname") {
      if (value === '') {
        this.setState({ error: { ...error, firstname: "required firstname" } })
      } else {
        if (!nameregex.test(value)) {
          this.setState({ error: { ...error, firstname: "invalid firstname" } })
        }
      }
    }
    if (name === "middlename") {
      if (value !== '') {
        if (!mnameregex.test(value)) {
          this.setState({ error: { ...error, middlename: "invalid middlename" } })
        }
      }
    }
    if (name === "lastname") {
      if (value === '') {
        this.setState({ error: { ...error, lastname: "required lastname" } })
      } else {
        if (!nameregex.test(value)) {
          this.setState({ error: { ...error, lastname: "invalid lastname" } })
        }
      }
    }
    if (name === "email") {
      if (!emailregex.test(value)) {
        this.setState({ error: { ...error, email: "invalid email" } })
      }
    }
    if (name === "password") {
      this.setState({ passwordflag: '' })
    }
  }
  reqvalidation = () => {
    let { firstname, lastname, email, mobile, gender, Hobbies, city, occupation, password, rpassword, error } = this.state
    if (firstname === "") {
      error.firstname= "firstname required"
    }
    if (lastname === "") {
      error.lastname= "lastname required" 
    }
    if (email === "") {
      error.email="required" 
    }
    if (mobile === "") {
      error.mobile="required"
    }
    if (gender === "") {
      error.gender= "required"
    }
    if (Hobbies.length < 2) {
      error.Hobbies="two hobbies required"
    }
    if (city === "") {
      error.city= "required" 
    }
    if (occupation === "") {
      error.occupation="required" 
    }
    if (password === "") {
      error.password="required"
    }
    if (password !== rpassword || rpassword == '') {
      error.rpassword= "enter same password"
    }
    this.setState({error})
    // else {
    //   alert("sign up success")
    // }
  }
  render() {

    let { error } = this.state
    return (
      <div className="Form">
        <h1>form</h1>
        <Input label="firstname" type="text" required={error.firstname} name="firstname" placeholder="firstname"
          onChange={(e) => this.inputhandler(e)} onBlur={(e) => this.validateformate(e)} />
        <Input label="middlename" type="text" name="middlename" placeholder="middlename(optional)"
          onChange={(e) => this.inputhandler(e)} onBlur={(e) => this.validateformate(e)} />
        <Input label="lastname" type="text" name="lastname" required={error.lastname} placeholder="lastname"
          onChange={(e) => this.inputhandler(e)} onBlur={(e) => this.validateformate(e)} /><p>{error.firstname}  {error.lastname}  {error.middlename}</p><br/><br />
        <Input label="email" type="email" required={error.email} name="email" placeholder="abc@xyz.com"
          onChange={(e) => this.inputhandler(e)} onBlur={(e) => this.validateformate(e)} /><p>{error.email}</p><br /><br />
        <Input label="mobile"  type="text" name="mobile" required={error.mobile} value={this.state.mobile}
          onChange={(e) => this.setmobile(e)} /><p>{error.mobile}</p><br /><br />
        <Radio label="gender"  type="radio" required={error.gender} data={["male","female"]} name="gender" onChange={(e) => this.inputhandler(e)} />
        <p>{error.gender}</p><br /><br />
        <Checkbox label="hobbies" data={["dance","writing","photography","origami"]} name="Hobbies" required={error.Hobbies} value="dance" type="checkbox" onChange={(e) => this.sethobby(e)} /><p>{error.Hobbies}</p><br /><br />
        <Dropdown label="city" name="city" data={["surat","abad","baroda","rajkot"]} required={error.city} onChange={(e) => this.inputhandler(e)}/><p>{error.city}</p><br /><br />
        occupation: student<input name="occupation" type="checkbox" value="student" checked={this.state.occupation == "student" ? true : false} onChange={(e) => this.setoccupation(e)} />
        employe<input name="occupation" type="checkbox" value="employe" checked={this.state.occupation == "employe" ? true : false} onChange={(e) => this.setoccupation(e)} /><p>{error.occupation}</p><br /><br />
        <Input label="password" type="password" name="password" required={error.password} onChange={(e) => this.inputhandler(e)} onBlur={(e) => this.validateformate(e)} />{this.state.passwordflag}<p>{error.password}</p><br /><br />
        <Input label="re-enter password" type="password" name="rpassword" required={error.rpassword} onChange={(e) => this.inputhandler(e)} /><p>{error.rpassword}</p><br /><br />
        <button onClick={() => this.reqvalidation()}>sign-up</button>
      </div>
    );
  }
}

export default Form;