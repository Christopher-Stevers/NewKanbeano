//I copy pasted example code from git clone --single-branch --branch part-0-starting-point git@github.com:colbyfayock/my-final-space-characters.git in order to implement drag and drop functionality. Line 27, 28, 36 and parts of 53 to 57.
//CardContainer

import { useContext, useState } from "react";
import Card from "./card";
import styles from "./cardContainer.module.scss";
import NewContext from "./newContext";
import { Draggable, Droppable } from "react-beautiful-dnd";

export default function CardContainer(props) {
  const [newContext, updateNewContext] = useContext(NewContext);
  const current = Date.now();
  const clone = JSON.parse(JSON.stringify(newContext));

  //coment

  const addObjectToContext = () => {
    const updatedContext = clone.map((elem, index) => {
      if (index === parseInt(props.i)) {
        return elem.concat({
          title: "",
          content: "",
          id: current.toString(),
          listIndex: props.i.toString(),
          editable: true,
        });
      }
      return elem;
    });
    updateNewContext(updatedContext);
    /* newContext[0][props.i][0][0].push(
            [cardVals, updateCardVals]
        )*/
  }; /*onDragEnd={handleOnDragEnd}*/
  const ownIndex = parseInt(props.i);
  return (
    <div className={styles.cardContainer}>
      <Droppable droppableId={props.i.toString()}>
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {newContext[ownIndex].map((elem, index) => (
              <Draggable
                key={elem.id}
                draggableId={elem.id.toString()}
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className={styles.cardWrapper}>
                      <Card
                        index={index}
                        title={elem.title}
                        id={elem.id}
                        content={elem.content}
                        key={elem.id}
                        editable={elem.editable}
                        listIndex={props.i}
                      />
                    </div>
                  </li>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </ul>
        )}
      </Droppable>

      <button onClick={addObjectToContext} className={styles.add}>
        +
      </button>
    </div>
  );
}
