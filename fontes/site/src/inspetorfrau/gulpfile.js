/**
 * Settings
 * Turn on/off build features
 */

var settings = {
	clean: true,
	scripts: true,
	polyfills: false,
	styles: true,
	svgs: true,
	copy: true,
	favicon: true,
	imgs: true,
	fonts: true,
	packages: true
};


/**
 * Paths to project folders
 */

var paths = {
	input: ['!src/js/*.min.js', 'src/'],
	output: 'dist/',
	scripts: {
		input: ['src/js/*.js', '!src/js/*.min.js'],
		polyfills: '.polyfill.js',
		output: 'dist/js/'
	},
	styles: {
		input: [
			'src/scss/main.scss'
		],
		output: 'dist/css/'
	},
	svgs: {
		input: 'src/svg/*.svg',
		output: 'dist/svg/'
	},
	copy: {
		input: 'src/copy/**/*',
		output: 'dist/'
	},
	favicon: {
		input: ['src/favicon/*.png', 'src/favicon/*.ico'],
		output: 'dist/favicon/'
	},
	imgs: {
		input: 'src/img/**/*',
		output: 'dist/img/'
	},
	fonts: {
		input: ['src/fonts/**/*'],
		output: 'dist/fonts/'
	},
	packages: {
		input: ['src/plugins/**/*'],
		output: 'dist/plugins/'
	},
	reload: './dist/'
};


/**
 * Template for banner to add to file headers
 */

var banner = {
	main: '/*!' +
		' <%= package.name %> v<%= package.version %>' +
		' | (c) ' + new Date().getFullYear() + ' <%= package.author.name %>' +
		' | <%= package.license %> License' +
		' | <%= package.repository.url %>' +
		' */\n'
};


/**
 * Gulp Packages
 */

// General
var {
	src,
	dest,
	watch,
	series,
	parallel
} = require('gulp');
var del = require('del');
var flatmap = require('gulp-flatmap');
var lazypipe = require('lazypipe');
var rename = require('gulp-rename');
var header = require('gulp-header');
var packageJson = require('./package.json');

// Scripts
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-terser');
var optimizejs = require('gulp-optimize-js');

// Styles
var sass = require('gulp-sass')(require('sass'));
var postcss = require('gulp-postcss');
var cleanCSS = require('gulp-clean-css');
var prefix = require('autoprefixer');
var minify = require('cssnano');

// SVGs
var svgmin = require('gulp-svgmin');

// BrowserSync
var browserSync = require('browser-sync').create();

/**
 * Gulp Tasks
 */

// Remove pre-existing content from output folders
var cleanDist = function (done) {
	if (!settings.clean) return done();

	del.sync([
		paths.output
	]);

	return done();
};

// Repeated JavaScript tasks
var jsTasks = lazypipe()
	.pipe(header, banner.main, {
		package: packageJson
	})
	.pipe(optimizejs)
	.pipe(dest, paths.scripts.output)
	.pipe(rename, {
		suffix: '.min'
	})
	.pipe(uglify)
	.pipe(optimizejs)
	.pipe(header, banner.main, {
		package: packageJson
	})
	.pipe(dest, paths.scripts.output);

// Lint, minify, and concatenate scripts
var buildScripts = function (done) {

	// Make sure this feature is activated before running
	if (!settings.scripts) return done();

	// Run tasks on script files
	return src(paths.scripts.input)
		.pipe(flatmap(function (stream, file) {

			// If the file is a directory
			if (file.isDirectory()) {

				// Setup a suffix variable
				var suffix = '';

				// If separate polyfill files enabled
				if (settings.polyfills) {

					// Update the suffix
					suffix = '.polyfills';

					// Grab files that aren't polyfills, concatenate them, and process them
					src([file.path + '/*.js', '!' + file.path + '/*' + paths.scripts.polyfills])
						.pipe(concat(file.relative + '.js'))
						.pipe(jsTasks());

				}

				// Grab all files and concatenate them
				// If separate polyfills enabled, this will have .polyfills in the filename
				src(file.path + '/*.js')
					.pipe(concat(file.relative + suffix + '.js'))
					.pipe(jsTasks());

				return stream;

			}

			// Otherwise, process the file
			return stream.pipe(jsTasks());
		}));
};

// Lint scripts
var lintScripts = function (done) {
	if (!settings.scripts) return done();

	return src(paths.scripts.input)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
};

// Process, lint, and minify Sass files
var buildStyles = function (done) {
	if (!settings.styles) return done();

	return src(paths.styles.input)
		.pipe(sass({
			outputStyle: 'expanded',
			sourceComments: true
		}))
		.pipe(postcss([
			prefix({
				cascade: true,
				remove: true
			})
		]))
		.pipe(header(banner.main, {
			package: packageJson
		}))
		.pipe(dest(paths.styles.output))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(postcss([
			minify({
				discardComments: {
					removeAll: true
				}
			})
		]))
		.pipe(cleanCSS())
		.pipe(dest(paths.styles.output));
};

// Optimize SVG files
var buildSVGs = function (done) {
	if (!settings.svgs) return done();

	return src(paths.svgs.input)
		.pipe(svgmin())
		.pipe(dest(paths.svgs.output));
};

var copyFiles = function (done) {
	if (!settings.copy) return done();

	return src(paths.copy.input)
		.pipe(dest(paths.copy.output));
};

var faviconFiles = function (done) {
	if (!settings.favicon) return done();

	return src(paths.favicon.input)
		.pipe(dest(paths.favicon.output));
};

// Copy images into output folder
var copyImgs = function (done) {
	if (!settings.imgs) return done();

	return src(paths.imgs.input)
		.pipe(dest(paths.imgs.output));

};


// Copy fonts into output folder
var copyFonts = function (done) {
	if (!settings.fonts) return done();

	return src(paths.fonts.input)
		.pipe(dest(paths.fonts.output));
};


var copyPackages = function (done) {
	if (!settings.packages) return done();

	return src(paths.packages.input)
		.pipe(dest(paths.packages.output));
};

// Watch for changes to the src directory
var startServer = function () {
	browserSync.init({
		open: false,
		injectChanges: true,
		server: './dist',
		serveStatic: ['./dist'],
		serveStaticOptions: {
			extensions: ['html']
		}
	});
};

// Reload the browser when files change
var reloadBrowser = function (done) {
	browserSync.reload();
	done();
};

// Watch for changes
var watchSource = function () {
	watch(paths.input, series(exports.default, reloadBrowser));

	return
};


/**
 * Export Tasks
 */

// Default task
// gulp
exports.default = series(
	cleanDist,
	parallel(
		buildScripts,
		lintScripts,
		buildStyles,
		buildSVGs,
		copyFiles,
		faviconFiles,
		copyImgs,
		copyFonts,
		copyPackages,
	)
);

// Watch and reload
// gulp watch
exports.watch = parallel(
	exports.default,
	watchSource,
	startServer,
);
