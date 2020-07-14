const con = require("../../configs/database");

module.exports = async (data) => {
  const { email, password, otp } = data;
  const dataToSend = {
    email,
    password,
    otp,
    balance: 0,
    isVerified: false,
  };
  const sql = `INSERT INTO users SET ?`;
  return new Promise((resolve, reject) => {
    con.query(sql, dataToSend, (err, res) => {
      if (err) reject(new Error("Internal server error"));
      if (res.affectedRows > 0) {
        resolve({ ...{ id: res.insertId }, ...dataToSend });
      }
    });
  });
};
