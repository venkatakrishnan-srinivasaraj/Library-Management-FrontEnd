import React from 'react';
import { Link } from 'react-router-dom' 

class Nav extends React.Component {
    render() {    
      return (
        <nav className="Nav">
          <div className="Nav__container">
            <div className="Nav__right">
              <ul className="Nav__item-wrapper">
                <li className="Nav__item">
                  <Link className="Nav__link" to="/">Search Portal</Link>
                </li>
                <li className="Nav__item">
                  <Link className="Nav__link" to="/borrowerManagement">Borrower Management Portal</Link>
                </li>
                <li className="Nav__item">
                  <Link className="Nav__link" to="/checkin">Checkin Portal</Link>
                </li>
                <li className="Nav__item">
                  <Link className="Nav__link" to="/fine">Fine Portal</Link>
                </li>
                <li className="Nav__item">
                  <Link className="Nav__link" to="/importdata">Data Import Portal</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    }
}

export default Nav;