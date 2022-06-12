import path from "path";
import fs from "fs";
import { MongoClient } from "mongodb";
import { hashSingleImage } from "./photoHaseService.js";

const databaseName = "WebAdvertisements";
const DATABASE_URL = "mongodb://localhost:27017";
const collectionName = "Ads";

let client;
let db;

const __dirname = path.resolve();

class massage {
  constructor() {
    client = new MongoClient(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async getAllMessages() {
    let message;
    try {
      await client.connect();
      db = await client.db(databaseName);
      message = this.getMessagesRequest();
    } catch (e) {
      console.error(e);
    } finally {
      return message;
    }
  }

  async initializeMessage() {
    try {
      await client.connect();
      db = await client.db(databaseName);
      await db.dropDatabase();
      let rawData = fs.readFileSync("data.json");
      let message = JSON.parse(rawData);
      this.addHashedImages(message);
      await db.collection(collectionName).insertMany(message);
      console.log(`connect to mongoDB with name ${databaseName}`);
      return message;
    } catch (error) {
      console.log(error.message);
    }
  }

  addHashedImages(message) {
    // message.forEach((m) => {
    //   m["photoHash"] = [];
    //   m.images.forEach((img) => {
    //     m["photoHash"].push(hashSingleImage(img));
    //   });
    // });
  }

  async getMessagesRequest() {
    let cursor = db.collection(collectionName).find({});
    let messagesPromise = await new Promise((resolve) =>
      cursor.toArray(function (err, items) {
        if (err) {
          throw err;
        } else {
          resolve(items);
        }
      })
    );
    return messagesPromise;
  }
}

export default massage;
