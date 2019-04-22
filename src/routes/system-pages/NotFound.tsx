import React from 'react';
import { Link } from 'react-router-dom';

import './SystemPages.scss';

export default function NotFound() {
  return (
    <div className="system-page">
      <h1 className="errorTitle">404</h1>
      <p className="errorMessage">Síða fannst ekki</p>
      <Link className="errorLink" to='/'>Aftur á forsíðu</Link>
    </div>
  )
}
