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
    con.query(sql, dataToSend, (queryError, insertedUser) => {
      if (queryError) reject(new Error("Failed to create user"));
      if (insertedUser.affectedRows > 0) {
        resolve({
          ...{ id: insertedUser.insertId },
          ...dataToSend,
        });
      } else reject(new Error("Failed to create user"));
    });
  });
};
