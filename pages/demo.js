import styles from "../styles/listPage.module.scss";
import NewContext from "../components/newContext";
import React from "react";
import Head from "next/head";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState, } from "react";
import { getSession} from"next-auth/client";
import CardContainer from "../components/indieContainer";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import Header from "../components/header";
import ColorPicker from "../components/colorPicker";
export default function Home({session}) {
  const [contextState, updateContextState] = useState([
    [
      {
        title: "Todo",
        id: 1620144498949,
      },
      {
        title: "Ship Production Build.",
        content: "Complete app.",
        id: "1620144541114",
        editable: false,
      },
      {
        title: "Build Design System.",
        content: "Transfer designs to a extensible design system for app.",
        id: "1620144675026",
        editable: false,
      },
    ],
    [
      {
        title: "In Progress",
        id: 1620144500521,
      },
      {
        title: "Build Prototype",
        content: "Build working protoype of data and UX interactions.",
        id: "1620144585932",
        editable: false,
      },
      {
        title: "Get Designs",
        content: "Work with designers on app design.",
        id: "1620144644883",
        editable: false,
      },
    ],
    [
      {
        title: "Completed",
        id: 1620144501633,
      },
      {
        title: "Write proposal",
        content: "Layout proposal for app.",
        id: "1620144552071",
        editable: false,
      },
    ],
  ]);
  //if (typeof window !== 'undefined' && loading) return <div> KANBEANOYou are not signed inSign in This board either does not exist, or you do not own it. </div>

  const addList = () => {
    updateContextState(
      contextState.concat([
        [
          {
            title: "",
            id: uuidv4(),
          },
        ],
      ])
    );
  };
  // If no session exists, display access denied message

  //let [stateContext, updateStateContext] = useState([]);
  //const defaultContext = [stateContext, updateStateContext];

  const clone = JSON.parse(JSON.stringify(contextState));
  function handleOnDragEnd(result) {
    if (result.destination === null) {
      return;
    }
    if (result.type === "nestedList") {
      const droppableSource = parseInt(result.source.droppableId);
      const droppableDestination = parseInt(result.destination.droppableId);
      const draggedContext = clone.map((elem, index) => {
        if (index === parseInt(result.destination.droppableId)) {
          const clonedContext = JSON.parse(JSON.stringify(clone));
          const notZero = result.destination.index
            ? result.destination.index
            : 1;
          const [reorderedItem] = clonedContext[droppableSource].splice(
            result.source.index,
            1
          );
          clonedContext[droppableDestination].splice(notZero, 0, reorderedItem);
          return clonedContext;
        }
      });
      const nextContext = JSON.parse(
        JSON.stringify(draggedContext[parseInt(droppableDestination)])
      );
      updateContextState(nextContext);
      return;
    }
    if (result.type === "parentList") {
      const clonedContext = JSON.parse(JSON.stringify(contextState));
      const [reorderedItem] = clonedContext.splice(result.source.index, 1);
      clonedContext.splice(result.destination.index, 0, reorderedItem);
      updateContextState(clonedContext);
    }
    return 0;
  }
  const saveContextToDB=async ()=>{return }
  /*const postToAPI = async () => {
    const clone = JSON.parse(JSON.stringify(contextState));
    const contextString = JSON.stringify(newContext)
    const postObj = JSON.stringify({
      data: clone,

    })

    const options = {
      method: 'POST',
      body: JSON.stringify(clone)
    };


    const url = "/" + "api/movies?listDate=" + router.query.id
    const response = await fetch(url, JSON.parse(JSON.stringify(options)))
if(response.status===200){}
  }*/
  const handleOnDragStart = () => {};
  return (
    <>
      <Head>
        <title>Kanbeano Demo</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.entirePage}>
        <Header session={session} />

        <main className={styles.main}>
          <DragDropContext
            onDragEnd={handleOnDragEnd}
            onDragStart={handleOnDragStart}
          >
            <NewContext.Provider value={[contextState, updateContextState, saveContextToDB]}>
              <div className={styles.flexWrapper}>
                {" "}
                <Droppable
                  key={1}
                  droppableId="kingOfTheDrops"
                  direction="horizontal"
                  type="parentList"
                >
                  {(provided) => (
                    <div
                      className={styles.list}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {contextState.map((elem, index) => {
                        return (
                          <Draggable
                            key={uuidv4()}
                            draggableId={index.toString() + "topLevel"}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className={styles.listItem}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <CardContainer  i={index} />{" "}
                              </div>
                            )}
                          </Draggable>
                        );
                      })}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <div>
                   {
                    <div className={styles.addList}>
                      <button className={styles.button} onClick={addList}>
                        +
                      </button>
                    </div>
                  } 
                </div>
              </div>
            </NewContext.Provider>
          </DragDropContext>
        </main>
      </div>
      <ColorPicker />
    </>
  );
}

Home.propTypes = {
  session: PropTypes.object,
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return { props: {  session } };
}
