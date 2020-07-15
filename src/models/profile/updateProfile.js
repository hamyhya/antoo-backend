const con = require("../../configs/database");

module.exports = async (data) => {
  const sql = `UPDATE user_details SET ? WHERE ?`;
  return new Promise((resolve, reject) => {
    con.query(sql, data, (err, res) => {
      if (err) reject(new Error("Internal server error"));
      if (res.affectedRows > 0) {
        resolve({ ...{ id: res.insertId }, ...data });
      }
    });
  });
};