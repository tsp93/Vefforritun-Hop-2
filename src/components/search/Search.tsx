import React from 'react';

import Button from '../button/Button';

import './Search.scss';
import Input from '../input/Input';

export default function Search(props : any) {
  const { handleSearchChange, submitSearch, searchText } = props;

  return (
    <form className="searchForm" onSubmit={submitSearch}>
      <Input
        name={'search'}
        onChange={handleSearchChange}
        value={searchText}
      />
      <Button
        className={'searchButton'}
        children={'Leita'}
        small={true}
      />
    </form>
  );
}
