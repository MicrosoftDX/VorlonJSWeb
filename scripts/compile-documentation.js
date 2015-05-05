var marked = require('meta-marked');
var Parser = require('parse5').Parser;
var Serializer = require('parse5').Serializer;
var fs = require('fs');
var path = require('path');
var slugify = require('slug');

var DOC_ROOT = path.join(__dirname, '../documentation');

module.exports = function (done) {
  var markdown = fs.readdirSync(DOC_ROOT)
                    .filter(function (f) {
                      return f.match(/\.md$/);
                    })
                    .map(function (f) {
                      return fs.readFileSync(path.join(DOC_ROOT, f)).toString();
                    })
                    .map(function (md) {
                      return marked(md);
                    })
                    .sort(function (a, b) {
                      return parseInt(a.meta.sequence, 10) > parseInt(b.meta.sequence) ? 1 : -1;
                    })
                    .map(function (md) {
                      md.html = [
                        '<h1>'+md.meta.title+'</h1>',
                        md.html
                      ].join('\n');
                      return md;
                    })
                    .map(function (md) {
                      var parsed = findAndInsertHeaders(md.html);
                      md.html = parsed.html;
                      md.headers = parsed.headers
                      return md;
                    });

  fs.writeFileSync(path.join(__dirname, '../data/documentation.json'), JSON.stringify(markdown));

  done();
};


function findAndInsertHeaders(html) {
  var parser = new Parser();
  var serializer = new Serializer();

  var fragment = parser.parseFragment(html);
  var newChildNodes = [];
  var headers = [];
  fragment.childNodes.forEach(function (n) {
    var m;

    if (m = n.nodeName.match(/h(\d)/)) {
      var text = n.childNodes.filter(function (n) { return n.nodeName === '#text' })[0].value;
      var slug = slugify(text).toLowerCase();
      headers.push({
        depth: m[1],
        title: text,
        slug: slug,
      });
      newChildNodes.push({
        nodeName: 'a',
        tagName: 'a',
        attrs: [ { name: 'name', value: slug } ],
        namespaceURI: n.namespaceURI,
        parentNode: n.parentNode
      });
      newChildNodes.push(n);
    } else {
      newChildNodes.push(n);
    }
  });

  fragment.childNodes = newChildNodes;

  return {
    html: serializer.serialize(fragment),
    headers: headers
  };
};


if (require.main === module) {
  module.exports();
}
