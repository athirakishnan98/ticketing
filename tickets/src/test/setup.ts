import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";

declare global {
  // var signin: () => string[];
  var signin: (id?: string) => string[];
}
jest.mock("../nats-wrapper");

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = () => {
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };
  //create JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  //Build session object
  const session = { jwt: token };

  //Trun session into JSON
  const sessionJSON = JSON.stringify(session);

  //Encode JSON as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  //return a string - cookie with encoded data
  return [`session=${base64}`];
};
