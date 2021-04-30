import { connectToDatabase } from "../../util/mongodb";
import { getSession } from 'next-auth/client'
export default async (req, res) => {
  const idNum= parseInt(req.query.listDate)
  const session = await getSession({ req })

  const { db } = await connectToDatabase();
  const nameObj = req.query


 const deleteData=async()=>{
  
 const deleted=await db 
      .collection("kanbeano")
      .deleteOne({listDate:{$eq: idNum}});
      res.json(deleted.deletedCount)

 }

  const getData=async()=>{
    if(req.query.listDate){
const dutu=await db 
      .collection("kanbeano")
      .findOne({listDate: idNum});
//if(dutu.email!==session.user.email){res.json({message: "access denied"})
  
   // }
   if(dutu.email===session.user.email){ res.json(dutu)}
   else{res.json(JSON.stringify(["denied"]))}
 }

    else{const dutu=await db 
    .collection("kanbeano")
    .find({email: session.user.email})
.toArray();
res.json(dutu)};
    }
  

  const postData=async ()=> {
    //const clone=JSON.parse((JSON.parse(JSON.stringify(req.body))));
       db.collection("kanbeano")
        .findOneAndUpdate({listDate: idNum}, {
          $set: { data: JSON.parse(req.body) }
        })
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
};