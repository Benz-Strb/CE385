import * as fs from "fs";
import * as path from "path";

interface ModelInfo {
  name: string;
  fields: string[];
}

export function readPrismaSchema(): ModelInfo[] {
  const schemaPath = path.join(process.cwd(), "prisma", "schema.prisma");
  const content = fs.readFileSync(schemaPath, "utf-8"); // อ่านไฟล์ schema.prisma เป็น text

  const models: ModelInfo[] = []; // เก็บข้อมูล model ทั้งหมด
  const modelRegex = /model\s+(\w+)\s*{([^}]*)}/g; // regex สำหรับจับ model และ body ภายใน
  let match;

  while ((match = modelRegex.exec(content)) !== null) {
    // loop ผ่านทุก match ที่เจอ
    const modelName = match[1]; // ชื่อ model คือ group ที่ 1
    const body = match[2]; // body ของ model คือ group ที่ 2

    // extract field names (ข้ามพวก relation และ decorator)
    const fields = body
      .split("\n") // แยกเป็นบรรทัด
      .map((line) => line.trim()) // ตัดช่องว่าง
      // กรองเฉพาะ field (ไม่เอา comment และ decorator เช่น @id @default)
      .filter(
        (line) =>
          line &&
          !line.startsWith("//") &&
          !line.startsWith("@@") &&
          !line.startsWith("@")
      )
      .map((line) => line.split(/\s+/)[0]) // ดึงชื่อ field (ตัวแรกของบรรทัด)
      .filter(Boolean); // กรองค่า null/undefined

    models.push({ name: modelName, fields }); // เก็บ model info ลง array
  }

  return models;
}

export function getSchemaAsText(): string {
  const models = readPrismaSchema(); // อ่าน schema แล้วได้ข้อมูล model กลับเป็น array

  return models
    .map((m) => `Model: ${m.name}\nFields: ${m.fields.join(", ")}`) // แปลงแต่ละ model เป็น string ที่มีชื่อและ field
    .join("\n\n"); // รวมทุก model เป็น string โดยคั่นด้วยบรรทัดว่าง
}