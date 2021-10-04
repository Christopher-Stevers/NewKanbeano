import { connectToDatabase } from "../../util/mongodb";
import { getSession } from "next-auth/client";
import GetBoard from "./components/getBoard";
const { MONGO_COLLECTION } = process.env;
export default async function BoardData(req, res){
  const idNum = parseInt(req.query.listDate);
  const session = await getSession({ req });

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
  const deleteData = async () => {
    if (userEmail === dutu.email) {
      const deleted = await db
        .collection(MONGO_COLLECTION)
        .deleteOne({ listDate: { $eq: idNum } });
      res.json(deleted.deletedCount);
    }
  };

  const getData = async () => {
    const data = await GetBoard(req, session);
    await res.json(data);
    //if (dutu.email === userEmail || isUserArrAuthed) { res.json(dutu) }
    //else { res.json(JSON.stringify(["denied"])) }
  };

  const postData = async () => {
    //const clone=JSON.parse((JSON.parse(JSON.stringify(req.body))));
    if (isUserArrAuthed) {
      const hitApi = db
        .collection(process.env.MONGO_COLLECTION)
        .findOneAndUpdate(
          { listDate: idNum },
          {
            $set: { data: JSON.parse(req.body) },
          }
        );
      const hitted = await Promise.resolve(hitApi);

      if (hitted.ok) {
        res.status(200);
        res.json({ status: 200 });
      }
    }
  };
  const putData = async () => {
    if (isUserArrAuthed)
      db.collection(process.env.MONGO_COLLECTION).insertOne(
        JSON.parse(req.body)
      );
  };

  const execute = () => {
    switch (req.method) {
      case "POST":
        postData();
        break;
      case "PUT":
        putData();
        break;
      case "DELETE":
        deleteData();
        break;
      default:
        getData();
    }
  };

  if (!session) {
    res.json({ message: "please authenticate" });
  }
  if (session) {
    execute();
  }
}
