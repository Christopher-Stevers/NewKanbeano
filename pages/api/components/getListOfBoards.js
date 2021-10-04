
import { connectToDatabase } from "../../../util/mongodb";
import { getSession } from 'next-auth/client'

const { MONGO_COLLECTION } = process.env;
export default async function GetListOfBoards(req, session) {


    const idNum = parseInt(req.query.listDate)
    const periodRegex = /\./g
    const userEmail = session.user.email.replace(periodRegex, "");
    const { db } = await connectToDatabase();

    const arrayData = await db
        .collection(MONGO_COLLECTION)
        .find({ users: userEmail })
        .toArray();
    return arrayData;


}