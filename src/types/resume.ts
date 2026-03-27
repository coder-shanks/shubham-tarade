export interface Profile {
  name: string
  title: string
}

export interface Contact {
  email: string
}

export interface Highlight {
  value: string
  label: string
}

export interface SkillCategory {
  category: string
  technologies: string[]
}

export interface ExperienceItem {
  title: string
  company: string
  period: string
  current: boolean
  bullets: string[]
  achievements?: AchievementItem[]
}

export interface AchievementItem {
  count: string
  title: string
  description: string
}

export interface SocialLinks {
  linkedin?: string
  github?: string
  blog?: string
}

export interface ResumeData {
  profile: Profile
  contact: Contact
  summary: string[]
  highlights: Highlight[]
  skills: SkillCategory[]
  experience: ExperienceItem[]
  driveLink: string
  socials?: SocialLinks
}
