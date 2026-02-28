### Week 7

#### Workshop 7

`GET '/'` คืนข้อความ Hello from Prisma API! ใช้เช็คว่าเซิร์ฟเวอร์รันอยู่

##### User
1. `GET '/user'` ดึงผู้ใช้ทั้งหมดจากตาราง User ด้วย `prisma.user.findMany()`
2. `GET '/user/email/:email'` ดึงผู้ใช้หนึ่งคนจาก email ด้วย `prisma.user.findUnique({ where:{ email } })` ถ้าไม่เจอคืน 404
3. `POST '/user'` สร้างผู้ใช้ใหม่จาก name และ email ใน body ด้วย `prisma.user.create()` ถ้าสำเร็จคืน 201
4. `PUT '/user/:id'` แก้ไขผู้ใช้ตาม Userid โดยอัปเดต name และ email ด้วย `prisma.user.update()` ถ้าไม่เจอ Userid คืน 404
5. `DELETE '/user/:id'` ลบผู้ใช้ตาม Userid เช็คก่อนว่ามี user หรือไม่ ถ้าไม่เจอคืน 404 ถ้ามีแล้วลบและคืน User deleted

##### Post
1. `GET '/posts'` ดึงโพสต์ทั้งหมดจากตาราง Post ด้วย `prisma.post.findMany()`
2. `GET '/posts/:id'` ดึงโพสต์หนึ่งรายการด้วย postId ผ่าน `prisma.post.findUnique({ where: { postId: id } })` ถ้าไม่เจอคืน 404
3. `POST '/posts'` สร้างโพสต์ใหม่จาก title, content, authorId ด้วย `prisma.post.create()` authorId จำเป็น เพราะ schema กำหนดเป็น required
4. `PUT '/posts/:id'` แก้ไขโพสต์ตาม postId โดยอัปเดต title, content, authorId ด้วย `prisma.post.update()`
5. `DELETE '/posts/:id'` ลบโพสต์ตาม postId เช็คก่อนว่ามี post หรือไม่ ถ้าไม่เจอคืน 404 ถ้ามีแล้วลบและคืน Post deleted