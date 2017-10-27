# which service (from docker-compose.yml:services) to run commands agains
SERVICE ?=

EXEC_ARGS ?=
RUN_ARGS ?=
DOWN_ARGS ?= --remove-orphans
BUILD_ARGS ?=

include .env
export

COMPOSE_FILE_ARGS ?= -f $(CURDIR)/docker-compose.yml

DOCKER_COMPOSE = docker-compose $(COMPOSE_FILE_ARGS) -p $(PROJECT_NAME)

ifeq ($(shell uname -s),Darwin)
XARGS_OPTS =
else
XARGS_OPTS = -r
endif

run: env-check
	$(DOCKER_COMPOSE) up -d $(RUN_ARGS)

logs: env-check
	$(DOCKER_COMPOSE) logs --tail=100 -f

build: env-check
	$(DOCKER_COMPOSE) build app

rebuild: build
	$(DOCKER_COMPOSE) up -d --force-recreate

stop: env-check
	$(DOCKER_COMPOSE) stop

restart: env-check
	$(DOCKER_COMPOSE) restart $(SERVICE)

clean: env-check
	- $(DOCKER_COMPOSE) down $(DOWN_ARGS)

exec: run
	$(DOCKER_COMPOSE) exec $(SERVICE) $(EXEC_ARGS)

bash: run
	$(DOCKER_COMPOSE) exec $(SERVICE) bash

app: run
	$(DOCKER_COMPOSE) exec app bash

ps:
	$(DOCKER_COMPOSE) ps

env-check:
ifeq ($(shell uname -s),Darwin)
	ifconfig lo0 | grep -qF '$(BIND_ADDRESS)' || sudo ifconfig lo0 alias $(BIND_ADDRESS)
endif

# compatibility to pre docker-compose rules & aliases
$(RUN_IMAGE): run
$(BUILD_IMAGE): image
start: run
cli: bash
update: image clean run

# all is phony...
.PHONY: %
.DEFAULT: run
