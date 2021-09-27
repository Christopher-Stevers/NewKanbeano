
import styles from '../../styles/Home.module.scss'
import NewContext from '../../components/newContext'
import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useState, useContext, useEffect } from 'react'
import { useSession, getSession } from 'next-auth/client'
import CardContainer from '../../components/indieContainer'
import { parse, v4 as uuidv4 } from 'uuid';
import Header from '../../components/header'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import ColorPicker from '../../components/colorPicker'
export default function Home({ serverUserEmail, serverRes}) {
  const [session, loading] = useSession();
  const [userEmail, updateUserEmail]=useState(serverUserEmail);
  const current = Date.now();
  const [loggedIn, updateLoggedIn] = useState(true);
  const [listArr, updateListArr] = useState([]);
  const [count, updateCount] = useState([current])
  const newContext = useContext(NewContext);
  const [domain, updateDomain] = useState("")
  const [res, updateRes] = useState(serverRes)
  const [enterName, updateEnterName] = useState(false);
  
  const periodRegex = /\./g;
  useEffect(async () => {
    if (session) {
      const url =  "/api/arrayOfBoards"
      const response = await fetch(url);
      const responseObj = await response.json()
      updateRes(responseObj);
      updateUserEmail(session.user.email.replace(periodRegex, ""))

    }


  }, [session])
  const [contextState, updateContextState] = useState(
    [
    ])
  const [name, updateName] = useState("")
  const [state, updateState] = useState([])
  const [newestState, updateNewestState] = useState([]);
  const [signUp, updateSignUp] = useState(false)
  const [username, updateUsername] = useState("")
  const [message, updateMessage] = useState("")
  if(!session){return <><Header /><main className={styles.fullPage}></main></>}
  const newBoard = async () => {
    const options = {
      method: 'PUT',
      body: JSON.stringify({
        data: [
        ],
        email: userEmail,
        listTitle: name,
        listDate:current,
        users:[userEmail]
      })

    }; 
    updateRes([...res,
    {
      email: userEmail,
      listTitle: name,
      listDate:current
    }])

updateEnterName(false);
    const url =  "/api/arrayOfBoards"
    const response = await fetch(url, options)
    const responseObj = await response.json();

  }/* */
  //const [dbId, updateDbId] = useState("")
  

  //let [stateContext, updateStateContext] = useState([
  //]);
  //const defaultContext = [stateContext, updateStateContext];

  const clone = JSON.parse(JSON.stringify(contextState));
  function handleOnDragEnd(result) {
    if (result.destination === null) { return; }
    const droppableSource = parseInt(result.source.droppableId);
    const droppableDestination = parseInt(result.destination.droppableId);
    const draggedContext = clone.map((elem, index) => {
      if (index === parseInt(result.destination.droppableId)) {
        const clonedContext = JSON.parse(JSON.stringify(clone));
        const [reorderedItem] = clonedContext[droppableSource].splice(result.source.index, 1);
        clonedContext[droppableDestination].splice(result.destination.index, 0, reorderedItem);
        return clonedContext;

      }
    })
    const nextContext = JSON.parse(JSON.stringify(draggedContext[parseInt(droppableDestination)]));
    updateContextState(nextContext)
    return;
  }{/*
  const postToAPI = async () => {
    const clone = JSON.parse(JSON.stringify(contextState));
    const contextString = JSON.stringify(newContext)
    const postObj = JSON.stringify({
      _id: dbId,
      data: clone,

      name: name
    })

    const options = {
      method: 'POST',
      body: JSON.stringify(clone)
    };
  }*/}
  const deleteFromDb = async (e) => {
    const options = {
      method: 'DELETE',
    };
    const url = "/api/arrayOfBoards?listDate=" + e.currentTarget.id
    const response = await fetch(url, options)
    const resObj=await response.json()
   if(resObj) { const timeArr = res.map(elem => elem.listDate.toString())
    const index = timeArr.indexOf(e.target.id)
    const newArr = [...res]
    newArr.splice(index, 1);
    updateRes(newArr)}


  }
  return (<>
    <Head >
      <title>My Boards</title>

      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head><Header />
{(session)? 
  < main className={styles.main} >
<ul className={styles.boards}> 
<li><div className={styles.board}><Image className={styles.image}src="/Optimized-Screenshot_2021-04-30 Screenshot.webp" width="300" height="150"/>{enterName ?
        <div className={styles.openBoard}>
          <input value={name} onChange={(e) => updateName(e.target.value)}></input>
          <button className={styles.addButton} onClick={newBoard}>Create</button>
        </div>
        : 
        <div className={styles.newBoard}><button className={styles.addButton} onClick={() => updateEnterName(true)}>+</button></div>}
        </div>
        
        </li>
        {   [...res].reverse().map(elem => {
      const dateURL = "/board/" + elem.listDate
      const dateString= new Date(elem.listDate);
      return <li key={uuidv4()}>
      <div className={styles.board}><Image priority="true" src="/Optimized-Screenshot_2021-04-30 Screenshot.webp" width="300" height="150"/><div>
        <span><Link href={dateURL}>{elem.listTitle|| dateString.toDateString()}</Link>
        
        {(userEmail===elem.email)?<button className={styles.delete} id={elem.listDate} onClick={deleteFromDb}>
   <svg height="100px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" >
                    <g id="_x37_7_Essential_Icons">
                        <path id="Trash" d="M81,23.5H61V17c0-1.1-0.9-2-2-2H41c-1.1,0-2,0.9-2,2v6.5H19c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h6.6V83
		c0,1.1,0.9,2,2,2h44.8c1.1,0,2-0.9,2-2V27.5H81c1.1,0,2-0.9,2-2C83,24.4,82.1,23.5,81,23.5z M43,19h14v4H43V19z M70.4,81H29.6V27.5
		h40.8V81z M61,38.3v32c0,1.1-0.9,2-2,2s-2-0.9-2-2v-32c0-1.1,0.9-2,2-2S61,37.1,61,38.3z M43,38.3v32c0,1.1-0.9,2-2,2s-2-0.9-2-2
		v-32c0-1.1,0.9-2,2-2S43,37.1,43,38.3z"/>
                    </g>
                    <g id="Guides">
                    </g>
                    <g id="Info">
                        <g id="BORDER">
                            <path fill="#0000FF" d="M1364-930V754H-420V-930H1364 M1372-938H-428V762h1800V-938L1372-938z" />
                        </g>
                    </g>
                </svg>
                </button>: null}
                
                </span></div></div>
      </li>
    }

    )}</ul>
     
    </main > :null}
    <ColorPicker />
  </>
  )
}

export async function getServerSideProps(ctx) {
  console.log(ctx.req.headers.host);
    const session = await getSession(ctx);
    if (session) {
      const url = "https://"+ctx.req.headers.host+ "/api/arrayOfBoards"
      const response = await fetch(url);
      const responseObj = await response.json();

      const periodRegex = /\./g;
        return {
          props: {
            serverRes: responseObj,
            serverUserEmail: session.user.email.replace(periodRegex, "")
          }
        }
      }
      else {
    
        return {
          props: {
            serverRes: [],
            serverUserEmail: "",
            serverURL:ctx.req.headers.host
          }
        }
      }
  
  
  
  
  
    }
  
  