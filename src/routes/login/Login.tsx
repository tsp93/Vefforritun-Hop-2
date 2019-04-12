import React, { Component, useEffect, useState } from 'react';
import { postLogin } from '../../api/index';

import './Login.scss';
import { IUser } from '../../api/types';

function User(u:string,p: string): IUser{

  const [ user, setUser ] = useState();
  useEffect(() => {
    const fetchProduct = async () => {
      const result = await postLogin(u,p);
      setUser(result);
    }
    fetchProduct();
  }, []);

  function showUser(usr : IUser){
    console.log(usr.username);
    console.log(usr.email);
      
  }

  return user;
}


export default class Login extends Component{

  
    state = {
      username: '',
      password: ''
    };
  
  handleInputChange = (e: any) => {

    const { name, value } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }
  }

  handleSubmit = (e:any) => {
    e.preventDefault();
    
    const { username, password } = this.state;
    
    //const user = postLogin(username, password);
    //console.log(user);
    try{
      const test = User(username,password);
      console.log(test);

    }
    catch(e){
      console.log('catch í handleSubmit');
      console.log(e);
    }
  }

  render(){
    return (
      <fieldset>
        <form onSubmit={this.handleSubmit} >
        <div>
          <label htmlFor="username">Notendanafn:</label>
            <input autoComplete="off" id="username" type="text" name="username" onChange={this.handleInputChange}/>
          </div>
          <br/>
          <div>
            <label htmlFor="password">Lykilorð:</label>
              <input autoComplete="off" id="password" type="password" name="password" onChange={this.handleInputChange}/>
          </div>
          <input type="submit" value="Submit"></input>
         
          
      </form>
      </fieldset>
      
    );
  }


}



