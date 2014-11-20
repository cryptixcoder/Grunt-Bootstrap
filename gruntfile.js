module.exports = function(grunt){
	grunt.initConfig({
		jshint: {
			files: ['src/**/*.js', 'src/*.js'],
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			}
		},
		concat: {
			options: {
				separator: ' \n\n'
			},
			dist: {
				src: ['src/scss/*.scss'],
				dest: 'src/build/style.scss'
			}
		},
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'src/build/style.css' : 'src/build/style.scss'
				}
			}
		},
		cssmin: {
			target: {
				files: {
					'assets/css/app.min.css' : ['src/css/*.css','src/build/style.css']
				}
			}
		},
		uglify: {
			build: {
				files: {
					'assets/js/script.min.js': [
						'lib/**/*.js',
						'lib/*.js',
						'src/js/**/*.js',
						'src/js/*.js'
					]
				}
			}
		},
		watch: {
			js: {
				files: ['src/js/*.js'],
				tasks: ['jshint', 'uglify']
			},
			scss: {
				files: ['src/scss/*.scss'],
				tasks: ['concat','sass','cssmin']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', [ 
		'jshint',
		'concat',
		'sass',
		'cssmin',
		'uglify',
		'watch'
	]);
};