import { Github, Linkedin, Instagram, Youtube, Mail, type LucideIcon } from "lucide-react";

/* NOTE: the YouTube URL matches the Instagram handle — confirm it is the real channel. */
export const SOCIALS = {
  github: "https://github.com/Ricky-Hacker001",
  linkedin: "https://www.linkedin.com/in/ricky-f-btech/",
  instagram: "https://www.instagram.com/ricky.techie/",
  youtube: "https://www.youtube.com/@ricky.techie",
  email: "mailto:ricky.devsec@gmail.com",
};

export type SocialLink = { label: string; href: string; icon: LucideIcon; handle: string };

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: SOCIALS.github, icon: Github, handle: "Ricky-Hacker001" },
  { label: "LinkedIn", href: SOCIALS.linkedin, icon: Linkedin, handle: "ricky-f-btech" },
  { label: "Instagram", href: SOCIALS.instagram, icon: Instagram, handle: "@ricky.techie" },
  { label: "YouTube", href: SOCIALS.youtube, icon: Youtube, handle: "@ricky.techie" },
  { label: "Email", href: SOCIALS.email, icon: Mail, handle: "ricky.devsec@gmail.com" },
];

export type Channel = {
  key: "youtube" | "instagram" | "github";
  label: string;
  handle: string;
  href: string;
  blurb: string;
  format: string;
  icon: LucideIcon;
};

export const CONTENT_CHANNELS: Channel[] = [
  {
    key: "youtube",
    label: "YouTube",
    handle: "@ricky.techie",
    href: SOCIALS.youtube,
    blurb: "Long-form build logs, breakdowns and experiments.",
    format: "BUILD LOGS",
    icon: Youtube,
  },
  {
    key: "instagram",
    label: "Instagram",
    handle: "@ricky.techie",
    href: SOCIALS.instagram,
    blurb: "Technical reels, hardware shots and quick demos.",
    format: "REELS / DEMOS",
    icon: Instagram,
  },
  {
    key: "github",
    label: "GitHub",
    handle: "Ricky-Hacker001",
    href: SOCIALS.github,
    blurb: "Open-source tooling, labs and project source.",
    format: "SOURCE",
    icon: Github,
  },
];
