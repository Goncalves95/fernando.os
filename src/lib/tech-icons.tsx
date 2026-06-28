import { IconType } from "react-icons";
import {
  SiDocker,
  SiExpo,
  SiFigma,
  SiFramer,
  SiGithubactions,
  SiJavascript,
  SiJsonwebtokens,
  SiMlflow,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRender,
  SiShopify,
  SiSpring,
  SiSpringboot,
  SiStreamlit,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

const TECH_ICON_RULES: Array<[RegExp, IconType]> = [
  [/react native/i, SiReact],
  [/^react\b/i, SiReact],
  [/next\.?js/i, SiNextdotjs],
  [/typescript/i, SiTypescript],
  [/javascript/i, SiJavascript],
  [/node\.?js/i, SiNodedotjs],
  [/mongodb/i, SiMongodb],
  [/postgres/i, SiPostgresql],
  [/python/i, SiPython],
  [/docker/i, SiDocker],
  [/spring boot/i, SiSpringboot],
  [/\bspring\b/i, SiSpring],
  [/vercel/i, SiVercel],
  [/render/i, SiRender],
  [/expo/i, SiExpo],
  [/figma/i, SiFigma],
  [/shopify/i, SiShopify],
  [/github actions/i, SiGithubactions],
  [/streamlit/i, SiStreamlit],
  [/mlflow/i, SiMlflow],
  [/jwt|json web token/i, SiJsonwebtokens],
  [/stripe/i, SiStripe],
  [/tailwind/i, SiTailwindcss],
  [/framer/i, SiFramer],
];

export function getTechIcon(tech: string): IconType | null {
  const match = TECH_ICON_RULES.find(([pattern]) => pattern.test(tech));
  return match ? match[1] : null;
}
