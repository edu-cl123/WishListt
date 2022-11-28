
import React, { useState, useEffect } from 'react';
import { v4 as Uuidv4 } from 'uuid';
import WishInput from './components/WishInput';
import WishList from './components/WishList';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar from 'react-bootstrap/Navbar';


/**
 * Manage a wish list...
 * @returns HTML with a wish list.
 */
function App() {


  return (
    <div className="container-fluid">


      <Navbar bg="primary " variant="dark" >

        <Navbar.Brand>
          <img
            alt=""
            src="src/lapiz.png"
            width="30"
            height="30"
            className=""
          />{' '}
          <img
            alt=""
            src="src/letras.png"
            width="125"
            height="30"
            className=""
          />{' '}
        </Navbar.Brand>
      </Navbar>

      <br></br>

      <WishList
      
        
      />



    </div>

  );
}

export default App;
