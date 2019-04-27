import React, { useState, useEffect, Fragment } from 'react';
import Helmet from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';

import { postSignUp, getCurrentUser } from '../../api/index';

import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Errors from '../../components/errors/Errors';

import './Register.scss';

export default function Register() {

  const [ userEmailPassword, setUserEmailPassword ] = useState({ username: '', email: '', password: '' });

  const [ registerSuccess, setRegisterSuccess ] = useState(false);
  const [ errors , setErrors] = useState();

  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [ registering, setRegistering ] = useState(false);

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

  function onChangeUserEmailPassword(e : any) {
    setUserEmailPassword({
      ...userEmailPassword,
      [e.target.name]: e.target.value,
    });
  }

  async function onSubmitSignup(e: any) {
    e.preventDefault();
    setRegistering(true);
    const { username, password, email } = userEmailPassword;
    const result = await postSignUp(username, password, email);
    
    if (result.length !== 0) {
      setErrors(result);
    } else {
      setRegisterSuccess(true);
    }
    setRegistering(false);
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
          <Helmet title="Nýskráning" />
          <h1 className="registerTitle">Nýskráning</h1>
          {registerSuccess && (
            <p className="registerSuccess">Skráning tókst!</p>
          )}
          {!registerSuccess && (
            <Fragment>
              {registering && (
                <p>Nýskráir...</p>
              )}
              {!registering && (
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
              </Fragment>
            )}
          <Link className="registerLinkToLogin" to="/login">Innskráning</Link>
        </Fragment>
      )}
    </Fragment>
  );
}
