.PHONY: all build deploy develop lint test


all: list

build:
	docker build -t opentrialsrobot/api .

deploy:
	$${CI?"Deployment is avaiable only on CI/CD server"}
	docker login \
    -e $$OPENTRIALS_DOCKER_EMAIL \
    -u $$OPENTRIALS_DOCKER_USER \
    -p $$OPENTRIALS_DOCKER_PASS
	tutum login \
	-u $$OPENTRIALS_DOCKER_USER \
	-p $$OPENTRIALS_DOCKER_PASS
	docker push opentrialsrobot/api
	python scripts/deploy-stacks.py

develop:
	npm install

lint:
	echo 'lint'

test:
	echo 'test'
