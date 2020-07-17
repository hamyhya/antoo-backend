const con = require("../../configs/database");

module.exports = async (data) => {
  let sql = `SELECT users.id as id,
                    users.email as email,
                    user_details.full_name as full_name,
                    user_details.image as image,
                    user_details.phone_number as phone_number
                    FROM users INNER JOIN user_details ON users.id = user_details.user_id 
                    WHERE users.id=${data.id}`

  return new Promise((resolve, reject) => {
    con.query(sql, (err, res) => {
      console.log(err)
      console.log(res)
      if (err) reject(new Error("Internal Server Error"));
      if (res.length < 1) reject(new Error(`User id.${data.id}, not Found`));
      else resolve(res);
    });
  });
}