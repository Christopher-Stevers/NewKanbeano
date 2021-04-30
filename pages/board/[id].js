import styles from '../../styles/listPage.module.scss'
import NewContext from '../../components/newContext'
import React from 'react'
import Link from 'next/link'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useState, useContext, useEffect } from 'react'
import CardContainer from '../../components/indieContainer'
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import Header from '../../components/header'
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
  const [contextState, updateContextState] = useState(
    [
    ])
  const [state, updateState] = useState([])
  const [newestState, updateNewestState] = useState([]);
  const [signUp, updateSignUp] = useState(false)
  const [username, updateUsername] = useState("")
  const [message, updateMessage] = useState("")
  const [domain, updateDomain] = useState("")
  const [dontext, updateDontext] = useState("")
  const [auth, updateAuth] = useState(true)
  const [h2, updateH2]=useState("")
  const [name, updateName] = useState("")
  const [dbId, updateDbId] = useState("")
  const [placeCard, updatePlaceCard]=useState("")
  useEffect(async () => {
    console.log(session)
    if (session){
      
      updateDomain(document.documentURI)
    console.log(document)
    const url = "/" + "api/movies?listDate=" + router.query.id
    const response = await fetch(url)
    const responseObj = await response.json();
    console.log(responseObj)
    if (typeof responseObj[0] === 'string') {
      updateAuth(false)
    }
    else {
      updateDontext(
        JSON.stringify(responseObj.data))
      updateContextState(responseObj.data)
      updateH2(responseObj.listTitle)
      updatePlaceCard(true)
    }}
  }, [router.query.id, session]);
 //if (typeof window !== 'undefined' && loading) return <div> KANBEANOYou are not signed inSign in This board either does not exist, or you do not own it. </div>

  // If no session exists, display access denied message
  if (!session) { return <div> <Header  /> <span>This board either does not exist, or you do not own it.</span> </div> }
  /* const newUser=async()=>{
     updateName(username);
     const options ={
     method: 'PUT',
     body: name
 };
   const url=domain+"api/movies?name="+username
   const response= await fetch(url)
        const responseObj=await response.json()
        console.log(responseObj)
        if(!responseObj.data){
 updateSignUp(false)
 updateLoggedIn(true)
 
        }
        if(responseObj){
          updateMessage("This username is already taken.")
       }}*/

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
    console.log(result);
    return 0;
  }
  const postToAPI = async () => {
    const clone = JSON.parse(JSON.stringify(contextState));
    const contextString = JSON.stringify(newContext)
    const postObj = JSON.stringify({
      data: clone,

    })

    console.log(postObj)
    const options = {
      method: 'POST',
      body: JSON.stringify(clone)
    };


    const url = "/" + "api/movies?listDate=" + router.query.id
    const response = await fetch(url, JSON.parse(JSON.stringify(options)))
if(response.status===200){console.log("success")}
  }
  return (

    <>{auth ?
    <div><Header />
        <div className={styles.listHeader}><h2 className={styles.h2}>{h2}</h2><span className={styles.date}> Created <time>{ogDate}</time></span>
        <button className={styles.save}onClick={postToAPI}>{<svg className={styles.saveIcon} version="1.1" x="0px" y="0px" width="100px"
    height="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" >
 <g id="_x37_7_Essential_Icons">
   <path id="Save" d="M82.4,24.3l-9.8-9.8c-0.4-0.4-0.9-0.6-1.4-0.6H19c-1.1,0-2,0.9-2,2v68c0,1.1,0.9,2,2,2h62c1.1,0,2-0.9,2-2V25.8
     C83,25.2,82.8,24.7,82.4,24.3z M31,18h38v32H31V18z M79,82H21V18h6v34c0,1.1,0.9,2,2,2h42c1.1,0,2-0.9,2-2V20.6l6,6V82z M64.8,24.5
     v19c0,1.1-0.9,2-2,2c-1.1,0-2-0.9-2-2v-19c0-1.1,0.9-2,2-2C63.9,22.5,64.8,23.4,64.8,24.5z"/>
 </g>
 <g id="Guides">
 </g>
 <g id="Info">
   <g id="BORDER">
     <path fill="#0000FF" d="M1504-930V754H-280V-930H1504 M1512-938H-288V762h1800V-938L1512-938z"/>
   </g>
 </g>
 </svg>}</button></div>
      < main className={styles.main} >
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <NewContext.Provider value={[contextState, updateContextState]}>

          <div className={styles.flexWrapper}>  <Droppable key={1} droppableId="kingOfTheDrops" direction="horizontal" type="parentList">
              {(provided, snapshot) => (
                <div className={styles.list}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >{contextState.map((elem, index) => {
                  return <Draggable draggableId={index.toString() + "topLevel"} index={index}>
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
      </div> : <div>Access denied, this is not your board <Link href='/'>Home</Link></div>}
    </>
  )
}


{/*<div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
  */} {/*</main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>*/}