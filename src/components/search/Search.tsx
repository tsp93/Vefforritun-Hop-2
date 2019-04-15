import React from 'react';

export default function Search() {
  return (
    <form>
      <label htmlFor="leit">leit:</label>
      <input autoComplete="off" id="leit" type="text" name="leit"/>
      <button>leita</button>
      
    </form>
  );
}
