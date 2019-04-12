import React, { Component } from 'react';

import './Login.scss';

const handleSubmit = (loginUser:any) => async (e:any) => {
  console.log("hello click");
}

export default function Login() {
  return (
    <fieldset>
      <form onSubmit={handleSubmit} >
      <div>
        <label htmlFor="username">Notendanafn:</label>
          <input autoComplete="off" id="username" type="text" name="username" />
        </div>
        <br/>
        <div>
          <label htmlFor="password">Lykilorð:</label>
            <input autoComplete="off" id="password" type="password" name="password" />
          </div>
        
    </form>
    </fieldset>
    
  );
}



