import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import AboutPreview from "@/components/home/AboutPreview";
import SkillsPreview from "@/components/home/SkillsPreview";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ExperiencePreview from "@/components/home/ExperiencePreview";
import PublicationsPreview from "@/components/home/PublicationsPreview";
import LabsPreview from "@/components/home/LabsPreview";
import ContactCTA from "@/components/home/ContactCTA";

//export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Stats />
        <AboutPreview />
        <SkillsPreview />
        <FeaturedProjects />
        <ExperiencePreview />
        <PublicationsPreview />
        <LabsPreview />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}