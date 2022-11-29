import React, { useEffect, useState } from 'react';
import { v4 as Uuid } from 'uuid';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import WishItem from './WishItem';
import WishInput from './WishInput';

import './WishList.css';

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 *
 *
 * @returns List the wish you can edit ,remove and add the wish
 */
function WishList() {
  const [wishes, setWishes] = useState([{ id: Uuid(), done: false, text: 'Example' }]);
  const [search, setSearch] = useState('');

  // On Init, carga los datos almacenados al cargar la pagina.

  useEffect(() => {
    if (localStorage.getItem('wishes') === 'null') {
      localStorage.setItem('wishes', JSON.stringify([{ id: Uuid(), done: false, text: 'Example' }]));
      setWishes(JSON.parse(localStorage.getItem('wishes')));
    } else {
      setWishes(JSON.parse(localStorage.getItem('wishes')));
    }
  }, []);

  // Guarda la lista de deseos cuando se modifica la lista de wishes
  useEffect(() => {
    localStorage.setItem('wishes', JSON.stringify(wishes));
  }, [wishes]);

  return (
    <>
      <WishInput
        onNewWish={(newWish) => {
          // Los punto quiere decir que se añade a lo existente
          setWishes([...wishes, newWish]);
        }}
        onFilter={(n) => {
          // Los punto quiere decir que se añade a lo existente
          setSearch(n);
        }}
      />

      <DragDropContext
        onDragEnd={(result) => {
          const { source, destination } = result;
          if (!destination) {
            return;
          }
          if (source.index === destination.index
            && source.droppableId === destination.droppableId) {
            return;
          }

          setWishes((prevTasks) => reorder(prevTasks, source.index, destination.index));
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

                {wishes.filter((item) => (search.toLowerCase() === ''
                  ? item
                  : item.text.toLowerCase().includes(search))).map(({ id, text, done }, index) => (
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
                              const modifyWish=updatedWishes.find((wish)=>wish.id===updatedWish.id);
                              modifyWish.text = updatedWish.text;
                              modifyWish.done = updatedWish.done;
                              setWishes(updatedWishes);
                            }}
                            Array={wishes}
                          />
                        </li>
                      )}
                    </Draggable>
                ))}
                {droppableProvided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>

  );
}

WishList.propTypes = {

};

WishList.defaultProps = {
};

export default WishList;
