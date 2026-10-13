import "dotenv/config";
import { prisma } from "../src/lib/prisma.js";
import { hashPassword } from "../src/utils/password.js";

async function main(): Promise<void> {
  const email = (process.env.SEED_ADMIN_EMAIL || "admin@college.edu").toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD || "Admin@12345";
  const facultyEmail = (process.env.SEED_FACULTY_EMAIL || "faculty@college.edu").toLowerCase();
  const facultyPassword = process.env.SEED_FACULTY_PASSWORD || "Faculty@12345";

  const admin = await prisma.user.upsert({
    where: { email },
    update: { passwordHash: await hashPassword(password), role: "ADMIN" },
    create: { email, passwordHash: await hashPassword(password), role: "ADMIN" },
  });

  const faculty = await prisma.user.upsert({
    where: { email: facultyEmail },
    update: { passwordHash: await hashPassword(facultyPassword), role: "FACULTY" },
    create: { email: facultyEmail, passwordHash: await hashPassword(facultyPassword), role: "FACULTY" },
  });

  console.log(`Seeded admin: ${admin.email}`);
  console.log(`Seeded faculty: ${faculty.email}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => void prisma.$disconnect());
