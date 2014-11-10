module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'assets/css/<.css' : [
						'src/scss/**/*.scss',
						'src/scss/*.scss'
					]
				}
			}
		},
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
		uglify: {
			build: {
				files: {
					'assets/js/app.min.js': [
						'lib/**/*.js',
						'lib/*.js',
						'src/js/**/*.js',
						'src/js/*.js'
					]
				}
			}
		},
		watch: {
			jshint: {
				files: ['<%= jshint.files =%>'],
				tasks: ['jshint', 'quint']
			},
			css: {
				files: ['src/scss/**/*.scss','src/scss/*.scss']
				tasks: ['sass']
			},
			js: {
				files: ['src/js/**/*.js','src/js/*.js'],
				tasks: ['uglify']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('develop', ['jshint','uglify','sass','watch']);
	grunt.registerTask('javascript', ['uglify', 'jshint', 'watch:js']);
	grunt.registerTask('style', ['sass','watch']);
	grunt.registerTask('production', ['jshint', 'uglify', 'sass']);

};