const con = require("../../configs/database");

module.exports = async (data = null) => {
  let sql = `SELECT users.id as id,
                    users.email as email,
                    user_details.full_name as full_name,
                    user_details.image as image,
                    user_details.phone_number as phone_number
                    FROM users INNER JOIN user_details ON users.id = user_details.user_id `

  return new Promise((resolve, reject) => {
    if (data) {
      sql += `WHERE ?`
      db.query(sql, data, (err, res) => {
        if (err) reject(new Error("Internal Server Error"));
        else resolve(res);
      });
    } else {
      db.query(sql, (err, res) => {
        if (err) reject(new Error("Internal Server Error"));
        else resolve(res);
      });
    }
  });
}