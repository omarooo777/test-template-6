const gulp = require("gulp"),
  autoprefixer = require("gulp-autoprefixer"),
  babel = require("gulp-babel"),
  concat = require("gulp-concat"),
  pug = require("gulp-pug"),
  livereload = require("gulp-livereload"),
  sass = require("gulp-sass")(require("sass")),
  sourcemaps = require("gulp-sourcemaps"),
  uglify = require("gulp-uglify"),
  newer = require("gulp-newer"),
  zip = require("gulp-zip");

// HTML Task
gulp.task("html", async function () {
  return gulp
    .src("project/html/*.pug")
    .pipe(newer("project/html/*.*"))
    .pipe(pug())
    .pipe(gulp.dest("dist"))
    .pipe(livereload());
});

// CSS Task
gulp.task("css", async function () {
  return gulp
    .src(["project/css/**/*.css", "project/css/**/*.scss"])
    .pipe(newer("project/css/**/*.*"))
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(concat("main.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(livereload());
});

// JavaScript Task
gulp.task("js", async function () {
  return gulp
    .src("project/js/*.js")
    .pipe(sourcemaps.init())
    .pipe(newer("project/js/*.*"))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/js"))
    .pipe(livereload());
});

// imgs Task
gulp.task("imgs", async function () {
  return gulp
    .src("project/imgs/**/*.*")
    .pipe(newer("dist/imgs"))
    .pipe(gulp.dest("dist/imgs"))
    .pipe(livereload());
});
// compress Task
// gulp.task("compress", async function () {
//   return gulp.src("dist/**/*.*").pipe(zip("website.zip")).pipe(gulp.dest("."));
// });

// watch Task
gulp.task("watch", function () {
  require("./server");
  livereload.listen();
  gulp.watch("project/html/**/*.pug", gulp.series("html"));
  gulp.watch(
    ["project/css/**/*.css", "project/css/**/*.scss"],
    gulp.series("css")
  );
  gulp.watch("project/js/*.js", gulp.series("js"));
  gulp.watch("project/imgs/**/*.*", gulp.series("imgs"));
  // gulp.watch("dist/**/*.*", gulp.series("compress"));
});

// default Task
gulp.task("default", gulp.series("watch"));
