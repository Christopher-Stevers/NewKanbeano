import { connectToDatabase } from "../../util/mongodb";
import { getSession } from 'next-auth/client'
const { MONGO_COLLECTION } = process.env;
export default async (req, res) => {
   console.log(req);
    const idNum = parseInt(req.query.listDate)
    const session = await getSession({ req })

    const { db } = await connectToDatabase();

    const periodRegex = /\./g;
    console.log(req);
    const body=JSON.parse(req.body);
    console.log(body);
    const userEmail = session.user.email.replace(periodRegex, "");
    
    const otherEmail=body.email.replace(periodRegex, "");
    const dutu = await db
        .collection(MONGO_COLLECTION)
        .findOne({ listDate: idNum });
    /*const isUserArrAuthed = dutu.users ? dutu.users.reduce((accum, currentValue) => {
        

        if (currentValue === userEmail) { return true }

        else if (accum === userEmail) { return true }
        else if (accum === true) { return true }
        else { return false; }

    }) : false;*/
 if (dutu.users.indexOf(otherEmail)=== -1){
    const ditu = await db
        .collection(MONGO_COLLECTION)
        .findOneAndUpdate({ listDate: idNum }, {
            $push: {
                users: otherEmail
            }
        });
        if (ditu.ok===1){}
 res.status(200).json({result:"success"});
 }
 else{ res.status(200).json({result:"already"})}
}