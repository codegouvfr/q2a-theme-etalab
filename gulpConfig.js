// ------------------------------------ //
// --------- Settings & Paths --------- //
// ------------------------------------ //

const rootPath  = '.';
const srcPath   = rootPath + '/src';
const buildPath = rootPath + '/Etalab';

module.exports = {
  settings: {
    styles            : true,
    toc               : false,
    patternlab        : false,
    scripts           : false,
    standaloneScripts : false,
    svgIcons          : true,
    svgInline         : false,
    svgSprite         : false,
    images            : false,
    fonts             : false
  },
  paths: {
    build    : buildPath
  },
  styles: {
    src      : srcPath   + '/style.scss',
    build    : buildPath,
    filename : 'qa-styles.css'
  },
  toc: {
    src      : srcPath + '/styles/toc.scss',
    watch    : srcPath + '/scss/**/*.scss',
    build    : buildPath + '/css'
  },
  patternlab: {
    src      : srcPath + '/styles/pattern-scaffolding.scss',
    build    : buildPath + '/css'
  },
  scripts: {
    src: {
      standalones : srcPath   + '/scripts/standalones/**/*.js',
      concat      : [
        srcPath       + '/scripts/vendors/**/*.js',
        srcPath       + '/scripts/custom/**/*.js',
        '!' + srcPath + '/scripts/standalones/**/*.js'
      ]
    },
    build    : buildPath + '/js',
    filename : 'script.js',
    suffix   : ''
  },
  fonts: {
    src      : srcPath   + '/fonts/**/*.+(eot|svg|ttf|woff|woff2)',
    build    : buildPath + '/fonts'
  },
  images: {
    src      : srcPath   + '/images/**/*.+(png|jpg|jpeg|gif|svg)',
    build    : buildPath + '/images'
  },
  svg: {
    inline: {
      src: srcPath + '/svg/inline/**/*.svg',
      mode: {
        symbol: {
          dest   : './',
          sprite : 'inline.svg',
          bust   : false
        }
      }
    },
    icons: {
      src: srcPath + '/svg/icon/**/*.svg',
      mode: {
        stack: {
          dest   : './',
          sprite : 'icon.svg',
          bust   : false
        }
      }
    },
    sprite: {
      src: srcPath + '/svg/sprite/**/*.svg',
      mode: {
        stack: {
          dest   : './',
          sprite : 'sprite.svg',
          bust   : false
        }
      }
    },
    build: buildPath + '/images',
    parameters: {
      xmlDeclaration      : false,
      doctypeDeclaration  : false,
      dimensionAttributes : false
    }
  }
}
