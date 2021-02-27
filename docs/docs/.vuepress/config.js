const path = require('path');

module.exports = {
  title: 'Hello arrow-ui',
  description: 'Here is arrow-ui. As the frontend component library of Arrow.',
  alias: {
    'styles': path.resolve(__dirname, './styles')
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    logo: '/assets/img/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      {
        text: 'Ecology',
        ariaLabel: 'Realtive',
        items: [
          { text: '持续集成', link: '/ci' },
          { text: 'qiankun', link: '/qiankun' },
          { text: 'Single SPA', link: '/single-spa' }
        ]
      },
      { text: 'Author', link: '/author/' }
    ],
    sidebar: {
      '/guide/': [
        ['update-logs', '更新日志'],
        ['', '介绍'],
        ['quick-start', '快速上手'],
        ['develop-component', '开发组件'],
        ['component-guide', '组件']
      ],
      '/author/':[ '' ]
    }
  }
}
