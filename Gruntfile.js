module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('getContributors', 'Grabs contributor data from github', function () {
      var done = this.async();
      require('./scripts/get-contributors')(done);
    });

    grunt.registerTask('compileDocumentation', 'Compile documentation', function () {
      var done = this.async();
      require('./scripts/compile-documentation')(done);
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '.'
                }
            }
        },

        jade: {
            compile: {
                options: {
                    pretty: true,
                    data: function (dest, srce) {
                        return {
                            coreContributors: require('./data/core-contributors.json'),
                            communityContributors: require('./data/community-contributors.json'),
                            documentation: require('./data/documentation.json')
                        }
                    }
                },
                files: {
                    "index.html": ["index.jade"],
                    "404.html": ["404.jade"],
                    "community/index.html": ["community/community.jade"],
                    "documentation/index.html": ["documentation/documentation.jade"],
                    "plugins/index.html": ["plugins/plugins.jade"],
                }
            }
        },

        stylus: {
            compile: {
                options: {
                    use: [
                        require('autoprefixer-stylus')
                    ]
                },

                files: {
                    "css/main.css": ["css/main.styl"]
                }
            }
        },

        watch: {
            build: {
                files: ["css/**/*.styl", "**/*.jade", "documentation/*.md"],
                tasks: ["build"],
                options: {
                    livereload: true
                }
            }
        }
    });

    // Default task(s).
    grunt.registerTask('build', ['compileDocumentation', 'jade', 'stylus']);
    grunt.registerTask('serve', ['connect', 'build', 'watch']);
    grunt.registerTask('default', ['build']);
};
