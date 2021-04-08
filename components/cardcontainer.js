import { useContext } from "react"
import Card from './card'
import CardContext from './cardContext'
export default function CardContainer(){
const cardContext=useContext(CardContext);
return(
<div>
{cardContext[0][0].map(elem=>
    <Card title={elem.title} content={elem.content} id={elem.id}/>
)}

</div>

)
    
}