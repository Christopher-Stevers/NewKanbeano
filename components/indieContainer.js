//I copy pasted example code from git clone --single-branch --branch part-0-starting-point git@github.com:colbyfayock/my-final-space-characters.git in order to implement drag and drop functionality. Line 27, 28, 36 and parts of 53 to 57. 
//CardContainer


import { useContext, useState } from "react"
import Card from './card'
import styles from './cardContainer.module.scss'
import CardContext from './cardContext'
import NewContext from './newContext'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

import { v4 as uuidv4 } from 'uuid';
export default function CardContainer(props) {
    const [newContext, updateNewContext] = useContext(NewContext);
    const current = Date.now();
    const clone = JSON.parse(JSON.stringify(newContext))
    const [titleOpen, updateTitleOpen] = useState(false)
    const [title, updateTitle] = useState("")
    //coment




    const addObjectToContext = () => {


        const updatedContext = clone.map((elem, index) => {
            if (index === parseInt(props.i)) {
                return elem.concat({
                    title: "",
                    content: "",
                    id: current.toString(),
                    listIndex: props.i.toString(),
                    editable: true
                });
            }
            return elem;
        })
        updateNewContext(updatedContext);
        /* newContext[0][props.i][0][0].push(
         [cardVals, updateCardVals]
     )*/
    }
    const deleteList = () => {


        const updatedContext = clone.filter((elem, index) => {
            return (index !== props.i)
        })
        updateNewContext(updatedContext);


    }
    /*onDragEnd={handleOnDragEnd}*/
    const ownIndex = parseInt(props.i)
    const closeTitle = () => {
       if (!titleOpen) {updateTitleOpen(true)}
       if(titleOpen){
        const updatedContext = clone.map((elem, index) => {
            if (index === parseInt(props.i)) {
                return elem.map((elem, index) => {
                    if (index === 0) {
                        return {
                            title: title,
                            id: elem.id
                        }
                    }
                    return elem
                })
            }
            return elem;
        })
        updateNewContext(updatedContext);
        updateTitleOpen(false);

    }
    }
    return (
        <div className={styles.cardContainer}>
            <h2><div><button onClick={closeTitle}>open title</button> {titleOpen ? <div><input onChange={(e)=>updateTitle(e.target.value)} value={title}></input></div> : <h2>{newContext[ownIndex][0].title}</h2>}</div></h2>
            <Droppable droppableId={props.i.toString() } type="nestedList">
                {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                        {newContext[ownIndex].map((elem, index) => {
                            if (!index) { return  }
                            return <Draggable key={elem.id} draggableId={elem.id.toString()} index={index}>
                                {(provided) => (
                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}><div><Card index={index} title={elem.title}
                                        id={elem.id} content={elem.content} key={elem.id} editable={elem.editable} listIndex={props.i} /></div></li>
                                )}
                            </Draggable>
                        })}

                        {provided.placeholder}</ul>)}
            </Droppable>

            <button id={props.i} onClick={deleteList}>DeleteList</button>
            <button onClick={addObjectToContext} className={styles.add}>+</button>
        </div>

    )

}