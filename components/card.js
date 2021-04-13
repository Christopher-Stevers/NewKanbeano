import styles from './card.module.scss';
import { useState, useContext } from 'react'
import CardContext from './cardContext'
import { Droppable } from 'react-beautiful-dnd';
export default function Card(props) {
    const cardContext = useContext(CardContext);
    const [editable, updateEditable] = useState(props.editable);
    const [title, updateTitle] = useState(props.title);
    const [content, updateContent] = useState(props.content);
    const toggleState = (editable, updateEditable, e) => {
        if (editable) {
            const newContext = cardContext[0][0].map(elem => {
                if (elem.id === e.target.id) {
                    console.log("elem.id does equal e.target.id");
                    return {
                        title: title,
                        content: content,
                        id: e.target.id,
                        editable:  content&&title? false : true
                    };

                }
                else {
                console.log("elem.id does not equal e.target.id");
                    return elem;
                }

            });

            
            console.log(newContext);
            cardContext[0][1](newContext);
        }
        editable ? updateEditable(false) : updateEditable(true);
    }

    const saveCard = () => {
        cardContext[0][1]([{
            title: "heroku",
            content: "Heroku is slow",
            id: uuidv4()
        },
        {
            title: "Vercel",
            content: " Vercel built Nextjs",
            id: uuidv4()
        },
        {
            title: "Netlify",
            content: "Netlify is staticito",
            id: uuidv4()
        }]);
    }
    return (

        <div draggable="true" className={styles.card}>
            {(editable) ? <input onChange={(e) => updateTitle(e.target.value)} value={title}></input> : <span>{title}</span>}
            {editable ? <input onChange={(e) => updateContent(e.target.value)} value={content} className={`${styles.content} ${styles.input}`}></input> :
                <div className={styles.content}>{content}</div>
            }
            <button id={props.id} onClick={(e) => toggleState(editable, updateEditable, e)}></button>
        </div>


    )
}