module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'src/css/<%= pkg.name =%>.css' : [
						'src/scss/**/*.scss',
						'src/scss/*.scss'
					]
				}
			}
		},
		cssmin: {
			dist: {
				files: {
					'assets/css/<%= pkg.name =%>.min.css':[
						'src/css/*.css'
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
					'assets/js/<%= pkg.name =%>.min.js': [
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
				files: ['src/scss/**/*.scss','src/scss/*.scss'],
				tasks: ['sass','cssmin']
			},
			js: {
				files: ['src/js/**/*.js','src/js/*.js'],
				tasks: ['uglify']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('develop', ['jshint','uglify','sass', 'cssmin','watch']);
	grunt.registerTask('javascript', ['jshint', 'uglify','watch:js']);
	grunt.registerTask('style', ['sass', 'cssmin','watch:css']);
	grunt.registerTask('production', ['jshint', 'uglify', 'sass', 'cssmin']);

};