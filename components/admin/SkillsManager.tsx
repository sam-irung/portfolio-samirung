"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Skill = {
  id: string;
  name: string;
  level: string | null;
  order: number;
  published: boolean;
  categoryId: string;
};

type Category = {
  id: string;
  name: string;
  slug: string;
  order: number;
  skills: Skill[];
};

const LEVELS = ["Fondamental", "Intermédiaire", "Avancé", "Expert"];

export default function SkillsManager({
  initialCategories,
}: {
  initialCategories: Category[];
}) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [busy, setBusy] = useState(false);

  // --- Nouvelle catégorie ---
  const [newCatName, setNewCatName] = useState("");

  const addCategory = async () => {
    if (!newCatName.trim()) return;
    setBusy(true);
    const res = await fetch("/api/admin/skill-categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCatName, order: categories.length + 1 }),
    });
    if (res.ok) {
      const cat = await res.json();
      setCategories([...categories, { ...cat, skills: [] }]);
      setNewCatName("");
      router.refresh();
    }
    setBusy(false);
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Supprimer cette catégorie et toutes ses compétences ?")) return;
    setBusy(true);
    const res = await fetch(`/api/admin/skill-categories/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCategories(categories.filter((c) => c.id !== id));
      router.refresh();
    }
    setBusy(false);
  };

  // --- Nouvelle skill dans une catégorie ---
  const addSkill = async (categoryId: string, name: string, level: string) => {
    if (!name.trim()) return;
    setBusy(true);
    const res = await fetch("/api/admin/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        level,
        categoryId,
        order: (categories.find((c) => c.id === categoryId)?.skills.length ?? 0) + 1,
      }),
    });
    if (res.ok) {
      const skill = await res.json();
      setCategories(
        categories.map((c) =>
          c.id === categoryId ? { ...c, skills: [...c.skills, skill] } : c
        )
      );
      router.refresh();
    }
    setBusy(false);
  };

  const updateSkillLevel = async (skillId: string, newLevel: string) => {
    setBusy(true);
    const res = await fetch(`/api/admin/skills/${skillId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level: newLevel }),
    });
    if (res.ok) {
      setCategories(
        categories.map((c) => ({
          ...c,
          skills: c.skills.map((s) => (s.id === skillId ? { ...s, level: newLevel } : s)),
        }))
      );
      router.refresh();
    }
    setBusy(false);
  };

  const deleteSkill = async (skillId: string) => {
    if (!confirm("Supprimer cette compétence ?")) return;
    setBusy(true);
    const res = await fetch(`/api/admin/skills/${skillId}`, { method: "DELETE" });
    if (res.ok) {
      setCategories(
        categories.map((c) => ({
          ...c,
          skills: c.skills.filter((s) => s.id !== skillId),
        }))
      );
      router.refresh();
    }
    setBusy(false);
  };

  return (
    <div className="space-y-6">
      {/* Nouvelle catégorie */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="font-heading text-lg font-semibold text-neutral-900">
          Ajouter une catégorie
        </h2>
        <div className="mt-4 flex gap-3">
          <input
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="Nom (ex: Sécurité)"
            className="flex-1 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
          />
          <button
            type="button"
            onClick={addCategory}
            disabled={busy}
            className="inline-flex h-10 items-center justify-center rounded-full bg-primary-600 px-5 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-60"
          >
            Ajouter
          </button>
        </div>
      </div>

      {/* Liste des catégories */}
      {categories.map((cat) => (
        <CategoryCard
          key={cat.id}
          category={cat}
          busy={busy}
          onAddSkill={addSkill}
          onUpdateLevel={updateSkillLevel}
          onDeleteSkill={deleteSkill}
          onDeleteCategory={deleteCategory}
        />
      ))}
    </div>
  );
}

function CategoryCard({
  category,
  busy,
  onAddSkill,
  onUpdateLevel,
  onDeleteSkill,
  onDeleteCategory,
}: {
  category: Category;
  busy: boolean;
  onAddSkill: (catId: string, name: string, level: string) => void;
  onUpdateLevel: (skillId: string, level: string) => void;
  onDeleteSkill: (skillId: string) => void;
  onDeleteCategory: (catId: string) => void;
}) {
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState("Intermédiaire");

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-neutral-900">
          {category.name}
        </h3>
        <button
          type="button"
          onClick={() => onDeleteCategory(category.id)}
          disabled={busy}
          className="text-xs font-medium text-rose-600 hover:text-rose-700"
        >
          Supprimer la catégorie
        </button>
      </div>

      {/* Liste skills */}
      <ul className="mt-4 space-y-2">
        {category.skills.map((skill) => (
          <li
            key={skill.id}
            className="flex items-center gap-3 rounded-xl border border-neutral-100 bg-neutral-50 px-3 py-2"
          >
            <span className="flex-1 text-sm font-medium text-neutral-800">
              {skill.name}
            </span>
            <select
              value={skill.level ?? ""}
              onChange={(e) => onUpdateLevel(skill.id, e.target.value)}
              className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-xs"
            >
              {LEVELS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => onDeleteSkill(skill.id)}
              disabled={busy}
              className="text-xs text-rose-600 hover:text-rose-700"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {/* Ajouter skill */}
      <div className="mt-4 flex flex-wrap gap-2">
        <input
          value={newSkillName}
          onChange={(e) => setNewSkillName(e.target.value)}
          placeholder="Nouvelle compétence"
          className="flex-1 min-w-[200px] rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary-500"
        />
        <select
          value={newSkillLevel}
          onChange={(e) => setNewSkillLevel(e.target.value)}
          className="rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm"
        >
          {LEVELS.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => {
            onAddSkill(category.id, newSkillName, newSkillLevel);
            setNewSkillName("");
          }}
          disabled={busy}
          className="inline-flex h-10 items-center justify-center rounded-full bg-neutral-900 px-4 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-60"
        >
          + Ajouter
        </button>
      </div>
    </div>
  );
}