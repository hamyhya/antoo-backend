const con = require("../../configs/database");

module.exports = (data) =>
  new Promise((resolve, reject) => {
    const { email_to, user_id, amount } = data;
    const sql1 = `SELECT * FROM users WHERE email=?`;
    const sql2 = `SELECT * FROM users WHERE id=?`;
    const sql3 = `INSERT INTO transactions SET ?`;
    const sql4 = `UPDATE users SET ? WHERE ?`;

    con.beginTransaction((beginTransactionError) => {
      if (beginTransactionError) {
        reject(new Error("Database error"));
      } else {
        con.query(sql1, [email_to], (queryError1, userTo) => {
          if (queryError1) {
            con.rollback((rollbackError) => {
              if (rollbackError) reject(rollbackError.message);
              else reject(new Error("Database error [Error get user to data]"));
            });
          } else {
            if (userTo.length > 0) {
              con.query(sql2, [user_id], (queryError2, userFrom) => {
                if (queryError2) {
                  con.rollback((rollbackError) => {
                    if (rollbackError) reject(rollbackError.message);
                    else
                      reject(
                        new Error("Database error [Error get user from data]")
                      );
                  });
                } else {
                  if (userFrom.length > 0) {
                    con.query();
                  } else {
                    con.rollback((rollbackError) => {
                      if (rollbackError) reject(rollbackError.message);
                      else
                        reject(
                          new Error(
                            "Database error [data user id is not valid]"
                          )
                        );
                    });
                  }
                }
              });
            } else {
              con.rollback((rollbackError) => {
                if (rollbackError) reject(rollbackError.message);
                else
                  reject(new Error("Database error [data email is not valid]"));
              });
            }
          }
        });
      }
    });
  });
