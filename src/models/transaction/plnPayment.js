const con = require("../../configs/database");

module.exports = (data) =>
  new Promise((resolve, reject) => {
    const { user_id, amount, tokenPln } = data;
    const sql1 = `SELECT * FROM users WHERE id=?`;
    const sql2 = `INSERT INTO transactions SET ?`;
    const sql3 = `UPDATE users SET ? WHERE ?`;
    const type_id = 3;

    con.beginTransaction((beginTransactionError) => {
      if (beginTransactionError) reject(new Error("begin transaction error"));
      else {
        con.query(sql1, [user_id], (queryError, selectedUser) => {
          if (queryError) {
            con.rollback(() => {
              reject(new Error("can't get user"));
            });
          } else {
            if (selectedUser.length > 0) {
              con.query(
                sql2,
                { user_id, type_id, amount: amount * -1, concerned: tokenPln },
                (queryError2, transactionCreated) => {
                  if (queryError2) {
                    con.rollback(() => {
                      reject(new Error("can't create transaction"));
                    });
                  } else {
                    if (transactionCreated.affectedRows > 0) {
                      con.query(
                        sql3,
                        [
                          { balance: selectedUser[0].balance - amount },
                          { id: user_id },
                        ],
                        (queryError3, updatedUser) => {
                          if (queryError3) {
                            con.rollback(() => {
                              reject(new Error("can't update user"));
                            });
                          } else {
                            if (updatedUser.affectedRows > 0) {
                              con.commit((commitErr) => {
                                delete selectedUser[0].password;
                                delete selectedUser[0].otp;
                                delete selectedUser[0].isVerified;
                                resolve({
                                  ...selectedUser[0],
                                  ...{
                                    balance: selectedUser[0].balance - amount,
                                  },
                                  amount,
                                  tokenPln,
                                });
                                if (commitErr)
                                  reject(new Error("can't commit request"));
                                else resolve();
                              });
                            } else {
                              con.rollback(() => {
                                reject(new Error("can't update user"));
                              });
                            }
                          }
                        }
                      );
                    } else {
                      con.rollback(() => {
                        reject(new Error("can't create transaction"));
                      });
                    }
                  }
                }
              );
            } else {
              con.rollback(() => {
                reject(new Error("can't get user"));
              });
            }
          }
        });
      }
    });
  });
