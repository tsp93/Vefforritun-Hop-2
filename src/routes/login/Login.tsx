import React, { Component, useEffect, useState } from 'react';
import { postLogin } from '../../api/index';

import App from '../../App';
import './Login.scss';
import Home  from '../home/Home';
import { IUser, IError } from '../../api/types';

export default function Login(props : any){
  
const [user, setUser] = useState();
const [username, setUsername] = useState();
const [password, setPassword] = useState();
const [errors , setErrors] = useState();

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
    console.log(result);
    
    setErrors(result);
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


return (
  <fieldset>
    <form onSubmit={onSubmitLogin} >
    <div>
      <label htmlFor="username">Notendanafn:</label>
        <input autoComplete="off" id="username" type="text" name="username" onChange={changeUsernameInput}/>
        {showErrors('username',errors)}
      </div>
      <br/>
      <div>
        <label htmlFor="password">Lykilorð:</label>
          <input autoComplete="off" id="password" type="password" name="password" onChange={changePasswordInput}/>
          {showErrors('password',errors)}
          {showErrors('NoSuchUser',errors)}
      </div>
      <input type="submit" value="Submit"></input> 
  </form>
  
  </fieldset>

  
)
}



