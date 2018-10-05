const gulp = require('gulp');

const typescript = require('gulp-typescript');
const install = require('gulp-install');
const del = require('del');
const once = require('async-once');
const zip = require('gulp-zip');

gulp.task('clean', done => {
    del.sync(['dist', 'dist.zip']);
    done();
});

gulp.task('compile', () => {
    return gulp.src('*.ts')
        .pipe(typescript.createProject("../../tsconfig.json")())
        .pipe(gulp.dest('dist'));
});

gulp.task('install-dependencies', () => {
    return gulp.src("./package.json")
        .pipe(gulp.dest('dist'))
        .pipe(install({
            production: true
        }));
});

gulp.task('package', gulp.series('clean', 'compile', 'install-dependencies', ()=>{
  return gulp.src("dist/*")
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest('./'));
}));

gulp.task('default', gulp.parallel('compile', 'install-dependencies'));
