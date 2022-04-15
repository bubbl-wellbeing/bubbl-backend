const mongoose = require("mongoose");
const multer = require("multer");
const { Readable } = require("stream");

// Get track
const getTrack = async (req, res) => {
  try {
    var trackID = await new mongoose.mongo.ObjectID(req.params.trackID);
  } catch (err) {
    return res.status(400).json({
      message: `Invalid trackID in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters`,
      error: `${err}`,
    });
  }
  res.set("content-type", "audio/mp3");
  res.set("accept-ranges", "bytes");

  const { db } = mongoose.connection;
  const bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "tracks",
  });

  let downloadStream = bucket.openDownloadStream(trackID);

  downloadStream.on("data", (chunk) => {
    res.write(chunk);
  });

  downloadStream.on("error", () => {
    res.sendStatus(404);
  });

  downloadStream.on("end", () => {
    res.end();
  });
};

// Create track
const setTrack = async (req, res) => {
  const storage = multer.memoryStorage();
  const upload = multer({
    storage: storage,
    limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 },
  });
  await upload.single("track")(req, res, (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Upload Request Validation Failed", error: `${err}` });
    } else if (!req.body.name) {
      return res.status(400).json({ message: "No track name in request body" });
    }

    let trackName = req.body.name;

    const readableTrackStream = new Readable();
    readableTrackStream.push(req.file.buffer);
    readableTrackStream.push(null);

    const { db } = mongoose.connection;
    const bucket = new mongoose.mongo.GridFSBucket(db, {
      bucketName: "tracks",
    });

    let uploadStream = bucket.openUploadStream(trackName);
    let id = uploadStream.id;
    readableTrackStream.pipe(uploadStream);

    uploadStream.on("error", () => {
      return res.status(500).json({ message: "Error uploading file" });
    });

    uploadStream.on("finish", () => {
      return res.status(201).json({
        message:
          "File uploaded successfully, stored under Mongo ObjectID: " + id,
      });
    });
  });
};

module.exports = { getTrack, setTrack };
