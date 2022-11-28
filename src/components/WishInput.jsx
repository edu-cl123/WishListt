import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as Uuidv4 } from 'uuid';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


/**
 * 
 * @param {onFilter} -returns the finder value
 
 * @returns Returns the seeker and the modal to generate wish

 */
function WishInput({ onNewWish,onFilter }) {
  const inputText = useRef();
  const añadido = false;
  
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => {

    if (inputText.current.value.length > 0) {
      onNewWish({
          id: Uuidv4(),
          text: inputText.current.value,
          done: false,
  
      });
      inputText.current.value = '';
    }

    setShow(false);
  }

  const handleShow = () => setShow(true);



  const [wish, setWish] = useState("");



  return (
    <div className="container-fluid">

      <InputGroup className="mb-3">
        <Form.Control
        
        onChange={(e) => onFilter(e.target.value)}
          placeholder="Search Wish"
        />
        <Button variant="primary" onClick={handleShow} >
          Create wish
        </Button>
      </InputGroup>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>

          <fieldset className="form-group">
            <legend>New wish</legend>
            <input
              className="form-control"
              type="text"
              placeholder="Introduce your new wish"
              ref={inputText}
              onKeyUp={(event) => {
                if (event.key === 'Enter' && inputText.current.value.length > 0) {
                  onNewWish({
                    id: Uuidv4(),
                    text: inputText.current.value,
                    done: false,
                  });
                  inputText.current.value = '';
                  handleClose();
                }
              }}
            />
          </fieldset >
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

WishInput.propTypes = {
  onNewWish: PropTypes.func,
  onFilter: PropTypes.func,
};

WishInput.defaultProps = {
  onNewWish: () => { },
  onFilter: () => { }
};


export default WishInput;
