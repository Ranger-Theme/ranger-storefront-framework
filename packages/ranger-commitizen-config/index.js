module.exports = {
  types: [
    {
      value: 'feat',
      name: '✨ feat: new feature | 新功能'
    },
    {
      value: 'fix',
      name: '🐛 fix: bug fix | Bug修复'
    },
    {
      value: 'docs',
      name: '✏️ docs: documentation | 文档'
    },
    {
      value: 'style',
      name: '💄 style: styles | 风格'
    },
    {
      value: 'refactor',
      name: '♻️ refactor: code refactoring | 代码重构'
    },
    {
      value: 'perf',
      name: '⚡  perf: performance improvements | 性能优化'
    },
    {
      value: 'test',
      name: '✅ test: tests | 测试'
    },
    {
      value: 'chore',
      name: '🚀 chore: Changes to the build process | 构建/工程依赖/工具'
    },
    {
      value: 'revert',
      name: '⏪ revert: revert to a commit | 回退'
    },
    {
      value: 'build',
      name: '📦‍ build: pack | 打包构建'
    },
    { value: 'init', name: '🎉 Init | 初始化' },
    { value: 'ci', name: '👷 Continuous Integration | CI 配置' }
  ],
  messages: {
    type: '"Select the type of change that you\'re commiting: (Use arrow keys)"',
    customScope: 'Please enter the modification range (optional):',
    subject: 'Please briefly describe the submission (required):',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    footer: 'Please enter the issue to close (optional):',
    confirmCommit: 'Are you sure you want to proceed with the commit above? (y/n/e/h)'
  },
  skipQuestions: [],
  subjectLimit: 100
}
