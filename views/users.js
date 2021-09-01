const router = require("express").Router();
const pool = require("./db");

// create a user
router.post("/", async (req, res) => {
  try {
    const { description } = req.body;
    const newuser = await pool.query(
      "insert into user(description) values($1) returning *;",
      [description]
    );
    res.send(newuser.rows[0]);
    console.log("New user created");
  } catch (err) {
    console.log(err.message);
  }
});
// get all users
router.get("/", async (req, res) => {
  try {
    const allusers = await pool.query("select * from user;");
    res.send(allusers.rows);
    console.log("GetAll Request");
  } catch (err) {
    console.log(err.message);
  }
});

// get a user
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query("select * from user where id=$1;", [id]);
    res.send(user.rows[0]);
    console.log("Get Request");
  } catch (err) {
    console.log(err.message);
  }
});

// update a user
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateduser = await pool.query(
      "update user set description=$1 where id=$2 returning *;",
      [description, id]
    );
    res.send(updateduser.rows[0]);
    console.log(`user ${id} updated`);
  } catch (err) {
    console.log(err.message);
  }
});

// delete a user
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteduser = await pool.query(
      "delete from user where id=$1 returning *;",
      [id]
    );
    res.send(deleteduser.rows[0]);
    console.log(`user ${id} deleted`);
  } catch (err) {
    console.log(err.message);
  }
});

// delete all users
router.delete("/", async (req, res) => {
  try {
    const deletedusers = await pool.query("delete from user returning *;");
    res.send(deletedusers.rows);
    console.log(`All users have been deleted.`);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
