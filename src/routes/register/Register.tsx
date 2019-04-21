import React, { useState, Fragment } from 'react';
import { postSignUp } from '../../api/index';
import { Link } from 'react-router-dom';

import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Errors from '../../components/errors/Errors';

import './Register.scss';

export default function Register() {

  const [ userEmailPassword, setUserEmailPassword ] = useState({ username: '', email: '', password: '' });

  const [ registerSuccess, setRegisterSuccess ] = useState(false);
  const [ errors , setErrors] = useState();

  function onChangeUserEmailPassword(e : any) {
    setUserEmailPassword({
      ...userEmailPassword,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmitSignup(e: any){
    e.preventDefault();
    const { username, password, email } = userEmailPassword;
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
              onChange={onChangeUserEmailPassword}
              value={userEmailPassword.username}
            />
            <Input
              label={'Lykilorð:'}
              name={'password'}
              onChange={onChangeUserEmailPassword}
              value={userEmailPassword.password}
              type={'password'}
            />
            <Input
              label={'Netfang:'}
              name={'email'}
              onChange={onChangeUserEmailPassword}
              value={userEmailPassword.email}
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
