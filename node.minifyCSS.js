const fs = require('fs');
const csso = require('csso');

const CSSFILE = './dist/assets/css/style.css';

function readFile(src) {
  return fs.readFileSync(src, { encoding: 'utf8' });
}

function buildCSS() {
  const data = readFile(CSSFILE);
  var result = csso.minify(data, {
    // restructure: true,   // don't change CSS structure, i.e. don't merge declarations, rulesets etc
    // debug: true           // show additional debug information:
                          // true or number from 1 to 3 (greater number - more details)
    comments: false
  });
  fs.writeFileSync(CSSFILE, result.css);
}

buildCSS();