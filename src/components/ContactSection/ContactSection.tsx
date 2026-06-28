import { FiDownload, FiMail, FiMapPin } from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub, SiYoutube } from "react-icons/si";

const EMAIL = "fernandojcg22@gmail.com";
export const CV_FILENAME = "Fernando_Goncalves_2026_foto_CV_Zurich.pdf";
const CV_URL = `/cv/${CV_FILENAME}`;

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/Goncalves95", icon: SiGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fernandojcgoncalves/",
    icon: FaLinkedin,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCaDB7N_v5ZuUD1BHarmzUZQ",
    icon: SiYoutube,
  },
];

export function ContactSection() {
  return (
    <div className="flex flex-col items-start gap-6">
      <div>
        <h2 className="font-mono text-xl text-zinc-100">
          Let&apos;s build something<span className="text-accent">.</span>
        </h2>
        <p className="mt-2 max-w-md text-sm text-zinc-400">
          Open to full-time roles, freelance work, and the occasional weird idea.
          Reach out — I read everything.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${EMAIL}`}
          className="flex items-center gap-2 rounded bg-accent px-4 py-2 font-mono text-sm font-semibold text-black hover:bg-accent-glow"
        >
          <FiMail className="h-4 w-4" />
          Email me
        </a>

        <a
          href={CV_URL}
          download
          className="flex items-center gap-2 rounded border border-surface-border px-4 py-2 font-mono text-sm text-zinc-300 hover:border-accent/50 hover:text-accent"
        >
          <FiDownload className="h-4 w-4" />
          Download CV
        </a>
      </div>

      <div className="flex items-center gap-4">
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            title={social.label}
            className="text-zinc-500 hover:text-accent"
          >
            <social.icon className="h-5 w-5" />
          </a>
        ))}
      </div>

      <p className="flex items-center gap-1.5 font-mono text-sm text-zinc-500">
        <FiMapPin className="h-4 w-4" />
        Zürich, Switzerland 🇨🇭
      </p>
    </div>
  );
}
