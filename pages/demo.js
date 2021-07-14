import styles from '../styles/listPage.module.scss'
import NewContext from '../components/newContext'
import React from 'react'
import Link from 'next/link'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useState, useContext, useEffect } from 'react'
import CardContainer from '../components/indieContainer'
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import Header from '../components/header'
import ColorPicker from '../components/colorPicker';
export default function Home () {
  const [session, loading] = useSession()
  const router = useRouter()
  const { id } = router.query
  const ogDate=new Date(parseInt(id)).toDateString();
  const current = Date.now();
  const [loggedIn, updateLoggedIn] = useState(true);
  const [listArr, updateListArr] = useState([]);
  const [count, updateCount] = useState([current])
  const newContext = useContext(NewContext);
  const [contextState, updateContextState] = useState([
    [{
      "title": "Todo",
      "id": 1620144498949
  }, {
      "title": "Ship Production Build.",
      "content": "Complete app.",
      "id": "1620144541114",
      "editable": false
  }, {
      "title": "Build Design System.",
      "content": "Transfer designs to a extensible design system for app.",
      "id": "1620144675026",
      "editable": false
  }],
  [{
      "title": "In Progress",
      "id": 1620144500521
  }, {
      "title": "Build Prototype",
      "content": "Build working protoype of data and UX interactions.",
      "id": "1620144585932",
      "editable": false
  }, {
      "title": "Get Designs",
      "content": "Work with designers on app design.",
      "id": "1620144644883",
      "editable": false
  }],
  [{
      "title": "Completed",
      "id": 1620144501633
  }, {
      "title": "Write proposal",
      "content": "Layout proposal for app.",
      "id": "1620144552071",
      "editable": false
  }]
])
  const [placeCard, updatePlaceCard]=useState("")
 //if (typeof window !== 'undefined' && loading) return <div> KANBEANOYou are not signed inSign in This board either does not exist, or you do not own it. </div>

 const addList = () => {
  updateContextState(
    contextState.concat([[{
      title: "",
      id: current + 1
    }]]));}
  // If no session exists, display access denied message

  //let [stateContext, updateStateContext] = useState([]);
  //const defaultContext = [stateContext, updateStateContext];

  const clone = JSON.parse(JSON.stringify(contextState));
  function handleOnDragEnd(result) {
    if (result.destination === null) { return; }
    if (result.type === "nestedList") {
      const droppableSource = parseInt(result.source.droppableId);
      const droppableDestination = parseInt(result.destination.droppableId);
      const draggedContext = clone.map((elem, index) => {
        if (index === parseInt(result.destination.droppableId)) {
          const clonedContext = JSON.parse(JSON.stringify(clone));
          const notZero = (result.destination.index) ? result.destination.index : 1;
          const [reorderedItem] = clonedContext[droppableSource].splice(result.source.index, 1);
          clonedContext[droppableDestination].splice(notZero, 0, reorderedItem);
          return clonedContext;

        }
      })
      const nextContext = JSON.parse(JSON.stringify(draggedContext[parseInt(droppableDestination)]));
      updateContextState(nextContext)
      return;
    }
    if(result.type==="parentList"){
    

      const droppableSource = parseInt(result.source.droppableId);
      const droppableDestination = parseInt(result.destination.droppableId);
      const clonedContext=JSON.parse(JSON.stringify(contextState));
      const [reorderedItem] = clonedContext.splice(result.source.index, 1);
      clonedContext.splice(result.destination.index, 0, reorderedItem);
      updateContextState( clonedContext);

      



    }
    return 0;
  }
  const postToAPI = async () => {
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
if(response.status===200){console.log("success")}
  }
  const handleOnDragStart=()=>{


  }
  return (

    <>
    <div className={styles.entirePage}><Header />
        
      < main className={styles.main} >
        <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleOnDragStart}>
          <NewContext.Provider value={[contextState, updateContextState]}>

          <div className={styles.flexWrapper}>  <Droppable key={1} droppableId="kingOfTheDrops" direction="horizontal" type="parentList">
              {(provided, snapshot) => (
                <div className={styles.list}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >{contextState.map((elem, index) => {
                  return <Draggable key={()=>uuidv4}  draggableId={index.toString() + "topLevel"} index={index}>
                    {(provided, snapshot) => (
                      <div className={styles.listItem}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      ><CardContainer i={index} /> </div>
                    )}
                  </Draggable>
                })}

                  {provided.placeholder}
                </div>
              )}
            </Droppable><div>
           {(true)?<div className={styles.addList}><button className={styles.button} onClick={addList} >+</button></div>: null} 
            </div></div>
          </NewContext.Provider>
        </DragDropContext>
        
      </main >
      </div>
      <ColorPicker />
    </>
  )
}

