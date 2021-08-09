import { connectToDatabase } from "../../util/mongodb";
import { getSession } from 'next-auth/client'
export default async (req, res) => {

    const idNum= parseInt(req.query.listDate)
    const session = await getSession({ req })
  
    const { db } = await connectToDatabase();
  
   
    const deleteData=async()=>{
  
        const deleted=await db 
             .collection("kanbeano")
             .deleteOne({listDate:{$eq: idNum},
               email: {$eq: session.user.email}});
             res.json(deleted.deletedCount)
       
        }

    const getData=async()=>{
    
    
    const arrayData=await db 
    .collection("kanbeano")
    .find({users: session.user.email})
    .toArray();
    res.json(arrayData);
    
        }
    const postData=async ()=> {
      }

    const putData=async()=>{
        db.collection("kanbeano").insertOne(JSON.parse(req.body))
      }
      
const execute=()=>{ switch(req.method){

    case "POST":
       postData();
       break;
    case "PUT":
       putData()
      break;
    case "DELETE":
      deleteData()
      break;
    default:
       getData()
    
    
    }}
    
    if(!session){ res.json({"message": "please authenticate"})}
    if(session){
      execute();}
}