export type Skill = {
  id: string;
  name: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
};

export let SKILLS: Skill[] = [
  {
    id: "1",
    name: "skill 1",
    description: "Description 1",
    category: "category 1",
    createdAt: "2022-03-02",
    updatedAt: "2022-03-02",
  },
  {
    id: "2",
    name: "skill 2",
    description: "Description 2",
    category: "category 2",
    createdAt: "2022-04-02",
    updatedAt: "2022-04-02",
  },
];

export async function getskills() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 3000);
  });
  return [...SKILLS];
}

export async function addSkill(skill: Skill) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  SKILLS = [...SKILLS, skill];
  console.log("Skill", SKILLS);
}
