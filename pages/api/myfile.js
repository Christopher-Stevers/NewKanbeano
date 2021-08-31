import { connectToDatabase } from "../../util/mongodb";
import { getSession } from 'next-auth/client'
import { getDomainLocale } from "next/dist/next-server/lib/router/router";

const { MONGO_COLLECTION } = process.env;
export default async (req, res) => {

    const session = await getSession({ req })

    const { db } = await connectToDatabase();
    const periodRegex=/\./g
    const userEmail=session.user.email.replace(periodRegex,"");
    console.log(session.user.email);
if(session.user.email==="christopher.stevers1@gmail.com"){

console.log(userEmail);
console.log("yeet");

 

    await db 
    .collection(MONGO_COLLECTION)
    .update({"email": session.user.email},
        
        {
            $set: {"email":  userEmail}
        }
        
        );
}
const arrayData=await db 
.collection(MONGO_COLLECTION)
.find()
.toArray();

const processMigration=(elem)=>{ 
    console.log("neeed to build"+elem._id);
    elem.email=elem.email.replace(periodRegex,"");
    console.log(elem.email);
    db.collection(process.env.MONGO_COLLECTION)
      .findOneAndUpdate({ _id: elem._id }, {
        $set: { email: elem.email.replace(periodRegex,"") }
      });

    const pointlessUsers=elem.users.map(celem=>celem.replace(periodRegex,""));
     
    db.collection(process.env.MONGO_COLLECTION)
    .findOneAndUpdate({ _id: elem._id }, {
      $set: { users: pointlessUsers }
    });
}

arrayData.forEach(processMigration);

        res.json(arrayData);

}