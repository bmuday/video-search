const pool = require("../db");

// Create a tag
const createTag = async (req, res) => {
  const { value } = req.body;
  const newTag = await pool.query(
    "insert into Tag(value) values($1) returning *;",
    [value]
  );
  res.send(newTag.rows[0]);
  console.log("New tag created");
};

// Get all tags
const getTags = async (req, res) => {
  try {
    const allTags = await pool.query("select * from Tag;");
    res.send(allTags.rows);
    console.log("GetTags Request");
  } catch (err) {
    console.log(err.message);
  }
};

// Get all videos related to a tag
const getTagVideos = async (req, res) => {
  try {
    const { id } = req.params;
    const TagVideos = await pool.query(
      "select name from Video where id in (select video_id from Video_tag where tag_id=$1);",
      [id]
    );
    res.send(TagVideos.rows);
    console.log("GetTagVideos Request");
  } catch (err) {
    console.log(err.message);
  }
};

// Delete a tag
const deleteTag = async (req, res) => {
  const { id } = req.params;
  const deletedTag = await pool.query(
    "delete from Tag where id=$1 returning *   ",
    [id]
  );
  res.send(deletedTag.rows[0]);
  console.log(`Tag ${id} deleted`);
};

module.exports = {
  createTag,
  getTags,
  getTagVideos,
  deleteTag,
};
