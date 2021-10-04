import { connectToDatabase } from "../../../util/mongodb";
import { getSession } from "next-auth/client";
const { MONGO_COLLECTION } = process.env;
export default async function GetBoard(req, session) {
  if (!session) {
    return JSON.stringify(["denied"]);
  }
  const idNum = parseInt(req.query.listDate);
  const { db } = await connectToDatabase();
  const periodRegex = /\./g;
  const userEmail = session.user.email.replace(periodRegex, "");
  const dutu = await db
    .collection(MONGO_COLLECTION)
    .findOne({ listDate: idNum });
  const isUserArrAuthed = dutu.users
    ? dutu.users.reduce((accum, currentValue) => {
        if (currentValue === userEmail) {
          return true;
        } else if (accum === userEmail) {
          return true;
        } else if (accum === true) {
          return true;
        } else {
          return false;
        }
      })
    : false;

  if (dutu.email === userEmail || isUserArrAuthed) {
    return dutu;
  } else {
    return JSON.stringify(["denied"]);
  }
}
