import React, { Component, useState, Fragment } from 'react';
import { postLogin } from '../../api/index';
import { Link, Redirect } from 'react-router-dom';

import './Login.scss';
import { IError } from '../../api/types';

import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

export default function Login() {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errors , setErrors] = useState();
  console.log(errors);

  function changeUsernameInput(e: any){
    setUsername(e.target.value);
  }

  function changePasswordInput(e: any){
    setPassword(e.target.value);
  }

  async function onSubmitLogin(e:any){
    e.preventDefault();
    const result = await postLogin(username, password);
    
    if (result[0] != undefined) {
      setErrors(result);
    }
  }

  function showError(f: String, errs: IError[]) {
    if(errs !== undefined) {
      for(let i = 0; i < errs.length; i += 1) {
        if(errs[i].field === f) {
          return (<p className="errorMsg">{errs[i].message}</p>);
        }
      }
    }
  }

  return (
    <Fragment>
      <h1 className="loginTitle">Innskráning</h1>
      <form onSubmit={onSubmitLogin} className="loginForm" >
        <div className="loginInputs">
          <Input
            label={'Notendanafn:'}
            name={'username'}
            onChange={changeUsernameInput}
            value={username}
          />
          {showError('username', errors)}
          <Input
            label={'Lykilorð:'}
            name={'password'}
            onChange={changePasswordInput}
            value={password}
          />
          {showError('password', errors)}
        </div>
        {showError('NoSuchUser', errors)}
        <Button
          className={'loginButton'}
          children={'Skrá inn'}
        />
      </form>
      <Link className="loginLinkToRegister" to="/register">Nýskráning</Link>
    </Fragment>
  );
}
