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
  const router = useRouter()
  const { id } = router.query
  const ogDate=new Date(parseInt(id)).toDateString();
  const current = Date.now();
  const newContext = useContext(NewContext);
  const [contextState, updateContextState] = useState(
    [
    ])
    const [isInvite, updateIsInvite]=useState(false);
    const [email, updateEmail]=useState("");
  const [auth, updateAuth] = useState(true)
  const [h2, updateH2]=useState("")
  const [placeCard, updatePlaceCard]=useState("");
  const [success, updateSuccess] =useState(false);
  const formatDate=(input)=>{ 
    const dateRegex= /([A-z]{3})(.{5})(\d+)(.{5})/;
    return input.replace(dateRegex, "$1, $2 $3, $4");
}
const [text, updateText]=useState("");
  useEffect(async () => {
    if (true){
      
    //const url = "/" + "api/movies?listDate=" + router.query.id
   // const response = await fetch(url)
    const responseObj = {"_id":{"$oid":"60fc42ec60890a0008c13a6c"},"data":[[{"title":"Soul Runner","id":1627291456546},{"title":"Add multi user","content":"","dueDate":1628640000000,"colour":"var(--casual-code)","id":"1627388257441","editable":false}],[{"title":"Kanbeano","id":1627291459259},{"title":"Research task app ux","content":"","dueDate":1627948800000,"colour":" var(--urgent-code) ","id":"1627388282348","editable":false},{"title":"Make all pages standards compliant","content":"","dueDate":1629763200000,"id":"1628550072550","editable":false},{"title":"MoF's suggestions.","content":"so, numbers/crt no, and colour coding for status (green/red/ blue/yellow )\n","dueDate":1627948800000,"id":"1628794311883","editable":false}],[{"title":"WP-Calypso","id":1627291469419},{"title":"Find new Issue","content":"","id":"1627291647320","editable":false},{"title":"Connect with maintainers","content":"","id":"1627291657486","editable":false},{"title":"Apply for jobs","content":"","colour":"var(--header-background-color)","id":"1627291665429","editable":false}],[{"title":"Applications","id":1627291472411},{"title":"Indeed","content":"","id":"1627388353080","editable":false}],[{"title":"Other Projects","id":1627291471268},{"title":"Stock charts.","content":"Simplify ui.","id":"1627291676430","editable":false}]],"email":"christopherstevers1@gmailcom","listTitle":"Projects","listDate":1627144937292,"users":["christopherstevers1@gmailcom","yel,owdawg@gmailcom","geodsawgling@emailcom","geodsawglinmarglg@emailcom","helf@inglegmailcom","elf@inglecom","lando@inglecom","landingo@inglecom","ladorlge@gmailcom","martinee@gmailcom","martiinglee@gmailcom","martiingleeadke@gmailcom","asdfkjsafe@gmailcom","asdfkjssdfsdfaafe@gmailcom","asdfkjsmaryfsdfaafe@gmailcom","asdfkjsmafaafe@gmailcom","home@gmailcom","himmee@gmailcom"]}
    if (typeof responseObj[0] === 'string') {
      updateAuth(false)
    }
    else {
      updateAuth(true)
      updateContextState(responseObj.data)
      updateH2(responseObj.listTitle)
      updatePlaceCard(true)
    }}
  }, []);

  // If no session exists, display access denied message
  

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
  const inviteMember=()=>{
    isInvite? updateIsInvite(false): updateIsInvite(true);

  }
  const addMember=async(e)=>{
    e.preventDefault();
    console.log("yeet");
    const options={
    method: 'POST',
    body: JSON.stringify({email: email})
    }
    const addURL="/api/adduser?listDate=" + router.query.id;
    console.log(addURL)
    
    const response = await fetch(addURL, options);
    const responseObj = await response.json()
    const { result }=responseObj;
    if(response.status===200){
    if(result==="already"){
      updateText(`${email} is already a member.`);
    }
    else if(result==="success"){
     updateText( `${email} has been added to this board.`);
    }
    else if(result==="failiure"){
      updateText("Sorry, an error occured.")
    }
      updateIsInvite(false);
     updateSuccess(true);
     setTimeout(function(){ updateSuccess(false); }, 3000);
    }
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
        <div className={styles.listHeader}><h2 className={styles.h2}>{h2}</h2>
        
        {isInvite?<div onClick={()=>updateIsInvite(false)} className={styles.overlayGrid}><form onClick={(e)=>e.stopPropagation()} className={styles.addModal}>
       <span>  <label >New members' email</label> <input onChange={(e)=>updateEmail(e.target.value)} placeholder="email@provider.com" type="email" value={email} onChange={(e)=>{updateEmail(e.target.value)}}></input></span>  
               <button type="submit" onClick={addMember}>Invite Member</button></form></div>:<button onClick={inviteMember} className={styles.invite}>

<svg className={styles.user} version="1.1"  x="0px" y="0px" width="100px"
	 height="100px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" >
<g id="_x37_7_Essential_Icons">
	<path id="Users" d="M78.2,58.2C81.1,55.8,83,52.1,83,48c0-6.9-5.6-13-12-13s-12,6.1-12,13c0,4.1,1.9,7.8,4.8,10.2
		c-1.3,0.5-2.5,1-3.7,1.7c-3.8-4.5-8.8-8-14.6-9.7C49.9,47.1,53,41.8,53,36c0-9.1-7.5-17-16-17c-8.5,0-16,7.9-16,17
		c0,5.8,3.1,11.1,7.5,14.2C16.1,53.9,7,65.4,7,79c0,1.1,0.9,2,2,2h82c1.1,0,2-0.9,2-2C93,69.4,86.8,61.2,78.2,58.2z M63,48
		c0-4.2,3.5-9,8-9c4.5,0,8,4.8,8,9c0,4.2-3.5,9-8,9C66.5,57,63,52.2,63,48z M25,36c0-6.1,5.1-13,12-13c6.9,0,12,6.9,12,13
		s-5.1,13-12,13C30.1,49,25,42.1,25,36z M11.1,77c1-13.4,12.3-24,25.9-24c13.7,0,24.9,10.6,25.9,24H11.1z M66.9,77
		c-0.3-5-1.9-9.8-4.5-13.8C65,61.8,67.9,61,71,61c9.3,0,16.9,7,17.9,16H66.9z"/><span>+</span>
</g>
<g id="Guides">
</g>
<g id="Info">
	<g id="BORDER">
		<path fill="#0000FF" d="M1084-790V894H-700V-790H1084 M1092-798H-708V902h1800V-798L1092-798z"/>
	</g>
</g>
</svg><span>+</span>
</button>}
{success? <div className={styles.emailAdded}>{text}</div>: null }
        
        <span className={styles.date}> Created <time>{formatDate(ogDate)}</time></span>
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
