import React, { useState, Fragment } from 'react';
import { postSignUp } from '../../api/index';
import { Link, Redirect } from 'react-router-dom';

import { IError } from '../../api/types';

import Button from '../../components/button/Button';
import Input from '../../components/input/Input';

import './Register.scss';
import Errors from '../../components/errors/Errors';

export default function Register() {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [validsignup, setValidsignup ] = useState();
  const [errors , setErrors] = useState();
  

  function changeUsernameInput(e: any){
    setUsername(e.target.value);
  }

  function changeEmailInput(e: any){
    setEmail(e.target.value);
  }
  
  function changePasswordInput(e: any){
    setPassword(e.target.value);
  }

  async function onSubmitSignup(e: any){
    e.preventDefault();
    const result = await postSignUp(username, password, email);
    
    console.log(result);
    setErrors(result);
  }

  return (
    <Fragment>
      <h1 className="registerTitle">Nýskráning</h1>
      <form onSubmit={onSubmitSignup} className="registerForm" >
        {errors != null && (
          <Errors
            errors={errors}
          />
        )}
        <div className="registerInputs">
          <Input
            label={'Notendanafn:'}
            name={'username'}
            onChange={changeUsernameInput}
            value={username}
          />
          <Input
            label={'Lykilorð:'}
            name={'password'}
            onChange={changePasswordInput}
            value={password}
          />
          <Input
            label={'Netfang:'}
            name={'email'}
            onChange={changeEmailInput}
            value={email}
          />
        </div>
        <Button
          className={'registerButton'}
          children={'Nýskrá'}
        />
    </form>
    <div>
    <Link className="registerLinkToLogin" to="/login">Innskráning</Link>
    </div>
  </Fragment>
  );
}
