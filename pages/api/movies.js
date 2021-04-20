//This file was modified from npx create-next-app --example with-mongodb mflix

import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {

  const { db } = await connectToDatabase();
  const nameObj = req.query

  const movies = await db

    .collection("kanbeano")
    .findOne(nameObj);
    res.json(movies)
  

  if (req.method === "POST") {
    //const clone=JSON.parse((JSON.parse(JSON.stringify(req.body))));
    console.log(req)
      / db.collection("kanbeano")
        .findOneAndUpdate(nameObj, {
          $set: { data: JSON.parse(req.body) }

        })


  }
  if (req.method === "PUT") {
    const anything = await db

      .collection("kanbeano")

      .findOne(nameObj);

    if (anything.data==="") {
      db.collection("kanbeano").insertOne(
        {
          "data": [
          ],
          "name": nameObj.name
        }
      )
      console.log("thanks")
      res.json({"message": "Thank you for joining Kanbeano!"})
    }
    if (anything.data) {
      res.json({"message": "This username is already taken."})
    }
  }
};