// ----------------------------------- //
// ---------- Gulp packages ---------- //
// ----------------------------------- //

const config       = require('./gulpConfig');

// General
const argv         = require('minimist')(process.argv.slice(2)),
      beep         = require('beepbeep'),
      del          = require('del'),
      gulp         = require('gulp'),
      noop         = require('gulp-noop'),
      rename       = require('gulp-rename'),
      sourcemaps   = require('gulp-sourcemaps');

// Styles
const autoprefixer = config.settings.styles ? require('autoprefixer') : null,
      cssnano      = config.settings.styles ? require('cssnano') : null,
      postcss      = config.settings.styles ? require('gulp-postcss') : null,
      sass         = config.settings.styles ? require('gulp-sass') : null,
      sassGlob     = config.settings.styles ? require('gulp-sass-glob') : null;

// Scripts
const concat       = (config.settings.scripts | config.settings.standaloneScripts) ? require('gulp-concat') : null,
      uglify       = (config.settings.scripts | config.settings.standaloneScripts) ? require('gulp-uglify') : null;

// SVG
const svgSprite    = (config.settings.svgIcons | config.settings.svgInline | config.settings.svgSprite) ? require('gulp-svg-sprite') : null;



// ----------------------------------- //
// -------------- Flags -------------- //
// ----------------------------------- //

var isProduction       = false;

if(argv.prod === true) {
  isProduction   = true;
}



// ----------------------------------- //
// -------------- Tasks -------------- //
// ----------------------------------- //

// Styles
function styles(done) {
  if (!config.settings.styles) return done();

  var plugins = [
    autoprefixer(),
    cssnano()
  ];

  return gulp.src(config.styles.src)
    .pipe(isProduction ? noop() : sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({outputStyle: 'compact'}))
    .on('error', swallowError)
    .pipe(isProduction ? postcss(plugins) : postcss([autoprefixer()]))
    .pipe(rename(config.styles.filename))
    .pipe(isProduction ? noop() : sourcemaps.write('.'))
    .pipe(gulp.dest(config.styles.build))
    //.pipe(gulp.dest(config.copy.dest + '/css/'))
}

// Table of Content
function toc(done) {
  if (!config.settings.toc) return done()

  return gulp.src(config.toc.src)
    .pipe(sassGlob())
    .pipe(sass())
    .on('error', swallowError)
    .pipe(gulp.dest(config.toc.build))
    .pipe(gulp.dest(config.copy.dest + '/css/'))
}

// Patternlab
function patternlab(done) {
  if (!config.settings.patternlab) return done()

  return gulp.src(config.patternlab.src)
    .pipe(sassGlob())
    .pipe(sass())
    .on('error', swallowError)
    .pipe(gulp.dest(config.patternlab.build))
}


// Scripts
function scripts(done) {
  if (!config.settings.scripts) return done();

  return gulp.src(config.scripts.src.concat)
    .pipe(isProduction ? noop() : sourcemaps.init())
    .pipe(concat(config.scripts.filename))
    .on('error', swallowError)
    .pipe(isProduction ? uglify() : noop())
    .pipe(rename({ suffix: config.scripts.suffix }))
    .pipe(isProduction ? noop() : sourcemaps.write('.'))
    .pipe(gulp.dest(config.scripts.build))
    .pipe(gulp.dest(config.copy.dest + '/scripts/'))
}

function standalones(done) {
  if (!config.settings.standaloneScripts) return done();

  return gulp.src(config.scripts.src.standalones)
    .pipe(gulp.dest(config.scripts.build))
    .pipe(gulp.dest(config.copy.dest + '/scripts/'))
}


// Images
function images(done) {
  if (!config.settings.images) return done();

  return gulp.src(config.images.src)
    .pipe(gulp.dest(config.images.build))
    .pipe(gulp.dest(config.copy.dest + '/images/'))
}


// SVG
function icons(done) {
  if (!config.settings.svgIcons) return done();

  return gulp.src(config.svg.icons.src)
    .pipe(svgSprite({ svg: config.svg.parameters, mode: config.svg.icons.mode }))
    .pipe(gulp.dest(config.svg.build))
    //.pipe(gulp.dest(config.copy.dest + '/images/'))
}

function inline(done) {
  if (!config.settings.svgInline) return done();

  return gulp.src(config.svg.inline.src)
    .pipe(svgSprite({ svg: config.svg.parameters, mode: config.svg.inline.mode }))
    .pipe(gulp.dest(config.svg.build))
    .pipe(gulp.dest(config.copy.dest + '/images/'))
}

function sprite(done) {
  if (!config.settings.svgSprite) return done();

  return gulp.src(config.svg.sprite.src)
    .pipe(svgSprite({ svg: config.svg.parameters, mode: config.svg.sprite.mode }))
    .pipe(gulp.dest(config.svg.build))
    .pipe(gulp.dest(config.copy.dest + '/images/'))
}


// Fonts
function fonts(done) {
  if (!config.settings.fonts) return done();

  return gulp.src(config.fonts.src)
    .pipe(gulp.dest(config.fonts.build))
    //.pipe(gulp.dest(config.copy.dest + '/fonts/'))
}


// Cleanup
function cleanup() {
  var paths = [
    config.paths.build
  ];
  return del(paths);
}


// Watch
function watch() {
  if (config.settings.styles)            gulp.watch(config.toc.watch, styles);
  if (config.settings.toc)               gulp.watch(config.toc.watch, toc);
  if (config.settings.scripts)           gulp.watch(config.scripts.src.concat, scripts);
  if (config.settings.standaloneScripts) gulp.watch(config.scripts.src.standalones, standalones);
  if (config.settings.images)            gulp.watch(config.images.src, images);
  if (config.settings.svgIcons)          gulp.watch(config.svg.icons.src, icons);
  if (config.settings.svgInline)         gulp.watch(config.svg.inline.src, inline);
  if (config.settings.svgSprite)         gulp.watch(config.svg.sprite.src, sprite);
  if (config.settings.fonts)             gulp.watch(config.fonts.src, fonts);
}


// Prevent errors from breaking gulp watch
function swallowError (error) {
  console.log(error.toString());
  beep();
  this.emit('end');
}



// ----------------------------------- //
// ------------- Commands ------------ //
// ----------------------------------- //

var run  = gulp.parallel(styles, toc, patternlab, scripts, standalones, images, icons, inline, sprite, fonts),
    dev  = gulp.series(run, watch),
    prod = gulp.series(run);

isProduction ? gulp.task('default', prod) : gulp.task('default', dev );
