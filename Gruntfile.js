module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'app/**/*.css',
            'app/**/*.js',
            'app/**/*.html'
          ]
        },
        options: {
          proxy: "localhost:8001",
          watchTask: true
        }
      }
    },
    
    karma: {
      options: {
        configFile: 'config/karma.conf.js'
      },
      unit: {
        singleRun: true
      },
      
      continuous: {
        singleRun: false,
        autoWatch: true
      }
    },
    
    html2js: {
      options: {
        base: 'app'
      },
      dist: {
        src: ['app/**/*.html'],
        dest: 'tmp/templates.js'
      }
    },
    
    concat: {
      options: {
        separator: ';',
        sourceMap: true
      },
      dist: {
        src: [
          'tmp/*.js',
          'app/**/*.module.js',
          'app/**/*.js',
          '!app/**/*.spec.js'
        ],
        dest: 'public/js/app.min.js'
      },
      vendor: {
        src: [
          'bower_components/angular/angular.min.js',
          'bower_components/angular-ui-router/release/angular-ui-router.min.js',
          'bower_components/angular-animate/angular-animate.min.js',
          'bower_components/angular-aria/angular-aria.min.js',
          'bower_components/angular-messages/angular-messages.min.js',
          'bower_components/angular-material/angular-material.min.js',
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js'
        ],
        dest: 'public/js/vendor.min.js'
      },
      css: {
        src: [
          'bower_components/bootstrap/dist/css/bootstrap.min.css',
          'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
          'bower_components/angular-material/angular-material.min.css'
        ],
        dest: 'public/css/vendor.css'
      }
    },
    
    less: {
      dev: {
        options: {
          sourceMap: true,
          sourceMapFilename: 'public/css/main.css.map',
          sourceMapURL: '/css/main.css.map',
          sourceMapBasepath: 'public',
          sourceMapRootpath: '/',
          paths: ['app/main.less']
        },
        files: {
          'public/css/main.css': 'app/main.less'
        }
      },
      prod: {
        options: {
          paths: ['app/main.less'],
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
            new (require('less-plugin-clean-css'))
          ]
        },
        files: {
          'public/css/main.css': 'app/main.less'
        }
      }
    },
    
    uglify: {
      dist: {
        files: {
          'public/js/app.min.js': ['public/js/app.min.js'],
          'public/js/vendor.min.js': ['public/js/vendor.min.js']
        },
        options: {
          /*Or use $inject instead*/
          mangle: false,
          sourceMap : true,
          sourceMapIncludeSources : true,
          sourceMapIn : 'public/js/app.min.js.map'
        }
      }
    },
    
    clean: {
      temp: {
        src: [ 'tmp' ]
      }
    },
    
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'app/', src: ['fonts/**'], dest: 'public/'}
        ]
      }
    },
    
    watch: {
      dev: {
        files: [ 'Gruntfile.js', 'app/**/*.js', 'app/**/*.html', 'app/**/*.less' ],
        tasks: [ 'html2js:dist', 'concat:dist', 'concat:vendor', 'concat:css', 'less:dev', 'clean:temp', 'copy:main' ],
        options: {
          atBegin: true
        }
      },
      min: {
        files: [ 'Gruntfile.js', 'app/**/*.js', '*.html' ],
        tasks: [ 'karma:unit', 'html2js:dist', 'concat:dist', 'clean:temp', 'uglify:dist' ],
        options: {
          atBegin: true
        }
      }
    }
    
  });
  
  // Load the plugin that provides the task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  
  // Build tasks.
  grunt.registerTask('dev', [ 'browserSync', 'watch:dev' ]);
  grunt.registerTask('test', [ 'karma:continuous' ]);
  grunt.registerTask('minified', [ 'browserSync', 'watch:min' ]);
  
};