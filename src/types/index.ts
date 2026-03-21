export interface Project {
  id: string;
  title: string;
  description: string;
  emoji: string;
  tags: string[];
  link?: string;
  gradient: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'editor' | 'design' | 'deploy' | 'devops' | 'other';
  url: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ParticleConfig {
  particles: {
    number: { value: number; density: { enable: boolean; value_area: number } };
    color: { value: string | string[] };
    shape: { type: string };
    opacity: { value: number; random: boolean; anim: { enable: boolean; speed: number } };
    size: { value: number; random: boolean; anim: { enable: boolean; speed: number } };
    line_linked: { enable: boolean; distance: number; color: string; opacity: number; width: number };
    move: { enable: boolean; speed: number; direction: string; random: boolean; straight: boolean; out_mode: string };
  };
  interactivity: {
    detect_on: string;
    events: {
      onhover: { enable: boolean; mode: string };
      onclick: { enable: boolean; mode: string };
      resize: boolean;
    };
    modes: { grab: { distance: number; line_linked: { opacity: number } }; push: { particles_nb: number } };
  };
  retina_detect: boolean;
}