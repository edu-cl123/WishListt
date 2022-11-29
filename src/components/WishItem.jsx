import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './WishItem.css';
import { Container, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

/**
 *
 * @param {Object}wish -the desire to be modified
 * @param {Function}onChangeWish -function that is called in case the desire changes
 * @param {Array}Array -list of objects to be able to edit and delete
 * @returns the button and two functionalities
 */
function WishItem({ wish, onChangeWish, Array }) {
  useEffect(() => {

  });
  const inputText = useRef();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleClose = () => {
    if (inputText.current.value.length > 0) {
      for (let i = 0; i < Array.length; i++) {
        if (Array[i].id == wish.id) {
          Array[i].text = inputText.current.value;
          localStorage.setItem('wishes', JSON.stringify(Array));
          window.location.reload();
        }
      }
      inputText.current.value = '';
    }

    setShow(false);
  };

  const Close = () => {
    setShow(false);
  };

  const Delete = () => {
    for (let i = 0; i < Array.length; i++) {
      if (Array[i].id == wish.id) {
        Array.splice(i, 1);
        localStorage.setItem('wishes', JSON.stringify(Array));
        window.location.reload();
      }
    }
  };

  return (
    <ul>
      <li className="list-group-item wishItem">

        <Container>
          <Row>

            <Col md={{ span: 0, offset: 0 }}>

              <input
                type="checkbox"
                defaultChecked={wish.done}
                id={wish.id}
                onChange={(event) => {
                  onChangeWish({
                    id: wish.id,
                    text: wish.text,
                    done: event.target.checked,
                  });
                }}
              />
              <label
                className={ClassNames({
                  'text-decoration-line-through': wish.done,
                  'wish-item-done': wish.done,
                })}
                htmlFor={wish.id}
              >
                {wish.text}
              </label>
            </Col>
            <Col md={{ span: 3, offset: 2 }}>

              <Button variant="warning" onClick={handleShow}>Editar</Button>

              <Button variant="danger" onClick={Delete}>Eliminar</Button>
            </Col>

          </Row>
        </Container>

        <Modal show={show} onHide={handleClose}>
          <Modal.Body>

            <fieldset className="form-group">
              <legend>Edit wish</legend>
              <input
                defaultValue={wish.text}
                className="form-control"
                type="text"
                placeholder="Edit your  wish"
                ref={inputText}
              />
            </fieldset>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={Close}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

      </li>
    </ul>
  );
}

WishItem.propTypes = {
  wish: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
  }),
  onChangeWish: PropTypes.func,
  Array: PropTypes.array,
};

WishItem.defaultProps = {
  wish: { id: '0', text: 'Test wish', done: false },
  onChangeWish: () => { },
  Array: [],
};

export default WishItem;
