import { connectToDatabase } from "../../../util/mongodb";

const { MONGO_COLLECTION } = process.env;
export default async function GetListOfBoards(req, session) {
  const periodRegex = /\./g;
  const userEmail = session.user.email.replace(periodRegex, "");
  const { db } = await connectToDatabase();

  const arrayData = await db
    .collection(MONGO_COLLECTION)
    .find({ users: userEmail })
    .toArray();
  return arrayData;
}
