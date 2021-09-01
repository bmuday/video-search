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

// get all videos
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
