const{src, dest, watch,parallel} = require("gulp");

// CSS
const sass = require ("gulp-sass")(require('sass'));
const plumber = require ('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano')
const postcss = require('gulp-postcss')
const sourcemaps = require ('gulp-sourcemaps')

// IMAGENES
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

//JAVASCRIPT
const terser = require('gulp-terser-js');

function css(done){

    src("src/scss/**/*.scss")  //IDENTIFICAR ARCHIVO SAAS
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())            //COMPILARLO .pipe(sass)
        .pipe(postcss([autoprefixer(),cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/css"));  //ALMACENARLO EN DISCO DURO

    done(); //
}

function imagenes(done){
    const opciones = {
        optimizationLevel:3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin()))
        .pipe (dest('build/img'))
        done();
}
function versionWebp (done){

    const opciones = {
        quality: 50
    };    

    src('src/img/**/*.{png,jpg}')
    .pipe(webp(opciones))
    .pipe(dest('build/img'))

    done();
    
}
function javascript(done){
    src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/js'));
    done();

}
function dev(done){
watch("src/scss/**/*.scss", css)
watch("src/js/**/*.js", javascript)

done()
}

exports.css = css;
exports.js = javascript;
exports.versionWebp = versionWebp;
exports.dev = parallel(versionWebp,dev,imagenes,javascript);



 