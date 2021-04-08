import styles from './card.module.scss';
import { useState, useContext} from 'react'
import CardContext from './cardContext'
export default function Card(props) {
    const [editable, updateEditable] = useState(false);
    
const cardContext=useContext(CardContext);
    const toggleState = (passed, updatePassed, e) => {
        if(passed){
           console.log(props);
           const newContext=cardContext[0][0].map(elem=>{
               console.log(elem.id+"ident");
               console.log(e.target.id+"target");
               if(elem.id===e.target.id){
                   console.log("yyet");
                   return {title: "heroku",
                   content: "whypeo is slow",
                   id: e.target.id};
                   
               }
               else{
                   return elem;
               }

           });
           console.log(newContext);
           cardContext[0][1](newContext);
        }
        passed ? updatePassed(false) : updatePassed(true);
    }

    const[title, updateTitle]=useState(props.title);
    const [content, updateContent]=useState(props.content);
    const saveCard=()=>{
cardContext[0][1]([{title: "heroku",
content: "Heroku is slow",
id: uuidv4()},
{title: "Vercel",
content: " Vercel built Nextjs",
id: uuidv4()},
{title: "Netlify",
content: "Netlify is staticito",
id: uuidv4()}]);}
    return (

        <div className={styles.card}>
            {(editable) ? <input onChange={(e)=>updateTitle(e.target.value)} value={title}></input> : <span>{title}</span>}
            {editable ? <input onChange={(e)=>updateContent(e.target.value)}  value={content} className={`${styles.content} ${styles.input}`}></input> :
             <div className={styles.content}>{content}</div>
            }
            <button id={props.id}  onClick={(e) => toggleState(editable, updateEditable, e)}></button>
            
        </div>


    )
}