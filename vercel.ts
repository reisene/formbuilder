/* Basic configuration of Vercel.
  It can configure and override behavior of Vercel in project.
  For more information and possibilities, view https://vercel.com/docs/project-configuration/vercel-ts
*/

import type { VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  regions: ['fra1'], // For more information and available regions, view https://vercel.com/docs/regions
  functionFailoverRegions: ['cdg1'],
  cleanUrls: true,
  framework: 'nextjs',
  installCommand: 'npm i',
  git: {
    deploymentEnabled: {
      'experiment/*': false,
    },
  },
};
