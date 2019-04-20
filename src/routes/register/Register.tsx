import React, { useState, Fragment } from 'react';
import { postSignUp } from '../../api/index';
import { Link } from 'react-router-dom';

import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Errors from '../../components/errors/Errors';

import './Register.scss';

export default function Register() {

  const [ username, setUsername ] = useState();
  const [ password, setPassword ] = useState();
  const [ email, setEmail ] = useState();
  const [ registerSuccess, setRegisterSuccess ] = useState(false);
  const [ errors , setErrors] = useState();
  

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
    
    if (result.length !== 0) {
      setErrors(result);
    } else {
      setRegisterSuccess(true);
    }
  }

  return (
    <Fragment>
      <h1 className="registerTitle">Nýskráning</h1>
      {registerSuccess && (
        <p className="registerSuccess">Skráning tókst!</p>
      )}
      {!registerSuccess && (
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
              type={'password'}
            />
            <Input
              label={'Netfang:'}
              name={'email'}
              onChange={changeEmailInput}
              value={email}
              type={'email'}
            />
          </div>
          <Button
            className={'registerButton'}
            children={'Nýskrá'}
          />
        </form>
      )}
      <Link className="registerLinkToLogin" to="/login">Innskráning</Link>
    </Fragment>
  );
}
