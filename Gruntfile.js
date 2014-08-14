module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: ['Gruntfile.js', 'src/js/**/*.js']
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
				//beautify: true
			},
			build: {
				src: ['src/**/*.js'],
				dest: 'build/js/<%= pkg.name %>.min.js'
			}
		},
		concat: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			lib: {
				src: ['node_modules/jquery/dist/jquery.min.js',
				'node_modules/jquery.transit/jquery.transit.js',
				'libs/jquery.fittext.js',
				'node_modules/underscore/underscore-min.js',
				'node_modules/bootstrap/dist/js/bootstrap.min.js',
				'node_modules/backbone/backbone-min.js'],
				dest: 'build/js/<%= pkg.name %>.lib.js'
			}
		},
		jade: {
			compile: {
				options: {
					client: false,
					pretty: true
				},
				files: [{
					cwd: 'src/',
					src: ['index.jade'],
					dest: 'build/',
					expand: true,
					ext: '.html'
				}]
			}
		},
		less: {
			development: {
				options: {
					paths: ["src/css"]
				},
				files: {
					"build/css/style.min.css": ["src/css/style.less"]
				}
			},
			production: {
				options: {
					paths: ["src/css"],
					cleancss: true,
					/*modifyVars: {
						imgPath: '"http://mycdn.com/path/to/images"',
						bgColor: 'red'
					}*/
				},
				files: {
					"build/css/style.min.css": ["src/css/style.less"]
				}
			}
		},
		copy: {
			main: {
				files: [
					{expand: false, src: ['node_modules/bootstrap/dist/css/bootstrap.min.css'], dest: 'build/css/bootstrap.min.css'},
					{expand: true,
						cwd: 'src/gfx/',
						src: '**',
						dest: 'build/gfx/',
						flatten: true,
						filter: 'isFile'}
				]
			}
		},
		watch: {
			scripts: {
				files: 'src/**/*.js',
				tasks: ['uglify', 'concat', 'copy']
			},
			css: {
				files: 'src/**/*.less',
				tasks: ['less']
			},
			html: {
				files: 'src/**/*.jade',
				tasks: ['jade']
			}
		}
	});

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Default task(s).
	grunt.registerTask('default', ['jshint', 'uglify', 'concat', 'jade', 'less', 'copy']);

};