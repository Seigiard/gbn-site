const fs = require('fs');
const path = require('path');
const minify = require("babel-minify");

const JSDIR = './project/assets/js/';
const JSFILE = './project/assets/js/build.vendor.js';
const DIST_JSFILE = './project/assets/build.vendor.js';
const filepath = path.dirname(JSFILE);

function readFile(src) {
  return fs.readFileSync(src, { encoding: 'utf8' });
}

function buildJS() {
  console.log('rebuild js');
  if(!fs.existsSync(JSFILE)) {
    console.log('file doesn\'t not exist');
    return
  }
  const data = readFile(JSFILE);
  const files = data.split('\n').filter(x => x).map(x => filepath+'/'+x);
  if(!files.length) {
    fs.writeFileSync(DIST_JSFILE, '');
    return;
  }
  const script = files.map(path => {
    if(!fs.existsSync(path)) {
      console.warn(path, ' doesn\'t exist')
      return '';
    }
    const file = readFile(path);
    if(path.includes('/vendor')) {
      return file;
    }
    try {
      const {code, map} = minify(file, {
        mangle: false,
      }, {
        sourceMaps: false,
      });
      return code;
    } catch (ex) {
      return `console.warn("Error is in ${path}")`;
    }
  }).join('\n');

  fs.writeFileSync(DIST_JSFILE, script);
}

if(process.env.NODE_ENV !== 'production') {
  fs.watch(JSDIR, buildJS);
}
buildJS();