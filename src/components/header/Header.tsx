import React, { useEffect, useState, Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { IUser } from '../../api/types';
import { getCurrentUser } from '../../api';

import './Header.scss';

export default function Header() {

  const [ currentUser, setCurrentUser ] = useState();
  const [ loggedIn, setLoggedIn ] = useState(checkToken());

  function checkToken() : boolean {
    const token = localStorage.getItem('myToken');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    const fetchProduct = async () => {
      const result : IUser = await getCurrentUser();
      if (result.hasOwnProperty('error')) {
        setLoggedIn(false);
      } else if (result.username) {
        setLoggedIn(true);
        setCurrentUser(result);
      }
    }
    fetchProduct();
  }, []);

  function handleLogout() {
    localStorage.removeItem('myToken');
    setLoggedIn(false);
    setCurrentUser(null);
  }
  
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__titleContent">
          <h1 className="header__title">
            <Link className="header__titleLink" to="/">Vefforritunarbúðin</Link>
          </h1>
        </div>
        <div className="header__options">
          <div className="header__optionsAbove">
            {loggedIn && (
              <Fragment>
                {currentUser && (
                  <NavLink className="header__link" exact to="/" onClick={handleLogout}>{currentUser.username} (útskrá)</NavLink>
                )}
                <NavLink className="header__link" activeClassName="header__link--selected" exact to="/orders">Pantanir</NavLink>
                <NavLink className="header__link" activeClassName="header__link--selected" exact to="/cart">Karfa</NavLink>
              </Fragment>
            )}
            {!loggedIn && (
              <Fragment>
                <NavLink className="header__link" activeClassName="header__link--selected" exact to="/register">Nýskrá</NavLink>
                <NavLink className="header__link" activeClassName="header__link--selected" exact to="/login">Innskrá</NavLink>
              </Fragment>
            )}
          </div>
          <div className="header__optionsLower">
            <NavLink className="header__link" activeClassName="header__link--selected" exact to="/">Nýjar vörur</NavLink>
            <NavLink className="header__link" activeClassName="header__link--selected" exact to="/categories/">Flokkar</NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}