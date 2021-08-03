import { connectToDatabase } from "../../util/mongodb";
import { getSession } from 'next-auth/client'
export default async (req, res) => {
  const idNum= parseInt(req.query.listDate)
  const session = await getSession({ req })

  const { db } = await connectToDatabase();

 const deleteData=async()=>{
  
 const deleted=await db 
      .collection("kanbeano")
      .deleteOne({listDate:{$eq: idNum}});
      res.json(deleted.deletedCount)

 }

  const getData=async()=>{
const dutu=await db 
      .collection("kanbeano")
      .findOne({listDate: idNum});
      const isUserArrAuthed=dutu.users?dutu.users.reduce((accum, currentValue)=>{
        console.log(currentValue);
  if(currentValue===session.user.email){return true}
  if(accum===true){return true}
  else{return false;}

   }): false;
   console.log(isUserArrAuthed)
   if(dutu.email===session.user.email||isUserArrAuthed){ res.json(dutu)}
   else{res.json(JSON.stringify(["denied"]))}

 

  

    }
  

  const postData=async ()=> {
    //const clone=JSON.parse((JSON.parse(JSON.stringify(req.body))));
       const hitApi=db.collection("kanbeano")
        .findOneAndUpdate({listDate: idNum}, {
          $set: { data: JSON.parse(req.body) }
        });
         const hitted = await Promise.resolve(hitApi);
         console.log(hitted.ok);

        if(hitted.ok){
          console.log(200);
          res.status(200);
        res.json({status: 200})}
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