var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    concat = require('gulp-concat'),
    minify = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    plumber = require('gulp-plumber'),
    bytediff = require('gulp-bytediff'),
    del = require('del'),
    browserSync = require("browser-sync").create();

// Put this after including our dependencies
var paths = {
    styles: {
        // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
        src: ['scss/*.scss'],
        // Compiled files will end up in whichever folder it's found in (partials are not compiled)
        dest: "css/"
    }

};

// Define tasks after requiring dependencies
function style() {
    // Where should gulp look for the sass files?
    // My .sass files are stored in the styles folder
    // (If you want to use scss files, simply look for *.scss files instead)
    return (
        gulp
            .src(paths.styles.src)
            // Initialize sourcemaps before compilation starts
            .pipe(sourcemaps.init())
            // Use sass with the files found, and log any errors
            .pipe(sass())
            .on("error", sass.logError)
            // concatenate the file into 1 file
            .pipe(concat('styles.min.css'))
            // minify the css style
            //.pipe(minify())
            // Use postcss with autoprefixer and compress the compiled file using cssnano
            //.pipe(postcss([autoprefixer(), cssnano()]))
            // What is the destination for the compiled file?
            .pipe(gulp.dest(paths.styles.dest))
            // Add browsersync stream pipe after compilation
            .pipe(browserSync.stream())
    );
}
	
function watch(){
    browserSync.init({
        // You can tell browserSync to use this directory and serve it as a mini-server
        server: {
            baseDir: "D:/Web/advancedcss-sass/"
        }
        // If you are already serving your website locally using something like apache
        // You can use the proxy setting to proxy that instead
        // proxy: "yourlocal.dev"
    });
    // gulp.watch takes in the location of the files to watch for changes
    // and the name of the function we want to run on change
    gulp.watch(paths.styles.src, style)

    // We should tell gulp which files to watch to trigger the reload
    // This can be html or whatever you're using to develop your website
    // Note -- you can obviously add the path to the Paths object
    gulp.watch("*.html", reload);
}

function clean(){
    return(
        del(['css/style.min.js'])
    )
}
	
// A simple task to reload the page
function reload() {
    browserSync.reload();
}
 

 
// Don't forget to expose the task!
exports.watch = watch
exports.clean = clean