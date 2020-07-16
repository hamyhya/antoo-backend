const con = require("../../configs/database");

module.exports = async () => {
  const sql = `SELECT * FROM Banner`

  return new Promise((resolve, reject) => {
    con.query(sql, (err, res) => {
      if (err) reject(new Error("Internal Server Error"));
      else resolve(res);
    });
  });
}