path = require 'path'

module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    app:
      src: 'app'
      dest: 'dist'
      bower: '<%= app.src %>/bower_components'
      images: '<%= app.src %>/images'
      css: '<%= app.src %>/css'
      js: '<%= app.src %>/js'
      partials: '<%= app.src %>/partials'

    clean:
      before: ['<%= app.dest %>/*', '!<%= app.dest %>/assets']
      after: [
        '<%= app.dest %>/css/style.css'
        '<%= app.dest %>/js/main.js'
        '<%= app.dest %>/js/vendor.js'
        '<%= app.js %>/partials.js'
      ]

    copy:
      css:
        flatten: true
        expand: true
        cwd: ''
        src: '<%= app.css %>/style.css'
        dest: '<%= app.dest %>/css/'
      js:
        flatten: true
        expand: true
        cwd: ''
        src: ['<%= app.js %>/vendor.js', '<%= app.js %>/main.js']
        dest: '<%= app.dest %>/js/'
      fonts:
        flatten: true
        expand: true
        cwd: ''
        src: '<%= app.src %>/fonts/*'
        dest: '<%= app.dest %>/fonts/'
      images:
        flatten: true
        expand: true
        cwd: ''
        src: '<%= app.src %>/images/*'
        dest: '<%= app.dest %>/images/'
      html:
        flatten: true
        expand: true
        cwd: ''
        src: ['<%= app.src %>/landing.html', '<%= app.src %>/index.html', '<%= app.src %>/.htaccess']
        dest: '<%= app.dest %>/'
      docs:
        cwd: ''
        flatten: true
        expand: true
        src: '<%= app.src %>/docs'
        dest: '<%= app.dest %>/docs'

    concat:
      css:
        options:
          sourceMap: true
        src: [
          '<%= app.css %>/bootstrap.css'
          '<%= app.css %>/font-awesome.css'
          '<%= app.css %>/fonts.css'
          '<%= app.css %>/main.css'
          '<%= app.css %>/main-responsive.css'
          '<%= app.css %>/bootstrap-colorpalette.css'
          '<%= app.css %>/perfect-scrollbar-rtl.css'
          '<%= app.css %>/theme_light.css'
          '<%= app.css %>/rtl-version.css'
          '<%= app.css %>/peeps.css'
          '<%= app.css %>/peeps-theme.css'
          '<%= app.css %>/print.css'
          '<%= app.css %>/vlad.css'
          '<%= app.bower %>/ng-notifications-bar/dist/ngNotificationsBar.min.css'
          '!<%= app.css %>/style.css'
        ]
        dest: '<%= app.css %>/style.css'
      js_vendor:
        src: [
          '<%= app.bower %>/jquery/dist/jquery.min.js'
          '<%= app.bower %>/underscore/underscore.js'
          '<%= app.bower %>/moment/min/moment-with-locales.min.js'
          '<%= app.bower %>/angular/angular.js'
          '<%= app.bower %>/angular-cookies/angular-cookies.min.js'
          '<%= app.bower %>/angular-ui-router/release/angular-ui-router.js'
          '<%= app.bower %>/angular-resource/angular-resource.min.js'
          '<%= app.bower %>/angular-moment/angular-moment.min.js'
          '<%= app.bower %>/angular-bootstrap/ui-bootstrap.min.js'
          '<%= app.bower %>/angular-bootstrap/ui-bootstrap-tpls.min.js'
          '<%= app.bower %>/ng-notifications-bar/dist/ngNotificationsBar.min.js'
        ]
        dest: '<%= app.js %>/vendor.js'
      js_main:
        options:
          sourceMap: true
        src: [
          '<%= app.js %>/**/*.js'
          '<%= app.partials %>/**/*.js'
          '!<%= app.js %>/vendor.js'
          '!<%= app.js %>/main.js'
        ]
        dest: '<%= app.js %>/main.js'

    filerev:
      options:
        algorithm: 'md5',
        length: 8
      css:
        src: '<%= app.dest %>/css/*.css'
        dest: '<%= app.dest %>/css/'
      js:
        src: '<%= app.dest %>/js/*.js'
        dest: '<%= app.dest %>/js/'

    useminPrepare:
      html: '<%= app.dest %>/index.html'
      options:
        flow:
          steps:
            js: ['uglifyjs']
            css: ['cssmin']
          post: []

    usemin:
      html: '<%= app.dest %>/index.html'

    uglify:
      options:
        mangle: false

    ngtemplates:
      peeps:
        cwd: '<%= app.src %>'
        src: 'partials/**/*.html'
        dest: '<%= app.js %>/partials.js'

    watch:
      options:
        spawn: true
        interrupt: true
      scripts:
        files: ['<%= app.js %>/**/*.js', '<%= app.partials %>/**/*.js', '!<%= app.js %>/main.js', '!<%= app.js %>/vendor.js', '!<%= app.js %>/partials.js']
        tasks: ['concat:js_main']
      styles:
        files: ['<%= app.css %>/*.css', '!<%= app.css %>/default.*']
        tasks: ['concat:css']

    nodestatic:
      server:
        options:
          keepalive: true
          port: 8080
          base: '<%= app.src %>'

    auto_install:
      local: {}

  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-usemin'
  grunt.loadNpmTasks 'grunt-filerev'
  grunt.loadNpmTasks 'grunt-angular-templates'
  grunt.loadNpmTasks 'grunt-nodestatic'
  grunt.loadNpmTasks 'grunt-auto-install'

  # Default task for development
  grunt.registerTask 'default', [
    'auto_install'
    'concat'
    'watch'
  ]

  # Local run task
  grunt.registerTask 'run', [
    'auto_install'
    'concat'
    'nodestatic'
  ]

  # Release build task
  grunt.registerTask 'release', [
    'auto_install'
    'ngtemplates'
    'concat'
    'clean:before'
    'copy'
    'useminPrepare'
    'cssmin'
    'uglify'
    'filerev'
    'clean:after'
    'usemin'
  ]