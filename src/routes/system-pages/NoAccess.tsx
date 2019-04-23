import React from 'react';
import { Link } from 'react-router-dom';

import './SystemPages.scss';

export default function NoAccess() {
  return (
    <div className="system-page">
      <h1 className="errorTitle">401</h1>
      <p className="errorMessage">Þú hefur ekki leyfi til að skoða þessa síðu</p>
      <Link className="errorLink" to='/login'>Innskrá</Link>
    </div>
  )
}
