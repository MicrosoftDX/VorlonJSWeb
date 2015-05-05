// Configuration //////////////////////////////////////////////////////////////
var ORG = 'AmpersandJS';
var REPO = 'ampersand-state';
var CORE_OUTPUT_FILE = __dirname + '/../data/core-contributors.json';
var COMMUNITY_OUTPUT_FILE = __dirname + '/../data/community-contributors.json';

var CORE_CONTRIBUTORS = [
    'deltakosh',
    'davrous',
    'meulta',
    'pierlag'
];

// Code ///////////////////////////////////////////////////////////////////////
var GitHubApi = require("github");
var Request = require('request');
var _ = require('lodash');
var fs = require('fs');


CORE_CONTRIBUTORS = CORE_CONTRIBUTORS.map(function (username) {
    return username.toLowerCase();
});

module.exports = function (done) {
  Request.get('https://api.github.com/repos/' + ORG + '/' + REPO + '/stats/contributors', {
      headers: {
          'User-Agent': 'an-amp-thing'
      }
  }, function (err, resp, body) {
      if (err) {
          throw err;
      }

      try {
          body = JSON.parse(body)
      } catch (e) {
          throw e;
      }

      var users = body.map(function (item) {
          var author = item.author;

          return {
              id: author.id,
              username: author.login,
              avatarUrl: author.avatar_url,
              url: author.html_url,
              contributions: item.total,
          }
      });

      users = _.sortBy(users, function (user) { return -user.contributions });

      var coreContributors = users.filter(function (u) {
          return _.contains(CORE_CONTRIBUTORS, u.username.toLowerCase());
      });

      var communityContributors = users.filter(function (u) {
          return !_.contains(CORE_CONTRIBUTORS, u.username.toLowerCase());
      });

      fs.writeFileSync(CORE_OUTPUT_FILE, JSON.stringify(coreContributors, null, 2));
      fs.writeFileSync(COMMUNITY_OUTPUT_FILE, JSON.stringify(communityContributors, null, 2));
  });
};


if (require.main === module) {
  module.exports();
}
