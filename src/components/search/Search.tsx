import React from 'react';

import Button from '../button/Button';

import './Search.scss';

export default function Search(props : any) {
  const { handleSearchChange, submitSearch, searchText } = props;

  return (
    <form className="searchForm" onSubmit={submitSearch}>
      <div>
        <label htmlFor="search" className="searchLabel">Leita:</label>
        <input className="searchInput" autoComplete="off" id="search" type="text" name="search" onChange={handleSearchChange} value={searchText}/>
      </div>
      <Button
        className={'searchButton'}
        children={'Leita'}
      />
    </form>
  );
}
