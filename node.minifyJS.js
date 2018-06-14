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
  if(!fs.existsSync(JSFILE)) {
    return
  }
  const data = readFile(JSFILE);
  const files = data.split('\n').filter(x => x).map(x => filepath+'/'+x);
  if(!files.length) {
    fs.writeFileSync(DIST_JSFILE, '');
    return;
  }
  const script = files.map(path => {
    const file = readFile(path);
    if(path.includes('/vendor')) {
      return file;
    }
    const {code, map} = minify(file, {
      mangle: false,
    }, {
      sourceMaps: false,
    });
    return code;
  }).join('\n');

  fs.writeFileSync(DIST_JSFILE, script);
}

if(process.env.NODE_ENV !== 'production') {
  fs.watch(JSDIR, buildJS);
}
buildJS();