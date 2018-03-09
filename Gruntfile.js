module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		express:{
			all:{
				options:{
					port:9000,
					hostname:'localhost',
					bases:'.'/*,
					livereload:true*/
				}
			}
		},
		uglify:{
			js:{
				options: {
					sourceMap: true
				},
				files: {
					'Build/app.min.js': ['js/**/*.js']
      			}
			}
		},
		watch:{
			// options:{
			// 	livereload:true
			// },
			// js:{
			// 	files:['js/**/*.js'],
			// 	tasks:['uglify']
			// },
			// css:{
			// 	files:['css/**/*.css'],
			// 	tasks:['cssmin']
			// }
		},
		cssmin:{
			target:{
				files:{
					'Build/app.min.css':'css/**/*.css'
				}
			}
		}
		

	});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-express');
	grunt.registerTask('default',['uglify','watch','cssmin']);
	grunt.registerTask('server',['express','watch'/*,"uglify"*/]);
};