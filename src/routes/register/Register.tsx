import React, { useState } from 'react';
import { postSignUp } from '../../api/index';
import { Link, Redirect } from 'react-router-dom';

import './Register.scss';
import { IError } from '../../api/types';

import Button from '../../components/button/Button';

export default function Register(props: any) {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [validsignup, setValidsignup ] = useState();
  const [errors , setErrors] = useState();
  

  function changeUsernameInput(e: any){
    let target = e.target.value;
    setUsername(target);
  }

  function changeEmailInput(e: any){
    let target = e.target.value;
    setEmail(target);
  }
  
  function changePasswordInput(e: any){
    let target = e.target.value;
    setPassword(target);
  }

async function onSumbitSignup(e: any){
  e.preventDefault();
  console.log(username);
  console.log(email);
  console.log(password);

  const result = await postSignUp(username,password,email);
  
  console.log(result);

  setErrors(result);

}

function showErrors(f: String, errs: IError[]){
  if(errs !== undefined){
    for(let i =0; i < errs.length; i++){
    if(errs[i].field === f){
      return (<p className="errorMsg">{errs[i].message}</p>)
    }
  }
  }
}


function invalidSignup(sin: Boolean){
if(sin === false){
  return (
    <p>Notendanafn eða lykilorð er vitlaust </p>
  )
}
}

  return (
    <fieldset>
    <form onSubmit={onSumbitSignup} >
    <h1>Nýskráning</h1>
      <div>
      <label htmlFor="username">Notendanafn:</label>
        <input autoComplete="off" id="username" type="text" name="username" onChange={changeUsernameInput}/>
        {showErrors('username',errors)}
      </div>
      
      <br/>
      <div>
        <label htmlFor="email">Netfang:</label>
        <input autoComplete="off" id="email" type="text" name="email" onChange={changeEmailInput}/>
        {showErrors('email',errors)}
      </div>
      
      <br/>
      <div>
        <label htmlFor="password">Lykilorð:</label>
          <input autoComplete="off" id="password" type="password" name="password" onChange={changePasswordInput}/>
          {showErrors('password',errors)}
      </div>
      <Button children={'Nýskrá'}/>
  </form>
  <div>
  <Link className="form__login" to="/login">Innskráning</Link>
    { invalidSignup(validsignup) }
  </div>
  </fieldset>
  )
}
