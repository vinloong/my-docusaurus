/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: 'Docusaurus blog only!',
  tagline: 'Build optimized websites quickly, focus on your content',
  organizationName: 'loong',
  projectName: 'wiki',
  baseUrl: '/blog-only/',
  url: 'https://vinloong.github.io',
  // We can only warn now, since we have blog pages linking to non-blog pages...
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/docusaurus.ico',
  themes: ['live-codeblock'],
  plugins: [],
  presets: [
    [
      'classic',
      {
        docs: false,
        pages: false,
        blog: {
          routeBasePath: '/',
          path: 'blog',
          // editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
          postsPerPage: 3,
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc.`,
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themeConfig: {
    image: 'img/logo.png',
    algolia: {
      appId: 'X1Z85QJPUV',
      apiKey: 'bf7211c161e8205da2f933a02534105a',
      indexName: 'docusaurus-2',
      contextualSearch: true,
    },
    navbar: {
      hideOnScroll: true,
      title: 'Docusaurus',
      logo: {
        alt: 'Docusaurus Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo.svg',
      },
    },
  },
};
