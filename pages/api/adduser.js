import { connectToDatabase } from "../../util/mongodb";
import { getSession } from "next-auth/client";
const { MONGO_COLLECTION } = process.env;
export default async function BoardList  (req, res) {
  const idNum = parseInt(req.query.listDate);
  const session = await getSession({ req });

  const { db } = await connectToDatabase();

  const periodRegex = /\./g;
  const body = JSON.parse(req.body);
  if (body.email) {
    const dutu = await db
      .collection(MONGO_COLLECTION)
      .findOne({ listDate: idNum });
    const userEmail = session.user.email.replace(periodRegex, "");
    const dbEmail = dutu.email.replace(periodRegex, "");
    const otherEmail = body.email.replace(periodRegex, "");
    const isEmailAuthed = userEmail === dbEmail;

    if (isEmailAuthed) {
      if (dutu.users.indexOf(otherEmail) === -1) {
        const ditu = await db.collection(MONGO_COLLECTION).findOneAndUpdate(
          { listDate: idNum },
          {
            $push: {
              users: otherEmail,
            },
          }
        );
        if (ditu.ok === 1) {
          res.status(200).json({ result: "success" });
        } else {
          res.status(200).json({ result: "failiure" });
        }
      } else {
        res.status(200).json({ result: "already" });
      }
    } else {
      res.status(403).json({ result: "forbidden" });
    }
  } else {
    res.status(401).json({ result: "please authenticate" });
  }
}
