import styles from './card.module.scss';
import { useState, useContext } from 'react'
import CardContext from './cardContext'
import NewContext from '../components/newContext'
export default function Card(props) {
    let [newContext, updateNewContext] = useContext(NewContext);
    const [title, updateTitle] = useState(newContext[props.listIndex][props.index].title);
    const [content, updateContent] = useState("");
    const id=newContext[props.listIndex][props.index].id;
    const modifyContext=(e)=>{
        const clone=JSON.parse(JSON.stringify(newContext))
        const updatedContext=JSON.parse(JSON.stringify(clone.map((elem, index)=>{
            
            if(index===parseInt(props.listIndex)){
              return   elem.map((nestedElem)=>{
                    if(nestedElem.id===id){
                      return {
                         title: title,
                         content: content,
                         id: nestedElem.id,
                         editable: 
(newContext[props.listIndex][props.index].editable)?false : true
                      }



                }
            return nestedElem
            })
               
            }
            return elem;
          })))
         updateNewContext(updatedContext);
    }
    const toggleState = (editable, updateEditable, e) => {
        if (editable) {
           const tempContext = {
                title: title,
                content: content,
                id:  "github",
                editable: false


            }
          
        }
        editable ? updateEditable(false) : updateEditable(true);
    }
   
    return (

        <div className={styles.card}>
            {(newContext[props.listIndex][props.index].editable) ? <input  onChange={(e) => updateTitle(e.target.value)} value={title}></input> : <span>{newContext[props.listIndex][props.index].title}</span>}
            {newContext[props.listIndex][props.index].editable ? <input  onChange={(e) => updateContent(e.target.value)} value={content} className={`${styles.content} ${styles.input}`}></input> :
                <div className={styles.content}>{newContext[props.listIndex][props.index].content}</div>
            }
            <button  onClick={modifyContext}></button>
            <div></div>
        </div>


    )
}