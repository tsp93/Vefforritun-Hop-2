import React, { useState, useEffect, Fragment } from 'react';
import Helmet from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';

import { postLogin, getCurrentUser } from '../../api/index';
import { IError } from '../../api/types';

import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

import './Login.scss';

export default function Login() {


  const [ userPassword, setUserPassword ] = useState({ username: '', password: '' });

  const [ errors , setErrors ] = useState();
  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userResult = await getCurrentUser();
      if (!userResult.hasOwnProperty('error')) {
        setLoggedIn(true);
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  function onChangeUserPassword(e : any) {
    setUserPassword({
      ...userPassword,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmitLogin(e:any){
    e.preventDefault();
    const { username, password } = userPassword;
    const result = await postLogin(username, password);
    
    if (result.length !== 0) {
      setErrors(result);
    } else {
      setLoggedIn(true);
      window.location.reload();
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
      {(!loggedIn && loading) && (
        <p>Loading...</p>
      )}
      {(loggedIn && !loading) && (
        <Redirect to='/' />
      )}
      {(!loggedIn && !loading) && (
        <Fragment>
          <Helmet title="Innskráning" />
          <h1 className="loginTitle">Innskráning</h1>
          <form onSubmit={onSubmitLogin} className="loginForm">
            <div className="loginInputs">
              <Input
                label={'Notendanafn:'}
                name={'username'}
                onChange={onChangeUserPassword}
                value={userPassword.username}
              />
              {showError('username', errors)}
              <Input
                label={'Lykilorð:'}
                name={'password'}
                onChange={onChangeUserPassword}
                value={userPassword.password}
                type={'password'}
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
      )}
    </Fragment>
  );
}
