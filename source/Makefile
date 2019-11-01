build:
	docker build -t gcba/eval_desem_3 .

start:
	 docker run -it -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 4200:4200 --rm gcba/eval_desem_3

compile:
	 docker run -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules gcba/eval_desem_3 ng build --env=prod
