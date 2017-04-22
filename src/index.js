import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/login';
import Shipment from './components/shipment';
import NewShipment from './components/shipment/new';
import Customer from './components/customer';
import ls from 'local-storage'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import './api/configs'

const token = ls.get('authen', {})

const logOut = (event) => {
  event.preventDefault()
  ls.remove('authen')
  window.location.href = '/login'
}

ReactDOM.render(
  <Router>
    <section>
      <nav className="navbar navbar-inverse navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand">Goship</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className={token ? '' : 'hidden'}><Link to="/shipment">Vận đơn</Link></li>
              <li className={token ? '' : 'hidden'}><Link to="/customer">Khách hàng</Link></li>
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li className={token ? 'hidden' : ''}><Link to="/login">Đăng nhập</Link></li>
              <li className={token ? '' : 'hidden'}><a href="#" onClick={logOut}>Đăng xuất</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <Route path="/login" component={Login} />
        <Route path="/shipment" component={Shipment} />
        <Route path="/new-shipment" component={NewShipment} />
        <Route path="/customer" component={Customer} />
      </div>
    </section>
  </Router>,
  document.getElementById('root')
);

