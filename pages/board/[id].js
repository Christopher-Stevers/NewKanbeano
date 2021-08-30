import styles from '../../styles/listPage.module.scss'
import NewContext from '../../components/newContext'
import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useState, useContext, useEffect } from 'react'
import CardContainer from '../../components/indieContainer'
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import Header from '../../components/header'
import ColorPicker from '../../components/colorPicker'
export default function Home () {
  const [session, loading] = useSession()
  const router = useRouter()
  const { id } = router.query
  const ogDate=new Date(parseInt(id)).toDateString();
  const current = Date.now();
  const newContext = useContext(NewContext);
  const [contextState, updateContextState] = useState(
    [
    ])
  const [auth, updateAuth] = useState(true)
  const [h2, updateH2]=useState("")
  const [placeCard, updatePlaceCard]=useState("");
  
  const formatDate=(input)=>{ 
    const dateRegex= /([A-z]{3})(.{5})(\d+)(.{5})/;
    return input.replace(dateRegex, "$1, $2 $3, $4");
}
  useEffect(async () => {
    if (session){
      
    const url = "/" + "api/movies?listDate=" + router.query.id
    const response = await fetch(url)
    const responseObj = await response.json();
    if (typeof responseObj[0] === 'string') {
      updateAuth(false)
    }
    else {
      updateAuth(true)
      updateContextState(responseObj.data)
      updateH2(responseObj.listTitle)
      updatePlaceCard(true)
    }}
  }, [router.query.id, session]);

  // If no session exists, display access denied message
  if (!session) { return <div> <Header  /> <span>This board either does not exist, or you do not own it.</span> </div> }
  

  const grabName = (e) => {
    updateName(e.target.value)
  }
  const addList = () => {
    updateContextState(
      contextState.concat([[{
        title: "",
        id: current + 1
      }]]));

  }

  const postToAPI = async (stateOfContext) => {
    const clone = JSON.parse(JSON.stringify(stateOfContext));
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
  }
  
  const postStateToAPI=()=>{
  postToAPI(contextState);}
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
      updateContextState(nextContext);
    postToAPI(nextContext);
      return;
    }
    if(result.type==="parentList"){
    

      const clonedContext=JSON.parse(JSON.stringify(contextState));
      const [reorderedItem] = clonedContext.splice(result.source.index, 1);
      clonedContext.splice(result.destination.index, 0, reorderedItem);
      updateContextState( clonedContext);

      


    postToAPI(clonedContext);

    }
    return 0;
  }
  
  return (

    <>
    <div>
      <Head >
        <title>{h2}</title>
 
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />{auth ?<>
        <div className={styles.listHeader}><h2 className={styles.h2}>{h2}</h2><span className={styles.date}> Created <time>{formatDate(ogDate)}</time></span>
        </div>
      < main className={styles.boardMain} >
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <NewContext.Provider value={[contextState, updateContextState, postToAPI]}>

          <div className={styles.flexWrapper}>  <Droppable key={1} droppableId="kingOfTheDrops" direction="horizontal" type="parentList">
              {(provided, snapshot) => (
                <div className={styles.list}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >{contextState.map((elem, index) => {
                  return <Draggable key={uuidv4()} draggableId={index.toString() + "topLevel"} index={index}>
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
           {(placeCard)?<div className={styles.addList}><button className={styles.button} onClick={addList} >+</button></div>: null} 
            </div></div>
          </NewContext.Provider>
        </DragDropContext>
        
      </main >
      
    </>   : <div>Access denied, this is not your board <Link href='/'>Home</Link></div>}
    </div>
    
    <ColorPicker />
    </>
  )
}
