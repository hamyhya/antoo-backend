const con = require("../../configs/database");

module.exports = async (data) => {
  const { otp } = data;
  const dataToSend = {
    otp,
  };
  const sql = `UPDATE users SET isVerified=1, otp=80808080 WHERE ?`;
  return new Promise((resolve, reject) => {
    con.query(sql, dataToSend, (err, res) => {
      if (err) reject(new Error("Internal server error"));
      if (res.affectedRows > 0) {
        resolve({ ...dataToSend });
      } else {
        resolve(false);
      }
    });
  });
};
