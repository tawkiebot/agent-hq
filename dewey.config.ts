/** @type {import('@arach/dewey').DeweyConfig} */
export default {
  project: {
    name: 'agent-hq',
    tagline: 'A directory of AI agents, systems, and templates',
    type: 'generic',
  },

  agent: {
    criticalContext: [
      'Uses Bun as package manager (bun install, bun run dev)',
      'Output static export to ./out for GitHub Pages',
      'Fonts: Fraunces (hero), Space Grotesk (headings), Geist Mono (technical)',
      'Accent color: emerald throughout',
      'Data schema defined in lib/catalog.ts',
    ],

    entryPoints: {
      'Data Schema': 'lib/catalog.ts',
      'Landing Page': 'components/landing-page.tsx',
      'Layout': 'app/layout.tsx',
      'Config': 'next.config.mjs',
    },

    rules: [
      { pattern: 'lib/catalog.ts', instruction: 'Contains all data types: Vendor, System, Template, Category' },
      { pattern: 'components/landing-page.tsx', instruction: 'Main landing page component' },
    ],

    sections: ['overview', 'quickstart'],
  },

  docs: {
    path: './docs',
    output: './',
    required: ['overview', 'quickstart'],
  },

  install: {
    objective: 'Set up development environment and run the app',
    doneWhen: {
      command: 'bun run dev',
      expectedOutput: 'Ready in',
    },
    prerequisites: ['Bun'],
    steps: [
      { description: 'Install dependencies', command: 'bun install' },
      { description: 'Start dev server', command: 'bun run dev' },
    ],
  },
}
