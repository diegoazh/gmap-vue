// Adapted from https://github.com/nlf/lab-babel/blob/master/lib/index.js
const Babel = require('@babel/core');

const internals = {};
internals.transform = (content, filename) => {
  if (/^node_modules/.test(filename)) {
    return content;
  }

  const { code } = Babel.transform(content, {
    filename,
    sourceMap: 'inline',
    sourceFileName: filename,
    auxiliaryCommentBefore: '$lab:coverage:off$',
    auxiliaryCommentAfter: '$lab:coverage:on$',
    presets: ['@babel/env'],
  });

  return code;
};

internals.extensions = ['js', 'jsx', 'es', 'es6'];
internals.methods = [];
for (let i = 0, il = internals.extensions.length; i < il; i += 1) {
  internals.methods.push({
    ext: internals.extensions[i],
    transform: internals.transform,
  });
}

module.exports = internals.methods;
