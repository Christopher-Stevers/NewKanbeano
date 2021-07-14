import styles from './card.module.scss';
import { useState, useContext } from 'react'
import CardContext from './cardContext'
import NewContext from '../components/newContext'
export default function Card(props) {
    let [newContext, updateNewContext] = useContext(NewContext);
    const [title, updateTitle] = useState(newContext[props.listIndex][props.index].title);
    const [content, updateContent] = useState(newContext[props.listIndex][props.index].content);
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
    const deleteCard=()=>{
        const clone=JSON.parse(JSON.stringify(newContext))
        const updatedContext=JSON.parse(JSON.stringify(clone.map((elem, index)=>{
            
            if(index===parseInt(props.listIndex)){
              return   elem.filter((nestedElem)=>{
                  return (nestedElem.id!==id)
            })
               
            }
            return elem;
          })))
         updateNewContext(updatedContext);

    }
   
    return (

        <div className={styles.card}>
           <div className={styles.cardTitle}> {(newContext[props.listIndex][props.index].editable) ? <input  className={styles.input} onChange={(e) => updateTitle(e.target.value)} value={title}></input> : <span className={styles.span}>{newContext[props.listIndex][props.index].title}</span>}
            
            <button className={styles.button}  onClick={modifyContext}>
            <svg className={styles.titleSvg} version="1.1"  x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" >
<metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
<g><path d="M811.9,24.6c0,0-32.8-32.8-65.7,0L75.8,695l-17.1,17.1l186.7,186.8l0,0l27.4,27.4l15.1,15.1l32.7-32.7l0,0l523.9-523.9l0,0l32.7-32.7l0,0l98.2-98.2c32.8-32.8,0-65.7,0-65.7L811.9,24.6z M287.7,875.7L124.2,712.2l523.9-524l163.5,163.5L287.7,875.7z M844.4,319.1L680.9,155.6l98.2-98.2l163.5,163.5L844.4,319.1z"/><path d="M73.3,926.6l34.5-165.4l-49.7-49.7L10,990l277.8-48.8l-15.1-15l-27.3-27.4L73.3,926.6z"/></g>
</svg>
                
                </button>
                <button className={styles.button}onClick={deleteCard}>
            <svg className={styles.deleteButton} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100px"
                    height="100px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" >
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

            </button></div>
            {newContext[props.listIndex][props.index].editable ? <textarea className={styles.textArea} onChange={(e) => updateContent(e.target.value)} value={content} ></textarea> :
                <div className={styles.content}>{newContext[props.listIndex][props.index].content}</div>
            }
            <div></div>
        </div>


    )
}