import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const initGSAP = () => {
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }
};

export const gsapConfig = {
  defaultEase: 'power3.out',
  defaultDuration: 0.8,
};

export { gsap, ScrollTrigger };
