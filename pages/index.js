
import styles from '../styles/Home.module.css'
import NewContext from '../components/newContext'
import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useState, useContext } from 'react'
import CardContainer from '../components/indieContainer'
import { v4 as uuidv4 } from 'uuid';
export default function Home() {
  const current = Date.now();
  const [loggedIn, updateLoggedIn]=useState(false);
  const [listArr, updateListArr] = useState([]);
  const [count, updateCount] = useState([current])
  const newContext = useContext(NewContext);
  const [contextState, updateContextState]=useState([])
  const [state, updateState]=useState([])
  const [newestState, updateNewestState]=useState([]);
  const [signUp, updateSignUp]=useState(false)
  const [username, updateUsername]=useState("")
  const [message, updateMessage]=useState("")
  const newUser=async()=>{
    updateName(username);
    const options ={
    method: 'PUT',
    body: name
};

  const url="http://localhost:3000/api/movies?name="+username
  const response= await fetch(url)
       const responseObj=await response.json()
       console.log(responseObj)
       if(!responseObj.data){
updateSignUp(false)
updateLoggedIn(true)

       }
       if(responseObj){
         updateMessage("This username is already taken.")
      }}
  const [name, updateName]=useState("")
  const [dbId, updateDbId]=useState("")
    const logger=async(e)=>{
        e.preventDefault()
        const url="http://localhost:3000/api/movies?name="+name
       const response= await fetch(url)
       const responseObj=await response.json()
       if(responseObj.data){
    updateLoggedIn(true)
    updateContextState(responseObj.data);


       }
       if(!responseObj.data){
         updateSignUp(true)
       }
    }
    const grabName=(e)=>{
    updateName(e.target.value)
    }
  const addList = () => {
    updateContextState(
      contextState.concat([[]]));

  }

    let [stateContext, updateStateContext] = useState([
  ]);
    const defaultContext = [stateContext, updateStateContext];
    
    const clone=JSON.parse(JSON.stringify(contextState));
    function handleOnDragEnd(result) {
       if(result.destination===null){return;}
                      const droppableSource=parseInt(result.source.droppableId);
                      const droppableDestination=parseInt(result.destination.droppableId);
              const draggedContext=clone.map((elem, index)=>{
                  if(index===parseInt(result.destination.droppableId)){
                      const clonedContext=JSON.parse(JSON.stringify(clone));
                     const [reorderedItem]= clonedContext[droppableSource].splice(result.source.index, 1);
                      clonedContext[droppableDestination].splice(result.destination.index, 0, reorderedItem);
                      return clonedContext;
                      
                  }
                })
                const nextContext=JSON.parse(JSON.stringify(draggedContext[parseInt(droppableDestination)]));
                updateContextState(nextContext)
              return;
          }
const postToAPI=async()=>{
  const clone=JSON.parse(JSON.stringify(contextState));
   const contextString=JSON.stringify(newContext)
   const postObj=JSON.stringify({
 _id: dbId,
data: clone,

name: name
   })
   
   console.log(postObj)
 const options ={
    method: 'POST',
    body: JSON.stringify(clone)
};

  const url="http://localhost:3000/api/movies?name="+name
  const response= await fetch(url, JSON.parse(JSON.stringify(options)))

}
  return (

<>
  {loggedIn ? 
    < main className = { styles.main } >
     
     <DragDropContext onDragEnd={handleOnDragEnd}>
  <NewContext.Provider value={[contextState, updateContextState]}>
    
<ul className={styles.list}>{contextState.map((elem, index)=> {return <li key={uuidv4()}><CardContainer i={index}/></li>})}</ul>
<button onClick={addList} >+</button>
          </NewContext.Provider>
          </DragDropContext>  
  <button onClick={postToAPI}>SAVE</button>
    </main >: (signUp)?<div><span>Sign up!</span><input onChange={(e)=>updateUsername(e.target.value)} placeholder="username"></input><button onClick={newUser}>Create account!</button><span>{message}</span></div>:
    <div><span>Please Enter your username</span><form><input onChange={grabName} type="string"></input><input type="submit" onClick={logger}></input></form></div>
  }</>
  )
}

    {/*<div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
  */}{/*</main>
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