module.exports = function(grunt) {

  grunt.initConfig({
    jsAppDir: 'public/js/',
    jsVendorDir: 'bower_components/',
    jsDistDir: 'dist/js/',
    scssDir: 'public/css/',
    cssDistDir: 'dist/stylesheets/',
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      index: {
        expand: true,
        cwd: 'public/',
        src: 'index.html',
        dest: 'dist/'
      },
      images: {
        expand: true,
        cwd: 'public/',
        src: 'images/*',
        dest: 'dist/'
      },
      templates: {
        expand: true,
        cwd: 'public/js/',
        src: '**/*.html',
        dest: 'dist/templates/',
        flatten: true
      }
    },
    concat: {
      js: {
        options: {
          separator: ';'
        },
        src: ['<%=jsAppDir%>*.js', '<%=jsAppDir%>**/*.js'],
        dest: '<%=jsDistDir%><%= pkg.name %>.js'
      },
      vendorJs : {
        options: {
          separator: ';'
        },
        src: [
          '<%=jsVendorDir%>angular/*.js',
          '<%=jsVendorDir%>angular-route/*.js',
          '<%=jsVendorDir%>angular-animate/*.js',
          '<%=jsVendorDir%>firebase/*.js',
          '<%=jsVendorDir%>angularfire/dist/*.js',
          '<%=jsVendorDir%>firebase-simple-login/*.js',
          '!<%=jsVendorDir%>**/*.min.js',
          '!<%=jsVendorDir%>**/*-debug.js'],
        dest: '<%=jsDistDir%>vendor.js'
      },
      scss: {
        src: ['<%=scssDir%>*.scss'],
        dest: '<%=cssDistDir%><%= pkg.name %>.css'
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '<%=jsDistDir%><%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    cssmin: {
      add_banner: {
        options: {
          banner: '/*! <%= pkg.name %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        files: {
          '<%=cssDistDir%><%= pkg.name %>.min.css': ['<%= concat.scss.dest %>']
        }
      }
    },
    sass: {
      dist: {
        files: {
          '<%=cssDistDir%><%= pkg.name %>.css' : '<%=cssDistDir%><%= pkg.name %>.css'
        }
      }
    },
    watch: {
      // TODO: Do these tasks conditionally?
      files: ['<%=jsAppDir%>**/*.js', '<%=jsAppDir%>**/*.html', '<%=jsVendorDir%>**/*.js', '<%=scssDir%>*.scss', 'public/index.html', 'public/images/*'],
      tasks: ['copy', 'concat', 'sass', 'uglify', 'cssmin']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', [
    'copy',
    'concat',
    'uglify',
    'cssmin',
    'sass',
    'watch'
  ]);

};
