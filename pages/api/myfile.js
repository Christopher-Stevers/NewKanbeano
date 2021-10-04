import { connectToDatabase } from "../../util/mongodb";
import { getSession } from "next-auth/client";
import { getDomainLocale } from "next/dist/next-server/lib/router/router";

const { MONGO_COLLECTION } = process.env;
export default async (req, res) => {
  res.json({ message: "api endpoint deprecated" });
  /*
    const session = await getSession({ req })

    const { db } = await connectToDatabase();
    const periodRegex=/\./g
    const userEmail=session.user.email.replace(periodRegex,"");
if(session.user.email==="christopher.stevers1@gmail.com"){


 

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
    elem.email=elem.email.replace(periodRegex,"");
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
*/
};
