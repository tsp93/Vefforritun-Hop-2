import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import './SystemPages.scss';

export default function NoAccess() {
  return (
    <Fragment>
      <Helmet title="401" />
      <div className="system-page">
        <h1 className="errorTitle">401</h1>
        <p className="errorMessage">Þú hefur ekki leyfi til að skoða þessa síðu</p>
        <Link className="errorLink" to='/login'>Innskrá</Link>
      </div>
    </Fragment>
  )
}
