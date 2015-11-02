deploy: 
	@gulp build
	@scp -r build wester:~/arryn/
