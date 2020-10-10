default: build

setup:
	npm install

build: .PHONY
	./node_modules/.bin/gulp

start:
	./node_modules/.bin/gulp start
	
tasks:
	./node_modules/.bin/gulp --tasks

.PHONY:

rebuild:
	rm -rf build
	$(MAKE) build


resetup:
	rm -rf build node-modules
	$(MAKE) setup
	$(MAKE) build

