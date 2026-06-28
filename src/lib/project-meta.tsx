import { IconType } from "react-icons";
import { FiCloud, FiCpu, FiLayers, FiShoppingCart, FiSmartphone } from "react-icons/fi";
import { ProjectCategory, ProjectStatus } from "@/types";

interface CategoryMeta {
  label: string;
  icon: IconType;
  gradient: string;
}

export const CATEGORY_FILTERS: Array<{ value: ProjectCategory | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "fullstack", label: "Full Stack" },
  { value: "ml", label: "ML/AI" },
  { value: "mobile", label: "Mobile" },
  { value: "saas", label: "SaaS" },
  { value: "ecommerce", label: "E-Commerce" },
];

export const CATEGORY_META: Record<ProjectCategory, CategoryMeta> = {
  fullstack: {
    label: "Full Stack",
    icon: FiLayers,
    gradient: "from-orange-500/30 via-surface-panel to-surface",
  },
  ml: {
    label: "ML/AI",
    icon: FiCpu,
    gradient: "from-violet-500/30 via-surface-panel to-surface",
  },
  mobile: {
    label: "Mobile",
    icon: FiSmartphone,
    gradient: "from-emerald-500/30 via-surface-panel to-surface",
  },
  saas: {
    label: "SaaS",
    icon: FiCloud,
    gradient: "from-sky-500/30 via-surface-panel to-surface",
  },
  ecommerce: {
    label: "E-Commerce",
    icon: FiShoppingCart,
    gradient: "from-pink-500/30 via-surface-panel to-surface",
  },
};

interface StatusMeta {
  label: string;
  dotClass: string;
}

export const STATUS_META: Record<ProjectStatus, StatusMeta> = {
  live: { label: "Live", dotClass: "bg-emerald-500" },
  development: { label: "In development", dotClass: "bg-yellow-500" },
  archived: { label: "Archived", dotClass: "bg-zinc-500" },
};
