/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @ts-check


const math = require('remark-math');
const npm2yarn = require('@docusaurus/remark-plugin-npm2yarn');

const isDeployPreview =
  !!process.env.NETLIFY && process.env.CONTEXT === 'deploy-preview';

// Used to debug production build issues faster

const baseUrl = process.env.BASE_URL ?? '/';

// Special deployment for staging locales until they get enough translations
// https://app.netlify.com/sites/docusaurus-i18n-staging
// https://docusaurus-i18n-staging.netlify.app/


/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Docusaurus',
  tagline: 'Build optimized websites quickly, focus on your content',
  organizationName: 'facebook',
  projectName: 'docusaurus',
  baseUrl,
  baseUrlIssueBanner: true,
  url: 'https://docusaurus.io',
  // Dogfood both settings:
  // - force trailing slashes for deploy previews
  // - avoid trailing slashes in prod
  trailingSlash: isDeployPreview,
  stylesheets: [
    {
      href: '/katex/katex.min.css',
      type: 'text/css',
    },
  ],
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve('swc-loader'),
      options: {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
          target: 'es2017',
        },
        module: {
          type: isServer ? 'commonjs' : 'es6',
        },
      },
    }),
  },
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/docusaurus.ico',
  customFields: {
    isDeployPreview,
    description:
      'An optimized site generator in React. Docusaurus helps you to move fast and write content. Build documentation websites, blogs, marketing pages, and more.',
  },
  themes: ['live-codeblock'],
  plugins: [
    [
      'content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'community',
        path: 'community',
        routeBasePath: 'community',
        remarkPlugins: [npm2yarn],
        editCurrentVersion: true,
        sidebarPath: require.resolve('./sidebarsCommunity.js'),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      }),
    ],
    [
      'client-redirects',
      /** @type {import('@docusaurus/plugin-client-redirects').Options} */
      ({
        fromExtensions: ['html'],
        redirects: [
          {
            from: ['/docs/support', '/docs/next/support'],
            to: '/community/support',
          },
          {
            from: ['/docs/team', '/docs/next/team'],
            to: '/community/team',
          },
          {
            from: ['/docs/resources', '/docs/next/resources'],
            to: '/community/resources',
          },
        ],
      }),
    ],
    [
      'ideal-image',
      /** @type {import('@docusaurus/plugin-ideal-image').PluginOptions} */
      ({
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        // Use false to debug, but it incurs huge perf costs
        disableInDev: true,
      }),
    ],
    [
      'pwa',
      {
        debug: isDeployPreview,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        // swRegister: false,
        swCustom: require.resolve('./src/sw.js'),
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: 'img/docusaurus.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: 'manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(37, 194, 160)',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#000',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: 'img/docusaurus.png',
          },
          {
            tagName: 'link',
            rel: 'mask-icon',
            href: 'img/docusaurus.png',
            color: 'rgb(62, 204, 94)',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileImage',
            content: 'img/docusaurus.png',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileColor',
            content: '#000',
          },
        ],
      },
    ],
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        debug: true, // force debug plugin usage
        docs: {
          // routeBasePath: '/',
          path: 'docs',
          sidebarPath: 'sidebars.js',
          // sidebarCollapsible: false,
          // sidebarCollapsed: true,
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          remarkPlugins: [math, [npm2yarn, {sync: true}]],
          rehypePlugins: [],
          // disableVersioning: isVersioningDisabled,
          // lastVersion: isDev || isDeployPreview ? 'current' : undefined,
        },
        blog: {
          // routeBasePath: '/',
          path: 'blog',
          postsPerPage: 5,
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc.`,
          },
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All our posts',
        },
        pages: {
          remarkPlugins: [npm2yarn],
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            // relative paths are relative to site dir
            // './_dogfooding/dogfooding.css',
          ],
        },
        gtag: !isDeployPreview
          ? {
              trackingID: 'UA-141789564-1',
            }
          : undefined,
        sitemap: {
          ignorePatterns: ['/tests/**'],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      liveCodeBlock: {
        playgroundPosition: 'bottom',
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      prism: {
        additionalLanguages: ['java', 'latex'],
        magicComments: [
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: {start: 'highlight-start', end: 'highlight-end'},
          },
          {
            className: 'code-block-error-line',
            line: 'This will error',
          },
        ],
      },
      image: 'img/docusaurus-soc.png',
      // metadata: [{name: 'twitter:card', content: 'summary'}],
      algolia: {
        appId: 'X1Z85QJPUV',
        apiKey: 'bf7211c161e8205da2f933a02534105a',
        indexName: 'docusaurus-2',
      },
      navbar: {
        hideOnScroll: true,
        title: 'Docusaurus',
        logo: {
          alt: '',
          src: 'img/docusaurus.svg',
          srcDark: 'img/docusaurus_keytar.svg',
          width: 32,
          height: 32,
        },
        items: [
          {
            type: 'doc',
            position: 'left',
            docId: 'introduction',
            label: 'Docs',
          },
          {to: 'blog', label: 'Blog', position: 'left'},
          // Custom item for dogfooding: only displayed in /tests/ routes
          {
            type: 'custom-dogfood-navbar-item',
            content: '😉',
          },
          // Right
          {
            href: 'https://github.com/facebook/docusaurus',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Learn',
            items: [
              {
                label: 'Introduction',
                to: 'docs',
              },
              {
                label: 'Installation',
                to: 'docs/installation',
              },
              {
                label: 'Migration from v1 to v2',
                to: 'docs/migration',
              },
            ],
          },
          {
            title: 'Community',
            items: [
               {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Help',
                to: '/community/support',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: 'blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Meta Platforms, Inc. Built with Docusaurus.`,
      },
    }),
};

async function createConfig() {
  const FeatureRequestsPlugin = (
    await import('./src/plugins/featureRequests/FeatureRequestsPlugin.mjs')
  ).default;
  const configTabs = (await import('./src/remark/configTabs.mjs')).default;
  const lightTheme = (await import('./src/utils/prismLight.mjs')).default;
  const darkTheme = (await import('./src/utils/prismDark.mjs')).default;
  const katex = (await import('rehype-katex')).default;
  config.plugins?.push(FeatureRequestsPlugin);
  // @ts-expect-error: we know it exists, right
  config.presets[0][1].docs.remarkPlugins.push(configTabs);
  // @ts-expect-error: we know it exists, right
  config.themeConfig.prism.theme = lightTheme;
  // @ts-expect-error: we know it exists, right
  config.themeConfig.prism.darkTheme = darkTheme;
  // @ts-expect-error: we know it exists, right
  config.presets[0][1].docs.rehypePlugins.push(katex);
  return config;
}

module.exports = createConfig;
