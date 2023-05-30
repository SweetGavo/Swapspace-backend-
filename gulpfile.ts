import gulp from 'gulp';

gulp.task('copy-prisma', function () {
  return gulp.src('prisma/**/*')
    .pipe(gulp.dest('dist/prisma'));
});

gulp.task('watch', function () {
  gulp.watch('prisma/**/*', gulp.series('copy-prisma'));
});

gulp.task('build', gulp.series('copy-prisma'));

gulp.task('default', gulp.series('build', 'watch'));
