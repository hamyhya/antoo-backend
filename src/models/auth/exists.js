const con = require("../../configs/database");

module.exports = async (field) => {
  const sql = `SELECT * FROM users WHERE ?`;
  return new Promise((resolve, reject) => {
    con.query(sql, field, (err, res) => {
      if (err) reject(new Error("database error"));
      else if (res.length > 1) resolve(res);
      else if (res.length > 0) resolve(res[0]);
      else resolve(false);
    });
  });
};
