const router = require("express").Router();
const {
  createTag,
  getTags,
  getTagVideos,
  deleteTag,
} = require("../controllers/tags");

// create a tag
router.post("/", createTag);

// get all tags
router.get("/", getTags);

// get all videos related to a tag
router.get("/:id/videos", getTagVideos);

// delete a tag
router.delete("/:id", deleteTag);

module.exports = router;
