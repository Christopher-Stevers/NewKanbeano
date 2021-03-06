//I copy pasted example code from git clone --single-branch --branch part-0-starting-point git@github.com:colbyfayock/my-final-space-characters.git in order to implement drag and drop functionality. Line 27, 28, 36 and parts of 53 to 57.
//CardContainer

import { useContext, useState } from "react";
import Card from "./card";
import styles from "./cardContainer.module.scss";
import NewContext from "./newContext";
import { Draggable, Droppable } from "react-beautiful-dnd";
import PropTypes from "prop-types"
export default function CardContainer(props) {
  const [newContext, updateNewContext, saveContextToDB] =
    useContext(NewContext);

  const ownIndex = parseInt(props.i);
  const current = Date.now();
  const [titleOpen, updateTitleOpen] = useState(false);
  const [title, updateTitle] = useState(newContext[ownIndex][0].title);

  const addObjectToContext = () => {
    const updatedContext = newContext.map((elem, index) => {
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
  };
  const deleteList = async () => {
    updateTitleOpen(false);

    const updatedContext = newContext.filter((elem, index) => {
      return index !== props.i;
    });
    await updateNewContext(updatedContext);

    await saveContextToDB(updatedContext);
  };
  const closeTitle = () => {
    if (!titleOpen) {
      updateTitleOpen(true);
    }
    if (titleOpen) {
      const updatedContext = newContext.map((elem, index) => {
        if (index === parseInt(props.i)) {
          return elem.map((elem, index) => {
            if (index === 0) {
              return {
                title: title,
                id: elem.id,
              };
            }
            return elem;
          });
        }
        return elem;
      });
      updateNewContext(updatedContext);
      saveContextToDB(updatedContext);
      updateTitleOpen(false);
    }
  };
  return (
    <div className={styles.cardContainer}>
      <div className={styles.listTitle}>
        {titleOpen ? (
          <input
            className={styles.input}
            onChange={(e) => updateTitle(e.target.value)}
            value={title}
          ></input>
        ) : (
          <h2 className={styles.h2}>{newContext[ownIndex][0].title}</h2>
        )}
        <button className={styles.titleButton} onClick={closeTitle}>
          {titleOpen ? (
            <svg
              className={styles.titleSvg}
              version="1.1"
              x="0px"
              y="0px"
              width="100px"
              height="100px"
              viewBox="0 0 100 100"
              enableBackground="new 0 0 100 100"
            >
              <g id="_x37_7_Essential_Icons">
                <path
                  id="Save"
                  d="M82.4,24.3l-9.8-9.8c-0.4-0.4-0.9-0.6-1.4-0.6H19c-1.1,0-2,0.9-2,2v68c0,1.1,0.9,2,2,2h62c1.1,0,2-0.9,2-2V25.8
                 C83,25.2,82.8,24.7,82.4,24.3z M31,18h38v32H31V18z M79,82H21V18h6v34c0,1.1,0.9,2,2,2h42c1.1,0,2-0.9,2-2V20.6l6,6V82z M64.8,24.5
                 v19c0,1.1-0.9,2-2,2c-1.1,0-2-0.9-2-2v-19c0-1.1,0.9-2,2-2C63.9,22.5,64.8,23.4,64.8,24.5z"
                />
              </g>
              <g id="Guides"></g>
              <g id="Info">
                <g id="BORDER">
                  <path
                    fill="#0000FF"
                    d="M1504-930V754H-280V-930H1504 M1512-938H-288V762h1800V-938L1512-938z"
                  />
                </g>
              </g>
            </svg>
          ) : (
            <svg
              className={styles.titleSvg}
              height="484pt"
              viewBox="-15 -15 484.00019 484"
              width="484pt"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m401.648438 18.234375c-24.394532-24.351563-63.898438-24.351563-88.292969 
                        0l-22.101563 22.222656-235.269531 
                        235.144531-.5.503907c-.121094.121093-.121094.25-.25.25-.25.375-.625.746093-.871094 
                        1.121093 0 .125-.128906.125-.128906.25-.25.375-.371094.625-.625 1-.121094.125-.121094.246094-.246094.375-.125.375-.25.625-.378906 1 0 .121094-.121094.121094-.121094.25l-52.199219 156.96875c-1.53125 4.46875-.367187 9.417969 2.996094 12.734376 2.363282 2.332031 5.550782 3.636718 8.867188 3.625 1.355468-.023438 2.699218-.234376 3.996094-.625l156.847656-52.324219c.121094 0 .121094 0 .25-.121094.394531-.117187.773437-.285156 1.121094-.503906.097656-.011719.183593-.054688.253906-.121094.371094-.25.871094-.503906 1.246094-.753906.371093-.246094.75-.621094 1.125-.871094.125-.128906.246093-.128906.246093-.25.128907-.125.378907-.246094.503907-.5l257.371093-257.371094c24.351563-24.394531 24.351563-63.898437 0-88.289062zm-232.273438 353.148437-86.914062-86.910156 217.535156-217.535156 86.914062 86.910156zm-99.15625-63.808593 75.929688 75.925781-114.015626 37.960938zm347.664062-184.820313-13.238281
                         13.363282-86.917969-86.917969 13.367188-13.359375c14.621094-14.609375 38.320312-14.609375
                         52.945312 0l33.964844 33.964844c14.511719 14.6875 14.457032 38.332031-.121094 52.949218zm0 0"
              />
            </svg>
          )}
        </button>

        <button
          id={props.i}
          onClick={deleteList}
          className={styles.titleButton}
        >
          <svg
            className={styles.deleteButton}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100px"
            height="100px"
            viewBox="0 0 100 100"
            enableBackground="new 0 0 100 100"
          >
            <g id="_x37_7_Essential_Icons">
              <path
                id="Trash"
                d="M81,23.5H61V17c0-1.1-0.9-2-2-2H41c-1.1,0-2,0.9-2,2v6.5H19c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h6.6V83
		c0,1.1,0.9,2,2,2h44.8c1.1,0,2-0.9,2-2V27.5H81c1.1,0,2-0.9,2-2C83,24.4,82.1,23.5,81,23.5z M43,19h14v4H43V19z M70.4,81H29.6V27.5
		h40.8V81z M61,38.3v32c0,1.1-0.9,2-2,2s-2-0.9-2-2v-32c0-1.1,0.9-2,2-2S61,37.1,61,38.3z M43,38.3v32c0,1.1-0.9,2-2,2s-2-0.9-2-2
		v-32c0-1.1,0.9-2,2-2S43,37.1,43,38.3z"
              />
            </g>
            <g id="Guides"></g>
            <g id="Info">
              <g id="BORDER">
                <path
                  fill="#0000FF"
                  d="M1364-930V754H-420V-930H1364 M1372-938H-428V762h1800V-938L1372-938z"
                />
              </g>
            </g>
          </svg>
        </button>
      </div>
      <Droppable droppableId={props.i.toString()} type="nestedList">
        {(provided) => (
          <ul
            className={styles.needsRoom}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {newContext[ownIndex].map((elem, index) => {
              if (!index) {
                return;
              }
              return (
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
              );
            })}

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

CardContainer.propTypes = {
  i: PropTypes.number.isRequired
};