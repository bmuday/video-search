const router = require("express").Router();
const {
  createVideo,
  getVideos,
  getVideo,
  updateVideo,
  deleteVideo,
  deleteVideos,
  addVideoTags,
  getVideoTags,
  deleteVideoTags,
} = require("../controllers/videos");

// create a video
router.post("/", createVideo);

/* // get all videos with pagination
//TODO: redirection by default -> /?limit=&offset=
require("dotenv").config();
const PORT = process.env.server_port;
const limit = 5;
const offset = 0;
router.get("/", (req, res) => {
  res.redirect(
    `http://localhost:${PORT}/api/videos/?limit=${limit}&offset=${offset}`
  );
}); */

// get all videos with pagination
router.get("/", getVideos);

// get a video
router.get("/:id", getVideo);

// add one or many tags to a video
router.post("/:id/tags", addVideoTags);

// delete one or many tags related to a video
router.delete("/:id/tags", deleteVideoTags);

// get all tags related to a video
router.get("/:id/tags", getVideoTags);

// update a video
router.patch("/:id", updateVideo);

// delete a video
router.delete("/:id", deleteVideo);

// delete all videos
router.delete("/", deleteVideos);

module.exports = router;
