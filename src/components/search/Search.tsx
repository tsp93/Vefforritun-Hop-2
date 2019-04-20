import React from 'react';

import Button from '../button/Button';
import Input from '../input/Input';

import './Search.scss';

export default function Search(props : any) {
  const { handleSearchChange, submitSearch, searchText } = props;

  return (
    <form className="searchForm" onSubmit={submitSearch}>
      <Input
        label={'Leita:'}
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
