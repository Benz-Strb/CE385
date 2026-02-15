### Week 5

#### Workshop 5.1
เริ่มจาก นำเข้า Express framework และสร้าง application instance ตั้งค่า middleware สำหรับแปลงข้อมูลที่ส่งมา: <br>
`express.json()` - รับข้อมูล JSON format <br>
`express.urlencoded()` - รับข้อมูลจากฟอร์ม HTML <br>
`const students = [...]` สร้าง Array สำหรับเก็บข้อมูลชั่วคราว <br>

##### API Endpoints

`GET Method` <br>
- get ('/api/students') - ดึงข้อมูลทั้งหมดจาก Array students `res.send(students)` ส่งข้อมูลกลับมาในรูปแบบ JSON <br>
- get ('/api/students/:id') - ดึงข้อมูลคนเดียวตาม id `const id = parseInt(req.params.id);` แปลง id จาก URLparameter เป็น `ตัวเลข` ใช้ `find()` ค้นหานักเรียนที่มี id ตรงกัน ถ้าเจอส่งข้อมูลกลับ ถ้าไม่เจอส่ง error 404 <br>

`POST Method` <br>
- post ('/api/students') - เพิ่มข้อมูลใหม่ รับข้อมูล `name` และ `age` จาก `request body` หา ID สูงสุดในระบบแล้วบวก 1 เพื่อสร้าง ID ใหม่ ตรวจสอบว่ามีข้อมูลครบถ้วนหรือไม่ ถ้าไม่ครบส่ง error 400 ถ้าครบเพิ่มนักเรียนใหม่เข้า Array แล้วส่ง status 201 (Created) พร้อมข้อมูลนักเรียนที่สร้าง <br>

`PUT Method` <br>
- put ('/api/students/:id') - แก้ไขข้อมูลนักเรียน ค้นหานักเรียนจาก ID ถ้าไม่เจอส่ง error 404 อัพเดทเฉพาะ field ที่ส่งมา แล้วส่งข้อมูลที่อัพเดทแล้วกลับไป <br>

`DELETE Method` <br>
- delete ('/api/students/:id') - ลบนักเรียน ใช้ `findIndex()` หาตำแหน่งของนักเรียนใน Array ถ้าไม่เจอ (index = -1) ส่ง error 404 ใช้ `splice()` ลบนักเรียนออกจาก Array แล้วส่งข้อความยืนยันการลบ

#### Workshop 5.2
เพิ่ม Middleware `validateStudentData` ตรวจสอบว่ามี `name` และ `age` หรือไม่ และตรวจสอบว่า`ไม่เป็นค่าว่าง` ถ้า`ไม่ผ่าน`ส่ง error 400 พร้อมข้อความ `Invalid data` ถ้า`ผ่าน`เรียก `next()` เพื่อไปยัง route handler ต่อไป <br>
`app.post('/api/students', validateStudentData, (req, res) => {...});` เพิ่ม validateStudentData เป็น parameter ตัวที่ 2 Middleware จะทำงานก่อน route handler