import React, { Component, useEffect, useState } from 'react';
import { postLogin } from '../../api/index';
import { Link, Redirect } from 'react-router-dom';

import App from '../../App';
import './Login.scss';
import Home  from '../home/Home';
import { IUser, IError } from '../../api/types';

import Button from '../../components/button/Button';

export default function Login(props : any){
  
const [user, setUser] = useState();
const [username, setUsername] = useState();
const [password, setPassword] = useState();
const [errors , setErrors] = useState();
const [success, setSuccess] = useState();

function changeUsernameInput(e: any){
  let target = e.target.value;
  setUsername(target);
}

function changePasswordInput(e: any){
  let target = e.target.value;
  setPassword(target);
}

async function onSubmitLogin(e:any){
  e.preventDefault();
    const result = await postLogin(username,password);
    
    
    setErrors(result);
    const test1 = result.hasOwnProperty('username');
    const test2 = result.hasOwnProperty('email');
    const test3 = result.hasOwnProperty('id');
    const test4 = result.hasOwnProperty('admin');

    
    if( test1 && test2 && test3 && test4){
      console.log('success');
      console.log(result);
      setSuccess(true);
      window.location.reload();
    }
}

function showErrors(f: String, errs: IError[]){
  
  if(errs !== undefined){
    for(let i =0; i < errs.length; i++){
      if(errs[i] !== undefined){
        if(errs[i].field === f){
          return (<p className="errorMsg">{errs[i].message}</p>)
        }
      }
    }
  }
}

function loginSuccess(log: Boolean){
  if(log){
    return (
      <Redirect to="/" />
    )
  }
}

return (
  <fieldset>
    <form onSubmit={onSubmitLogin} >
    <h1>Innskráning</h1>
    <div className="login__form">
      <div className="login__username">
       <label htmlFor="username">Notendanafn:</label>
         <input autoComplete="off" id="username" type="text" name="username" onChange={changeUsernameInput}/>
          {showErrors('username',errors)}
          </div>
      <div className="login__password">
       <label htmlFor="password">Lykilorð:</label>
         <input autoComplete="off" id="password" type="password" name="password" onChange={changePasswordInput}/>
          {showErrors('password',errors)}
          {showErrors('NoSuchUser',errors)}
          </div>
      </div>
       <Button children={'Skrá inn'}/>
    </form>
    <Link className="form__register" to="/register">Nýskráning</Link>
  {loginSuccess(success)}
  </fieldset>
  )
}



