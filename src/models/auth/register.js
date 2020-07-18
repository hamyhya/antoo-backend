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
  const sql2 = `INSERT INTO user_details SET ?`;
  return new Promise((resolve, reject) => {
    con.beginTransaction((beginTransactionError) => {
      if (beginTransactionError) {
        reject(new Error("transaction is failed"));
      } else {
        con.query(sql, dataToSend, (queryError, insertedUser) => {
          if (queryError) {
            con.rollback((rollbackError) => {
              if (rollbackError) reject(new Error("error create user"));
              else reject(new Error("error create user"));
            });
          } else {
            if (insertedUser.affectedRows > 0) {
              con.query(
                sql2,
                {
                  user_id: insertedUser.insertId,
                  full_name: "Yourname",
                  phone_number: "00000000",
                  image: "me.png",
                },
                (queryError2, userDetailCreated) => {
                  if (queryError2) {
                    con.rollback((rollbackError) => {
                      if (rollbackError)
                        reject(new Error("error create detail user"));
                      else reject(new Error("error create detail user"));
                    });
                  } else {
                    if (userDetailCreated.affectedRows > 0) {
                      con.commit((commitErr) => {
                        if (commitErr) {
                          reject(new Error("error commit update user"));
                        } else {
                          resolve({
                            ...{ id: insertedUser.insertId },
                            ...dataToSend,
                          });
                        }
                      });
                    } else {
                      con.rollback((rollbackError) => {
                        if (rollbackError)
                          reject(new Error("error create detail user"));
                        else reject(new Error("error create detail user"));
                      });
                    }
                  }
                }
              );
            } else {
              con.rollback((rollbackError) => {
                if (rollbackError) reject(new Error("error create user"));
                else reject(new Error("error create user"));
              });
            }
          }
        });
      }
    });
  });
};
