import React from 'react';
import Button from '../button/Button';

export default function Search(props : any) {
  const { handleSearchChange } = props;

  return (
    <form>
      <label htmlFor="leit">leit:</label>
      <input autoComplete="off" id="leit" type="text" name="leit" onChange={handleSearchChange}/>
      <Button
        className={'searchButt'}
        children={'Leita'}
      />
    </form>
  );
}
