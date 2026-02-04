### Week 4

#### workshop 4.1
สร้างฟังก์ชัน `operation` รับพารามิเตอร์ 3 ตัว ตัวแรก `type` เอาไว้บอกว่าจะทำการดำเนินการอะไร `add`, `subtract`,  `multiply`, `divide` ตัวที่ 2 `a` เป็นตั้ง ตัวที่ 3 `b` เป็นตัวถูกดำเนินการ ภายในฟังก์ชันจะมีการเช็คว่า `type` เป็นอะไร `add` จะเป็นการบวก จะได้ a + b `subtract` จะเป็นการลบ จะได้ a - b `multiply` จะเป็นการคูณ จะได้ a * b `divide` จะเป็นการหาร จะได้ a / b แล้วส่งคืนผลลัพธ์แต่ละคำสั่งออกมา ถ้าเป็นคำสั่งนอกเหนือจากนี้ จะแสดง `Invalid operation type` <br>
ในไฟล์ `index.js` เป็นการนำเข้า Module operation เพื่อทดสอบ

#### workshop 4.2
##### ส่วนที่ 1 callback
สร้างฟังก์ชัน `fetchDataWithCallback` โดยรับพารามิเตอร์เป็น `callback` ซึ่งเป็นฟังก์ชันที่จะถูกเรียกทีหลัง ใช้ `setTimeout` จำลองการทำงานแบบ `asynchronous` โดยรอ 2000 ms หรือ 2 วินาที เมื่อครบเวลาจะเรียก `callback(null, 'Data from callback)` โดยที่พารามิเตอร์แรก `null` คือ error (ถ้าไม่มี error ให้ส่ง null) พารามิเตอร์ที่สอง `Data from callback` คือข้อมูลที่ได้ <br>
เรียก `fetchDataWithCallback` และส่ง `callback` เข้าไป callback จะตรวจสอบว่า error หรือไม่ ถ้าไม่มีจะแสดง `'Callback Result: Data from callback'` <br>

##### ส่วนที่ 2 promise
สร้างฟังก์ชัน `fetchDataWithPromise` โดยรับพารามิเตอร์เป็น `resolve` และ `reject` โดยรอ 2000 ms หรือ 2 วินาที เมื่อครบเวลาจะเรียก `resolve('Data from promise')` เพื่อส่งข้อมูลออกมา <br>
เรียก `fetchDataWithPromise` จะได้ `Promise` กลับมา <br>
`.then()` จะทำงานเมื่อ Promise สำเร็จ (resolve) → แสดง `'Promise Result: Data from promise'` <br>
`.catch()` จะทำงานเมื่อ Promise เกิด error (reject) <br>

##### ความแตกต่างระหว่าง callback และ promise
`callback` ส่ง function เข้าไปเป็นพารามิเตอร์ และตรวจสอบ error ใน callback ด้วย if-else <br>
`promise` Return Promise object และใช้ `.catch()` จัดการ error

#### workshop 4.3
##### ส่วนที่ 1 simulateAsyncOperation
สร้างฟังก์ชัน `simulateAsyncOperation` โดยรับพารามิเตอร์ `timeout` return promise จะทำงานตามเวลาที่กำหนดใน `timeout` <br>
ถ้า timeout < 1000: เรียก `reject()` ส่ง error message กลับไป <br>
ถ้า timeout >= 1000: เรียก `resolve()` ส่งข้อความสำเร็จกลับไป <br>

##### ส่วนที่ 2 performAsyncTask
ใช้ `async` นำหน้า `function` เพื่อจะให้สามารถใช้ `await` ได้ <br>
`const result = await simulateAsyncOperation(timeout)` รอให้ Promise เสร็จก่อน แล้วเก็บผลลัพธ์ไว้ในตัวแปร `result` <br>
`try`: ถ้า Promise resolve สำเร็จ → แสดงผลลัพธ์ <br>
`catch`: ถ้า Promise reject → จับ error และแสดงข้อความ error <br>

##### ผลลัพธ์
performAsyncTask(1500); <br>
performAsyncTask(500); <br>
ผลลัพธ์ Error: timeout must be at least 1000 ms ควรจะแสดงออกมาอันแรกเนื่องจาก performAsyncTask(1500); และ
performAsyncTask(500); ทำงานพร้อมกัน ทำให้ ผลลัพธ์ของ performAsyncTask(500) แสดงออกมาก่อนเพราะถูกตรวจจับได้ก่อนที่จะจบการทำงาน

#### workshop 4.4
##### ส่วนที่ 1 ฟังก์ชันจำลองการดึงข้อมูล
`fetchDataFromServer1()` รอ 2 วินาที แล้ว สำเร็จ ส่งข้อมูล 'Data from server 1' <br>
`fetchDataFromServer2()` รอ 1 วินาที แล้ว สำเร็จ ส่งข้อมูล 'Data from server 2' <br>
`fetchDataFromServer3()` รอ 3 วินาที แล้ว สำเร็จ ส่งข้อมูล 'Data from server 3' <br>

##### ส่วนที่ 2 Promise.any()
รอจนกว่าจะมี Promise **ตัวใดตัวหนึ่ง** สำเร็จ (resolve) `ตัวแรก` <br>
Promise สำเร็จ → ส่งผลลัพธ์ของตัวที่สำเร็จก่อนไปที่ `.then()` <br>
Promise **ที่เหลือ** → ไปที่ `.catch()`

##### ส่วนที่ 3 Promise.allSettled()
รอจนกว่า Promise **ทุกตัว** จะเสร็จสิ้น (ไม่ว่าจะสำเร็จหรือล้มเหลว) <br>
ส่ง `array ของผลลัพธ์ทั้งหมด` กลับมา
**ไม่มี `.catch()`** เพราะไม่มีทาง reject (รอจนครบทุกตัวเสมอ)
