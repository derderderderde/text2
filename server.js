const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// MySQL 数据库连接配置
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',      // 替换为你的 MySQL 用户名
    password: 'your_password',  // 替换为你的 MySQL 密码
    database: 'query_count_db'
});

// 连接到数据库
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL Database');
});

// 处理查询次数的更新
app.get('/update-query-count', (req, res) => {
    // 获取当前查询次数
    db.query('SELECT count FROM query_counts WHERE id = 1', (err, result) => {
        if (err) throw err;

        let queryCount = result[0].count;

        // 增加查询次数
        queryCount++;

        // 更新数据库中的查询次数
        db.query('UPDATE query_counts SET count = ? WHERE id = 1', [queryCount], (err, result) => {
            if (err) throw err;

            res.json({ queryCount });
        });
    });
});

// 提供静态文件
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
