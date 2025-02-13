import express from "express";
import { currentUser } from "@akrtickets/common";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };
