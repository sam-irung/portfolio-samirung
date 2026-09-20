import "dotenv/config";
import { PrismaClient } from "../../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  skillCategories,
  technologies,
  projects,
  experiences,
  certifications,
  publications,
  labs,
  documents,
  settings,
} from "./data";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  console.log("🌱 Début du seed...\n");

  // ------------------------------------------------------------
  // 1. TECHNOLOGIES
  // ------------------------------------------------------------
  console.log("→ Technologies...");
  for (const name of technologies) {
    await prisma.technology.upsert({
      where: { name },
      update: {},
      create: { name, slug: slugify(name) },
    });
  }
  console.log(`   ✓ ${technologies.length} technologies\n`);

  // ------------------------------------------------------------
  // 2. PROJETS + LIAISONS TECHNOLOGIES
  // ------------------------------------------------------------
  console.log("→ Projets...");
  for (const p of projects) {
    const { technologies: techNames, ...projectData } = p;

    const project = await prisma.project.upsert({
      where: { slug: p.slug },
      update: projectData,
      create: projectData,
    });

    // Nettoyer les anciennes liaisons
    await prisma.projectTechnology.deleteMany({
      where: { projectId: project.id },
    });

    // Créer les nouvelles liaisons
    for (const techName of techNames) {
      const tech = await prisma.technology.findUnique({
        where: { name: techName },
      });
      if (tech) {
        await prisma.projectTechnology.create({
          data: {
            projectId: project.id,
            technologyId: tech.id,
          },
        });
      }
    }
  }
  console.log(`   ✓ ${projects.length} projets\n`);

  // ------------------------------------------------------------
  // 3. CATÉGORIES + COMPÉTENCES
  // ------------------------------------------------------------
  console.log("→ Compétences...");
  for (const cat of skillCategories) {
    const { skills, ...catData } = cat;

    const category = await prisma.skillCategory.upsert({
      where: { slug: cat.slug },
      update: catData,
      create: catData,
    });

    // Nettoyer les anciennes skills de cette catégorie
    await prisma.skill.deleteMany({
      where: { categoryId: category.id },
    });

    // Recréer les skills
    for (const skill of skills) {
      await prisma.skill.create({
        data: {
          ...skill,
          categoryId: category.id,
          published: true,
        },
      });
    }
  }
  console.log(`   ✓ ${skillCategories.length} catégories\n`);

  // ------------------------------------------------------------
  // 4. EXPÉRIENCES
  // ------------------------------------------------------------
  console.log("→ Expériences...");
  await prisma.experience.deleteMany();
  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }
  console.log(`   ✓ ${experiences.length} expériences\n`);

  // ------------------------------------------------------------
  // 5. CERTIFICATIONS
  // ------------------------------------------------------------
  console.log("→ Certifications...");
  await prisma.certification.deleteMany();
  for (const cert of certifications) {
    await prisma.certification.create({ data: cert });
  }
  console.log(`   ✓ ${certifications.length} certifications\n`);

  // ------------------------------------------------------------
  // 6. PUBLICATIONS
  // ------------------------------------------------------------
  console.log("→ Publications...");
  for (const pub of publications) {
    await prisma.publication.upsert({
      where: { slug: pub.slug },
      update: pub,
      create: pub,
    });
  }
  console.log(`   ✓ ${publications.length} publications\n`);

  // ------------------------------------------------------------
  // 7. LABS
  // ------------------------------------------------------------
  console.log("→ Labs...");
  for (const lab of labs) {
    await prisma.lab.upsert({
      where: { slug: lab.slug },
      update: lab,
      create: lab,
    });
  }
  console.log(`   ✓ ${labs.length} labs\n`);

  // ------------------------------------------------------------
  // 8. DOCUMENTS
  // ------------------------------------------------------------
  console.log("→ Documents...");
  await prisma.document.deleteMany();
  for (const doc of documents) {
    await prisma.document.create({ data: doc });
  }
  console.log(`   ✓ ${documents.length} documents\n`);

  // ------------------------------------------------------------
  // 9. SETTINGS
  // ------------------------------------------------------------
  console.log("→ Paramètres...");
  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
  console.log(`   ✓ ${settings.length} paramètres\n`);

  console.log("🌱 Seed terminé avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur pendant le seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });