const {
    src,
    dest
} = require("gulp");

require("gulp");

//Defino una tarea que devuelve un stream que concatena todos los
// archivos de la carpeta css en un solo archivo final.css y lo deja en
// la misma carpeta
function concatenar() {
    return src("./css/*")
        .pipe(concat("final.css"))
        .pipe(dest("./css/"));
}

///Defino una tarea que devuelve un stream que minimiza el contenido del fichero final.css, le cambia el nombre poniendo el sufijo .min y lo deja en la misma carpeta
function min_and_rename() {
    return src("./css/final.css")
        .pipe(pleeease())
        .pipe(
            rename({
                suffix: ".min",
                extname: ".css"
            })
        )
        .pipe(dest("./css/"));
}

//Borra el archivo final generado (callbacks). En este caso no hay stream
function borrado(cb) {
    del("./dist/css/final.css");
    cb();
}

//Tarea para generar el CSS a partir de los ficheros Sass
function generar() {
    return src("./scss/styles.scss")
        .pipe(sass())
        .pipe(dest('./dist/css/'));
}

//Opciones para el módulo sassdoc
var doc_options = {
    dest: 'docs' //Ruta de destino a la documentación
}

//Tarea para generar los documentos de los ficheros Scss
function generar_docs() {
    return src("./scss/styles.scss")
        .pipe(sassdoc(doc_options));
}

//Opciones que vamos a usar como condiciones del plugin gulpif
var options = {
    minimize: false,
    rename: true
}

function min_and_rename() {
    return src("./dist/css/final.css")
        // Si minimize es true se aplica la tarea
        .pipe(gulpif(options.minimize, pleeease()))
        // Si la opción de rename es true se aplica la tarea de renombrado
        .pipe(gulpif(options.rename,
            rename({
                suffix: ".min",
                extname: ".css"
            })
        ))
        .pipe(dest("./dist/css/"));
}

function moverassets() {
    return src("./assets/**", {
        base: './'
    }).pipe(dest("./dist/"));
}

exports.moverassets = moverassets