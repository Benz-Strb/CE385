const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const students = [
    {id: 1, name: "node", age: 18},
    {id: 2, name: "express", age: 19},
    {id: 3, name: "javascript", age: 20}
]

app.get('/api/students', (req, res) => {
    res.send(students)
})

app.get('/api/students/:id', (req, res) => {
    // แปลงค่าพารามิเตอร์ id ให้เป็นตัวเลข
    const id = parseInt(req.params.id);

    // ค้นหานักเรียกตาม id
    const student = students.find(s => s.id === id);

    // ถ้าเจอนักเรียนจะส่งข้อมูลกลับ ถ้าไม่เจอจะส่ง error message
    if (student) {
        res.send(student);
    } else {
        res.status(404).send("Error 404: Student not found");
    }
});

app.post('/api/students', (req, res) => {
    const {name, age} = req.body;
    const maxId = Math.max(...students.map(s => s.id));
    const student = {id: maxId + 1, name, age};

    if (!name || !age) {
        return res.status(400).json({ error: 'missing somthing'});
    }

    students.push(student);

    res.status(201).json(student);
});

app.put('/api/students/:id', (req, res) => {
    const id = Number(req.params.id);
    const student = students.find(s => s.id === id);
    const { name, age } = req.body;

    if (!student) {
        return res.status(404).json({ error: 'not found' });
    }

    if (name !== undefined) student.name = name;
    if (age !== undefined) student.age = age;

    res.json(student);
});

app.delete('/api/students/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'not found' });
    }

    students.splice(index, 1);

    res.json({ message: 'deleted' });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});