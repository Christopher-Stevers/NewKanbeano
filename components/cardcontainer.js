//I copy pasted example code from git clone --single-branch --branch part-0-starting-point git@github.com:colbyfayock/my-final-space-characters.git in order to implement drag and drop functionality. Line 27, 28, 36 and parts of 53 to 57. 



import { useContext, useState } from "react"
import Card from './card'
import styles from './cardContainer.module.scss'
import CardContext from './cardContext'
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
export default function CardContainer(props) {
    
    const cardContext = useContext(CardContext);
    const current = Date.now();
    const [propslist, updatePropsList] = useState([]);
    const [count, updateCounter] = useState(props.list);
    const newElems = "";
        
        function handleOnDragEnd(result){
            const clone = cardContext[0][0].map(elem  => { 
                let newObj={};
                for(const prop in elem){
                    newObj[prop]=elem[prop];

            }
        return newObj;
        });
    const [reorderedItem] = clone.splice(result.source.index, 1);
    clone.splice(result.destination.index, 0, reorderedItem);
            console.log("yeet")
            cardContext[0][1](clone
              

            )
            updatePropsList(clone);
            updateCounter(count + 1);
            return ;
        }

    const addObjectToContext = () => {
        cardContext[0][0].push({
            title: "",
            content: "",

            id: current+"github",
            editable: true
        }

        );
         updatePropsList(props.list) 
        updateCounter(count + 1);
    }
    return (
        <div className={styles.cardContainer}><DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="tasks">

                {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {cardContext[0][0].map((elem, index) =>
                    <Draggable key={elem.id} draggableId={elem.id} index={index}>
                        {(provided) => (
                        <li  ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}><div><Card title={elem.title} id={elem.id} content={elem.content} key={elem.id} editable={elem.editable} /></div></li>
                    )}
                    </Draggable>)}
                
                {provided.placeholder}</ul>)}
            </Droppable>
        </DragDropContext>
            <button onClick={addObjectToContext} className={styles.add}>+</button>
        </div>

    )

}