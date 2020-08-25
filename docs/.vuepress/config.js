
module.exports = ctx=>({
  dest:'dist',
  title: "K-Sword",
  description: "Study well and make progress every day. ",
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'K-Sword',
      description: '🌈 一个 JavaScript/TypeScript 实用程序库。'
    }
  },
  head: [
    ['link', { rel: 'icon', href: `/favicon.ico` }],
    ['meta', { name: 'theme-color', content: '#4569d4' }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#4569d4' }],
  ],
  themeConfig:{
    markdown: {
      lineNumbers: true
    },
    locales: {
      '/': {
        label: '中文',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: require('./nav/zh'),
        sidebar: {
          '/config/': getApiSidebar('配置'),
          '/guide/': getGuideSidebar('API说明', 'Advanced'),
        }
      },
    }
  }
});


function getApiSidebar (group) {
  return ['']
  // return [
  //   {
  //     title: group,
  //     collapsable: false,
  //     children: [
  //       '',
  //     ]
  //   },
  // ]
}


function getGuideSidebar (groupA, groupB) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'ajax',
        'conf',
        'type',
        'device',
        'storage',
      ]
    },
  ]
}
