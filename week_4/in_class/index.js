// 1. Require โมดูล express
const express = require('express')

// 2. สร้าง instance ของ exprss
const app = express();

// 3. กำหนด port ที่จะใช้รันเซิร์ฟเวอร์
const port = 3000;

// 4. สร้างเส้นทาง (route) ที่จะตอบกลับเมื่อมีการร้องขอ GET มายังหน้าหลัก ('/')
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// 5. กำหนดให้เซิร์ฟเวอร์เริ่มฟังคำสั่งที่พอร์ตตั้งไว้
app.listen(port, () => {
    console.log(`Server is running on http:localhost:${port}`);
});