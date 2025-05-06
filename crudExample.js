// crudExample.js
const pool = require('./db');

async function basicCrud() {
  let conn;
  try {
    conn = await pool.getConnection();

    const studentId = 'S10810001';
    const name = '王曉明';
    const gender = 'M';
    const email = 'wang@example.com';
    const departmentId = 'CS001';

    //  先檢查學號是否已存在
    let sql = 'SELECT COUNT(*) AS count FROM STUDENT WHERE Student_ID = ?';
    const result = await conn.query(sql, [studentId]);
    if (result[0].count > 0) {
      console.log(`學號 ${studentId} 已存在，不可重複新增。`);
    } else {
      //  INSERT 新增
      sql = 'INSERT INTO STUDENT (Student_ID, Name, Gender, Email, Department_ID) VALUES (?, ?, ?, ?, ?)';
      await conn.query(sql, [studentId, name, gender, email, departmentId]);
      console.log(`已成功新增學號 ${studentId} 的學生。`);
    }

    //  SELECT 查詢
    sql = 'SELECT * FROM STUDENT WHERE Department_ID = ?';
    const rows = await conn.query(sql, [departmentId]);
    console.log('查詢結果：', rows);

    //  UPDATE 更新
    sql = 'UPDATE STUDENT SET Name = ? WHERE Student_ID = ?';
    await conn.query(sql, ['王小明', studentId]);
    console.log(`已更新學號 ${studentId} 的學生名稱。`);

    //  DELETE 刪除
    sql = 'DELETE FROM STUDENT WHERE Student_ID = ?';
    await conn.query(sql, [studentId]);
    console.log(`已刪除學號 ${studentId} 的學生。`);

  } catch (err) {
    console.error('操作失敗：', err);
  } finally {
    if (conn) conn.release();
  }
}

basicCrud();
