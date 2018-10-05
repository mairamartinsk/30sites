// Load Grunt
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // Tasks
    sass: {
      // Begin Sass Plugin
      dist: {
        files: [
          {
            expand: true,
            cwd: "scss",
            src: ["**/*.scss"],
            dest: "css",
            ext: ".css"
          }
        ]
      }
    },

    postcss: {
      // Begin Post CSS Plugin
      options: {
        map: false,
        processors: [
          require("autoprefixer")({
            browsers: ["last 2 versions"]
          })
        ]
      },
      dist: {
        src: "css/*.css"
      }
    },

    cssmin: {
      // Begin CSS Minify Plugin
      target: {
        files: [
          {
            expand: true,
            cwd: "css",
            src: ["*.css", "!*.min.css"],
            dest: "css",
            ext: ".min.css"
          }
        ]
      }
    },

    watch: {
      // Compile everything into one task with Watch Plugin
      css: {
        files: "**/*.scss",
        tasks: ["sass", "postcss", "cssmin"]
      }
    }
  });

  // Load Grunt plugins
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-postcss");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-watch");

  // Register Grunt tasks
  grunt.registerTask("default", ["watch"]);
};
