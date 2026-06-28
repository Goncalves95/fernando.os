export type TechCategory = "backend" | "frontend" | "ml" | "mobile" | "devops" | "database";

export interface TechStackNode {
  id: string;
  label: string;
  category: TechCategory;
}

export interface TechStackEdge {
  id: string;
  source: string;
  target: string;
}

interface CategoryMeta {
  label: string;
  color: string;
}

export const CATEGORY_META: Record<TechCategory, CategoryMeta> = {
  backend: { label: "Backend", color: "#FF4500" },
  frontend: { label: "Frontend", color: "#38bdf8" },
  ml: { label: "ML/Data", color: "#a78bfa" },
  mobile: { label: "Mobile", color: "#34d399" },
  devops: { label: "DevOps", color: "#fbbf24" },
  database: { label: "Database", color: "#f472b6" },
};

const CATEGORY_ORDER: TechCategory[] = [
  "backend",
  "frontend",
  "ml",
  "mobile",
  "devops",
  "database",
];

const NODES_BY_CATEGORY: Record<TechCategory, Array<{ id: string; label: string }>> = {
  backend: [
    { id: "java", label: "Java" },
    { id: "spring-boot", label: "Spring Boot" },
    { id: "hibernate", label: "Hibernate" },
    { id: "rest-apis", label: "REST APIs" },
  ],
  frontend: [
    { id: "angular", label: "Angular" },
    { id: "react", label: "React" },
    { id: "nextjs", label: "Next.js" },
    { id: "typescript", label: "TypeScript" },
  ],
  ml: [
    { id: "python", label: "Python" },
    { id: "xgboost", label: "XGBoost" },
    { id: "prophet", label: "Prophet" },
    { id: "mlflow", label: "MLflow" },
    { id: "streamlit", label: "Streamlit" },
  ],
  mobile: [
    { id: "react-native", label: "React Native" },
    { id: "expo", label: "Expo" },
  ],
  devops: [
    { id: "docker", label: "Docker" },
    { id: "github-actions", label: "GitHub Actions" },
    { id: "azure", label: "Azure" },
    { id: "gitlab-ci", label: "GitLab CI" },
  ],
  database: [
    { id: "postgresql", label: "PostgreSQL" },
    { id: "mongodb", label: "MongoDB" },
    { id: "mysql", label: "MySQL" },
    { id: "redis", label: "Redis" },
  ],
};

export const techStackNodes: TechStackNode[] = CATEGORY_ORDER.flatMap((category) =>
  NODES_BY_CATEGORY[category].map((node) => ({ ...node, category })),
);

const RAW_EDGES: Array<[string, string]> = [
  ["java", "spring-boot"],
  ["spring-boot", "hibernate"],
  ["spring-boot", "rest-apis"],
  ["hibernate", "postgresql"],
  ["hibernate", "mysql"],
  ["spring-boot", "redis"],
  ["rest-apis", "postgresql"],
  ["rest-apis", "mongodb"],
  ["java", "docker"],
  ["react", "nextjs"],
  ["react", "typescript"],
  ["nextjs", "typescript"],
  ["angular", "typescript"],
  ["nextjs", "rest-apis"],
  ["react", "react-native"],
  ["react-native", "expo"],
  ["react-native", "typescript"],
  ["python", "xgboost"],
  ["python", "prophet"],
  ["python", "mlflow"],
  ["python", "streamlit"],
  ["mlflow", "postgresql"],
  ["docker", "github-actions"],
  ["docker", "gitlab-ci"],
  ["docker", "azure"],
  ["github-actions", "azure"],
  ["gitlab-ci", "azure"],
];

export const techStackEdges: TechStackEdge[] = RAW_EDGES.map(([source, target]) => ({
  id: `${source}->${target}`,
  source,
  target,
}));

const ROW_HEIGHT = 150;
const COLUMN_WIDTH = 190;

export function getNodePosition(node: TechStackNode): { x: number; y: number } {
  const categoryIndex = CATEGORY_ORDER.indexOf(node.category);
  const indexInCategory = NODES_BY_CATEGORY[node.category].findIndex(
    (item) => item.id === node.id,
  );

  return {
    x: 40 + indexInCategory * COLUMN_WIDTH,
    y: 40 + categoryIndex * ROW_HEIGHT,
  };
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function findProjectsUsingTech<T extends { techs: string[]; displayName: string }>(
  techLabel: string,
  projects: T[],
): T[] {
  const normalizedTech = normalize(techLabel);

  return projects.filter((project) =>
    project.techs.some((tech) => {
      const normalizedProjectTech = normalize(tech);
      return (
        normalizedProjectTech.includes(normalizedTech) ||
        normalizedTech.includes(normalizedProjectTech)
      );
    }),
  );
}
