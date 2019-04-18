import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Header.scss';
import { getCurrentUser } from '../../api';
import { IUser } from '../../api/types';

export default function Home() {

  const [curr, setCurr] = useState();
  const [loggedin, setloggedin] = useState(checkToken());

  function checkToken() :boolean{
    const token = localStorage.getItem('myToken');
    console.log(token);
    if(token){
      return true;
    }
    else{
      return false;
    }
  }


  useEffect(() => {
    const fetchProduct = async () => {
      const result : IUser = await getCurrentUser();
      if(result.hasOwnProperty('error')){
        setloggedin(false);
      }
      else if(result.username){
        setloggedin(true);
        setCurr(result);
      }
    }
    fetchProduct();
  }, []);

  function showcurr(u : IUser){
    if(u !== undefined){
      return ( <p>logged in as: {u.username}</p>)
    }
  }
  
  function showNavigation(){
    function handleLogout(e:any){
      localStorage.removeItem('myToken');
      setloggedin(false);
    }

    if(!loggedin){
      return (
        <div>
          <NavLink activeClassName="header__link--selected" exact to="/register">Nýskráning</NavLink>
          <br/>
          <NavLink activeClassName="header__link--selected" exact to="/login">Innskráning</NavLink>
          <br/>
          <NavLink activeClassName="header__link--selected" exact to="/">Vörur</NavLink>
          <br/>
          <NavLink activeClassName="header__link--selected" exact to="/categories/">Flokkar</NavLink>
          <br/>
        </div>
      )
    }
    else if(loggedin){
      return (
        <div>
          <NavLink activeClassName="header__link--selected" exact to="/cart">Karfa</NavLink>
          <br/>
          <NavLink activeClassName="header__link--selected" exact to="/">Vörur</NavLink>
          <br/>
          <NavLink activeClassName="header__link--selected" exact to="/orders">Pantanir</NavLink>
          <br/>
          <NavLink activeClassName="header__link--selected" exact to="/categories/">Flokkar</NavLink>
          <button onClick={handleLogout}>logout</button>
        </div>
      )
      
    }
  }
  
  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__title">
          <Link className="header__titleLink" to="/">Vefforritunarbúðin</Link>
        </h1>
        {showNavigation()}
        <br/>
        <div>{showcurr(curr)}</div>
      </div>
    </header>
  );
}

//<NavLink activeClassName="header__link--selected" exact to="/cart">Karfa</NavLink>
//<NavLink activeClassName="header__link--selected" exact to="/">Vörur</NavLink>
//<NavLink activeClassName="header__link--selected" exact to="/register">Nýskráning</NavLink>
//<NavLink activeClassName="header__link--selected" exact to="/login">Innskráning</NavLink>
//<NavLink activeClassName="header__link--selected" exact to="/categories/">flokkar</NavLink>
//<NavLink activeClassName="header__link--selected" exact to="/orders">Þínar pantanir</NavLink>