### Week 11

  #### Workshop 11

  `POST '/chat'` รับข้อความจาก user ใน body แล้วส่งไปให้ AI วิเคราะห์คำถาม โดย AI จะใช้ tool `query` เพื่อดึงข้อมูลจาก database ตาม
  schema ที่กำหนดไว้ แล้วสรุปคำตอบกลับมา

  `POST '/mcp'` รับ tool call ในรูปแบบ `{ tool, input }` แล้วเรียกใช้งาน function ตาม tool ที่ระบุ

  ##### Chat
  1. `POST '/chat'` รับค่า `message` จาก body ถ้าไม่มี message หรือ message ไม่ใช่ string จะคืน 400
  2. เมื่อข้อมูลถูกต้อง ระบบจะเรียก `askAI(message.trim())` เพื่อส่งข้อความไปให้ Gemini
  3. ใน `askAI()` ระบบจะอ่าน schema จาก `prisma/schema.prisma` ผ่าน `schemaReader.ts` แล้วส่ง schema นี้ให้ AI เป็น context
  4. AI ถูกกำหนด rule ให้ใช้ tool `query` ในการดึงข้อมูลจาก database เท่านั้น ไม่ให้ตอบจาก memory และไม่ให้เขียน raw SQL
  5. ถ้า AI ส่ง function call กลับมา ระบบจะเรียก `runQuery()` เพื่อ query database แล้วส่งผลลัพธ์กลับไปให้ AI จนได้คำตอบสุดท้าย
  6. ถ้าเกิด error ระหว่างทำงาน จะคืน 500 พร้อม error message

  ##### MCP
  1. `POST '/mcp'` รับค่า `tool` และ `input` จาก body ถ้าส่งมาไม่ครบจะคืน 400
  2. ถ้า `tool` เป็น `query` ระบบจะเรียก `runQuery(input)` เพื่อดึงข้อมูลจาก database
  3. ถ้าระบุ tool ที่ไม่มีในระบบ จะคืน 400 พร้อมข้อความ `Unknown tool`
  4. ถ้าทำงานสำเร็จ จะคืน `{ success: true, result }`
  5. ถ้าเกิด error ระหว่าง query จะคืน 500

  ##### Query
  1. `runQuery()` ใช้ `zod` ตรวจสอบ input ก่อน query
  2. model ที่อนุญาตให้เรียกมี `User` และ `Order`
  3. action ที่อนุญาตมี `findMany`, `findFirst`, `findUnique` และ `count`
  4. args ที่รองรับมี `where`, `select`, `orderBy`, `take` และ `skip`
  5. ระบบใช้ Prisma ร่วมกับ PostgreSQL adapter ในการเชื่อมต่อและ query ข้อมูลจริงจาก database

  ##### Schema
  1. `User` ใช้เก็บข้อมูลผู้ใช้ เช่น `id`, `email`, `name`, `createdAt`
  2. `Order` ใช้เก็บข้อมูลรายการสั่งซื้อ เช่น `id`, `item`, `quantity`, `userId`, `createdAt`
  3. ความสัมพันธ์คือ user 1 คนสามารถมี order ได้หลายรายการ