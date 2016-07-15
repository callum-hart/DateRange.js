module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-contrib-coffee");
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.initConfig({
    coffee: {
      compile: {
        files: {
          "lib/js/date-range.js": "src/coffee/date-range.coffee",
          "docs/dist/js/docs.js": "docs/src/coffee/docs.coffee"
        }
      }
    },
    less: {
      development: {
        files: {
          "lib/css/date-range.css": "src/less/date-range.less",
          "docs/dist/css/docs.css": "docs/src/less/docs.less"
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          "lib/js/date-range.min.js": "lib/js/date-range.js"
        }
      }
    },
    cssmin: {
      my_target: {
        src: "lib/css/date-range.css",
        dest: "lib/css/date-range.min.css"
      }
    },
    watch: {
      files: ["src/less/*", "src/coffee/*", "docs/src/less/*", "docs/src/coffee/*"],
      tasks: ["coffee", "less", "uglify", "cssmin"],
      options: {
        livereload: true
      }
    }
  });
};