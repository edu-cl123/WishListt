import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import WishItem from './WishItem';
import WishInput from './WishInput';
import { v4 as Uuid } from 'uuid';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './WishList.css';


/**
 * Callback to run when a wish changes.
 * @callback onUpdateWish - Callback to run when a wish changes.
 * @param {Object} updatedWish - Wish with new values.
 * @param {String} updatedWish.id - Identifier for wish.
 * @param {String} updatedWish.text - Text of wish.
 */

/**
 * Manage a wish list.
 * @param {Object[]} wishes - List of wishes.
 * @param {String} wishes[].id - Identifier for wish.
 * @param {String} wishes[].text - Text of wish.
 * @param {onUpdateWish} callback - Callback to run when a wish changes.
 * @returns HTML with a wish list.
 * @todo Fix array map function.
 */
const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * 
 *  List the wish you can edit ,remove and add the wish
 * @returns 
 */
function WishList({ onUpdateWish }) {

  const [wishes, setWishes] = useState([]);
  const [search, setSearch] = useState('');


  //On Init, carga los datos almacenados al cargar la pagina.
  useEffect(() => {
    setWishes(JSON.parse(localStorage.getItem('wishes')));
  }, []);

  //Guarda la lista de deseos cuando se modifica la lista de wishes
  useEffect(() => {
    localStorage.setItem('wishes', JSON.stringify(wishes));
  }, [wishes]);


  return (
    <><WishInput
      onNewWish={(newWish) => {
        //Los punto quiere decir que se añade a lo existente
        setWishes([...wishes, newWish]);

      }}
      onFilter={(n) => {
        //Los punto quiere decir que se añade a lo existente
        setSearch(n)

      }}

    />

      <DragDropContext
        onDragEnd={(result) => {

          const { source, destination } = result;
          if (!destination) {
            return;
          }
          if (source.index === destination.index &&
            source.droppableId === destination.droppableId) {
            return;
          }

          setWishes((prevTasks) => reorder(prevTasks, source.index, destination.index)
          );
        }}
      >

        <div className="app">
          <Droppable droppableId="wishes">
            {(droppableProvided) => (
              <ul
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
                className="task-container"
              >
                {wishes.filter((item) => {
                  return search.toLowerCase() === ''
                    ? item
                    : item.text.toLowerCase().includes(search);
                }).map(({ id, text, done }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(draggableProvided) => (
                      <li
                        {...draggableProvided.draggableProps}
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.dragHandleProps}
                        className="task-item"
                      >
                        <WishItem
                          wish={{ id, text, done }}
                          onChangeWish={(updatedWish) => {
                            const updatedWishes = [...wishes];
                            const modifyWish = updatedWishes.find((wish) => wish.id === updatedWish.id);
                            modifyWish.text = updatedWish.text;
                            modifyWish.done = updatedWish.done;
                            setWishes(updatedWishes);
                          }}
                          Array={wishes} />
                      </li>
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      </DragDropContext></>

  );

}


WishList.propTypes = {
  wishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }),
  ),
  onUpdateWish: PropTypes.func,
};

WishList.defaultProps = {
  wishes: [],
  onUpdateWish: () => ({ id: '', text: '', done: false }),
};


export default WishList;
