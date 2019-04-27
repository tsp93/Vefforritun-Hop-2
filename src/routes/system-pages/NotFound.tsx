import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import './SystemPages.scss';

export default function NotFound() {
  return (
    <Fragment>
      <Helmet title="404" />
      <div className="system-page">
        <h1 className="errorTitle">404</h1>
        <p className="errorMessage">Síða fannst ekki</p>
        <Link className="errorLink" to='/'>Aftur á forsíðu</Link>
      </div>
    </Fragment>
  )
}
