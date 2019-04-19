import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Header.scss';
import { getCurrentUser } from '../../api';
import { IUser } from '../../api/types';

export default function Header() {

  const [curr, setCurr] = useState();
  const [loggedin, setloggedin] = useState(checkToken());

  function checkToken() :boolean{
    const token = localStorage.getItem('myToken');
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
        <div className="header__options">
          <div className="header__optionAbove">
            <NavLink className="header__link" activeClassName="header__link--selected" exact to="/register">Nýskrá</NavLink>
            <br/>
            <NavLink className="header__link" activeClassName="header__link--selected" exact to="/login">Innskrá</NavLink>
            <br/>
          </div>
          <div className="header__optionLower">
            <NavLink className="header__link" activeClassName="header__link--selected" exact to="/">Nýjar vörur</NavLink>
            <br/>
            <NavLink className="header__link" activeClassName="header__link--selected" exact to="/categories/">Flokkar</NavLink>
            <br/>
          </div>
        </div>
      )
    }
    else if(loggedin){
      return (
        <div className="header__options">
          <div className="header__optionAbove">
            <button onClick={handleLogout}>logout</button>

            <NavLink className="header__link" activeClassName="header__link--selected" exact to="/orders">Pantanir</NavLink>

            <NavLink className="header__link" activeClassName="header__link--selected" exact to="/cart">Karfa</NavLink>
          </div>
          <div className="header__optionLower">
            <NavLink className="header__link" activeClassName="header__link--selected" exact to="/">Nýjar vörur</NavLink>
          
            <NavLink className="header__link" activeClassName="header__link--selected" exact to="/categories/">Flokkar</NavLink>
          </div>
        </div>
      )
      
    }
  }
  
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__titleContent">
          <h1 className="header__title">
            <Link className="header__titleLink" to="/">Vefforritunarbúðin</Link>
          </h1>
        </div>
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