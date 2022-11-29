import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import WishList from './components/WishList';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/**
 * Manage a wish list...
 * @returns HTML with a wish list.
 */
function App() {
  return (
    <div className="container-fluid">

      <Navbar bg="primary " variant="dark">

        <Navbar.Brand>
          <img
            alt=""
            src="src/lapiz.png"
            width="30"
            height="30"
            className=""
          />
          {' '}
          <img
            alt=""
            src="src/letras.png"
            width="125"
            height="30"
            className=""
          />
          {' '}
        </Navbar.Brand>
      </Navbar>

      <br />

      <WishList />

    </div>

  );
}

export default App;
