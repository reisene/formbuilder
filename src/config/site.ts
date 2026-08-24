import type { IconType } from 'react-icons';
import { BsGithub } from 'react-icons/bs';

const author: {
  name: string;
  url: string;
  mail: string;
  ico: string | IconType;
} = {
  name: process.env.NEXT_PUBLIC_AUTHOR || 'Your Name',
  url: process.env.NEXT_PUBLIC_GH || 'http://localhost:3000',
  mail: process.env.NEXT_PUBLIC_MAIL || 'you@example.com',
  ico: process.env.NEXT_PUBLIC_ICO?.trimEnd().replace(/\s+$/g, '') || BsGithub,
};
const url = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
const repo = process.env.NEXT_PUBLIC_REPO || 'http://localhost:3000';
const gsv = process.env.GOOGLE_SITE_VERIFICATION;

const site = {
  author,
  url,
  repo,
  gsv,
  meta: {
    title: 'Form Builder',
    description: 'A visual form builder application.',
    ogImage: '/og-image.png',
  },
};

export default site;
