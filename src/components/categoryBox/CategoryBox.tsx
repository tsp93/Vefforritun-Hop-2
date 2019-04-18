import React from 'react';
import  { Link } from 'react-router-dom';

import './CategoryBox.scss';
import { ICategory } from '../../api/types';

export default function CategoryBox(props: ICategory) {
  const { id, title } = props;

  return (
    <Link to={`/categories/${id}`} className='categoryBox'>
      <h1>{title}</h1>
    </Link>
  );
}