
import styles from '../styles/Home.module.css'
import NewContext from '../components/newContext'
import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useState, useContext, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import CardContainer from '../components/indieContainer'
import { parse, v4 as uuidv4 } from 'uuid';
import Header from '../components/header'
import Link from 'next/link'
export default function Home() {
  const [session, loading] = useSession()
  const current = Date.now();
  const [loggedIn, updateLoggedIn] = useState(true);
  const [listArr, updateListArr] = useState([]);
  const [count, updateCount] = useState([current])
  const newContext = useContext(NewContext);
  const [domain, updateDomain] = useState("")
  const [res, updateRes] = useState([])
  const [enterName, updateEnterName] = useState(false)
  useEffect(() => {
    updateDomain(document.domain)
  }, [])
  useEffect(async () => {
    if (session) {
      const url = domain + "api/movies"
      const response = await fetch(url);
      const responseObj = await response.json()
      updateRes(responseObj)

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
  useEffect(() => { updateDomain(document.documentURI) }, []);
  const newBoard = async () => {
    updateName(username);
    const options = {
      method: 'PUT',
      body: JSON.stringify({
        data: [
        ],
        email: session.user.email,
        listTitle: name,
        listDate:current
      })

    }; 
    updateRes([...res,
    {
      email: session.user.email,
      listTitle: name,
      listDate:current
    }])


    const url = domain + "api/movies"
    const response = await fetch(url, options)
    const responseObj = await response.json();


  }/* */
  const [dbId, updateDbId] = useState("")
  const logger = async (e) => {
    e.preventDefault()
    const url = domain + "api/movies?name=" + name
    const response = await fetch(url)
    const responseObj = await response.json()
    if (responseObj.data) {
      updateLoggedIn(true)
      updateContextState(responseObj.data);


    }
    if (!responseObj.data) {
      updateSignUp(true)
    }
  }
  const grabName = (e) => {
    updateName(e.target.value)
  }
  const addList = () => {
    updateContextState(
      contextState.concat([[]]));

  }

  let [stateContext, updateStateContext] = useState([
  ]);
  const defaultContext = [stateContext, updateStateContext];

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
  }
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
  }
  const deleteFromDb = async (e) => {
    const options = {
      method: 'DELETE',
    };
    const url = domain + "api/movies?listDate=" + e.target.id
    const response = await fetch(url, options)
    const resObj=await response.json()
   console.log(resObj)
   if(resObj) { const timeArr = res.map(elem => elem.listDate.toString())
    const index = timeArr.indexOf(e.target.id)
    const newArr = [...res]
    newArr.splice(index, 1);
    updateRes(newArr)}


  }
  return (<><Header />
    < main className={styles.main} >


    </main ><h2>{JSON.stringify(session)} {loading}</h2><h3><ul>{res.map(elem => {
      const dateURL = "/board/" + elem.listDate
      return <li key={uuidv4()}><Link href={dateURL}>{document.domain + dateURL + elem.listTitle}</Link><button id={elem.listDate} onClick={deleteFromDb}>Delete</button></li>
    }

    )}</ul>
      {enterName ?
        <div>
          <input value={name} onChange={(e) => updateName(e.target.value)}></input>
          <button onClick={newBoard}>Create Board</button>
        </div>
        : 
        <button onClick={() => updateEnterName(true)}>New Board!</button>}
    </h3>
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