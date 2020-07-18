const con = require("../../configs/database");

module.exports = {
  getPromos: async (data) => {
    let sql = "SELECT * FROM banner "

    if (data.search !== '' && data.search) {
      sql += `WHERE title LIKE '%${data.search}%' `
    }
    if (data.sort) {
      sql += `ORDER BY id ASC`
    } else {
      sql += `ORDER BY id DESC`
    }

    return new Promise((resolve, reject) => {
      con.query(sql, (err, res) => {
        if (err) reject(new Error("Internal Server Error"));
        if (res.length < 1) reject(new Error("Promo data empty"));
        else resolve(res);
      });
    });
  },
  getPromoCount: async (data) => {
    const sql = "SELECT COUNT(*) as count FROM banner "

    if (data.search !== '' && data.search) {
      sql += `WHERE title LIKE '%${data.search}%' `
    }

    return new Promise((resolve, reject) => {
      con.query(sql, (err, res) => {
        if (err) reject(new Error("Internal Server Error"));
        if (res[0].count < 1) reject(new Error("Promo data Empty"));
        else resolve(res[0].count);
      });
    });
  },
  getPromoById: async (data) => {
    const sql = "SELECT * FROM banner WHERE ?"

    return new Promise((resolve, reject) => {
      con.query(sql, data, (err, res) => {
        if (err) reject(new Error("Internal Server Error"));
        if (res.length < 1) reject(new Error("Promo Not Found"));
        else resolve(res);
      });
    });
  },
  createPromo: async (data) => {
    const sql = "INSERT INTO banner SET ?"

    return new Promise((resolve, reject) => {
      con.query(sql, data, (err, res) => {
        if (err) reject(new Error("Internal Server Error"));
        if (res.affectedRows > 0) {
          resolve({ ...{ id: res.insertId }, ...data });
        }
      });
    });
  },
  updatePromo: async (data) => {
    const sql = "UPDATE banner SET ? WHERE ?"
    return new Promise((resolve, reject) => {
      con.query(sql, data, (err, res) => {
        if (err) reject(new Error("Internal Server Error"));
        if (res.affectedRows > 0) {
          resolve({ ...data });
        } else {
          reject(new Error("Nothing to update"));
        }
      });
    });
  },
  deletePromo: async (data) => {
    const sql = `DELETE FROM banner WHERE ?`;
    new Promise((resolve, reject) => {
      con.query(sql, data, (err, res) => {
        if (err) reject(new Error("Error database server"));
        if (res.affectedRows > 0) resolve(`Promo no.${data.id} deleted`);
        else reject(new Error("Error database server"));
      });
    });
  }
}