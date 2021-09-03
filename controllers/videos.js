const pool = require("../db");

// Create a video
const createVideo = async (req, res) => {
  try {
    const { name, description, url } = req.body;
    const newVideo = await pool.query(
      "insert into Video(name, description, url) values($1, $2, $3) returning *;",
      [name, description, url]
    );
    res.send(newVideo.rows[0]);
    console.log("New video created");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get all videos with pagination(limit, offset)
const getVideos = async (req, res) => {
  try {
    //const {limit, offset} = req.query
    let limit = 5;
    let offset = 0;
    const allVideos = await pool.query(
      `select * from Video order by id limit ${limit} offset ${offset};`
    );
    res.send(allVideos.rows);
    console.log("GetVideos Request");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get a video
const getVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await pool.query("select * from Video where id=$1;", [id]);
    res.send(video.rows[0]);
    console.log("GetVideo Request");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update a video
const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, url } = req.body;
    const updatedVideo = await pool.query(
      "update Video set name=$1, description=$2, url=$3 where id=$4 returning *;",
      [name, description, url, id]
    );
    res.send(updatedVideo.rows[0]);
    console.log(`Video ${id} updated`);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete a video
const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVideo = await pool.query(
      "delete from Video where id=$1 returning *;",
      [id]
    );
    res.send(deletedVideo.rows[0]);
    console.log(`Video ${id} deleted`);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete all videos
const deleteVideos = async (req, res) => {
  try {
    const deletedVideos = await pool.query("delete from Video returning *;");
    res.send(deletedVideos.rows);
    console.log(`All videos have been deleted.`);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Add one or many tags to a video
const addVideoTags = async (req, res) => {
  try {
    const { id } = req.params;
    const { tags } = req.body;
    let videoTags = [];
    for (tag of tags) {
      let videoTag = await pool.query(
        "insert into Video_tag(video_id, tag_id) (select $1, id from Tag where value=$2) returning *;",
        [Number.parseInt(id), tag] // 'value'
      );
      videoTags.push(videoTag.rows[0]);
    }
    res.send(videoTags);
    console.log("AddVideoTags Request");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get all tags related to a video
const getVideoTags = async (req, res) => {
  try {
    const { id } = req.params;
    const videoTags = await pool.query(
      "select value from Tag where id in (select tag_id from Video_tag where video_id=$1);",
      [id]
    );
    res.send(videoTags.rows);
    console.log("GetVideoTags Request");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete one or many tags related to a video
const deleteVideoTags = async (req, res) => {
  try {
    const { id } = req.params;
    const { tags } = req.body;
    let videoTags = [];
    for (tag of tags) {
      let videoTag = await pool.query(
        "delete from Video_tag where video_id=$1 and tag_id in (select id from Tag where value=$2) returning *;",
        [Number.parseInt(id), tag] // 'value'
      );
      videoTags.push(videoTag.rows[0]);
    }
    res.send(videoTags);
    console.log("DeleteVideoTags Request");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  createVideo,
  getVideos,
  getVideo,
  addVideoTags,
  deleteVideoTags,
  getVideoTags,
  updateVideo,
  deleteVideo,
  deleteVideos,
};
