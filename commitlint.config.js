module.exports = {
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert']],
    'type-case': [2, 'always', 'lowerCase'],
    'type-empty': [2, 'never'],
    'scope-enum': [2, 'always', ['gmap-vue', 'docs', 'root', 'all']],
    'scope-case': [2, 'always', 'lowerCase'],
    'scope-empty': [2, 'never'],
    'subject-case': [2, 'always', 'lowerCase'],
    'subject-min-length': [2, 'always', 15],
    'subject-max-length': [2, 'always', 75],
    'header-case': [2, 'always', 'lowerCase'],
    'body-leading-blank': [2, 'always'],
    'body-max-length': [2, 'always', 300],
    'footer-leading-blank': [2, 'always'],
    'footer-max-length': [2, 'always', 100],
  },
};
