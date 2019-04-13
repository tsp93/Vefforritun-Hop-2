import React, { Component, useEffect, useState } from 'react';
import { postLogin } from '../../api/index';

import App from '../../App';
import './Login.scss';
import Home  from '../home/Home';
import { IUser } from '../../api/types';

export default function Login(props : any){
  
const [user, setUser] = useState();
const [username, setUsername] = useState();
const [password, setPassword] = useState();
const [validLogin, setValidLogin ] = useState();

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
  if(username === undefined || password === undefined){
    setValidLogin(false);
  }
  else{
    const result = await postLogin(username,password);
  console.log(result);
  setUser(result);
  if(result){
    console.log('logged in');
    setValidLogin(true);
  }
  else{
   console.log('notendanafn eða lykilorð vitlaust');
   setValidLogin(false);
  }
  }
  
  
}

function invalidLogin(log : Boolean){
  if(log === false){
    return (
      <p>Notendanafn eða lykilorð er vitlaust </p>
    )
  }
}

return (
  <fieldset>
    <form onSubmit={onSubmitLogin} >
    <div>
      <label htmlFor="username">Notendanafn:</label>
        <input autoComplete="off" id="username" type="text" name="username" onChange={changeUsernameInput}/>
      </div>
      <br/>
      <div>
        <label htmlFor="password">Lykilorð:</label>
          <input autoComplete="off" id="password" type="password" name="password" onChange={changePasswordInput}/>
      </div>
      <input type="submit" value="Submit"></input> 
  </form>
  <div>
    { invalidLogin(validLogin) }
  </div>
  </fieldset>

  
)
}



