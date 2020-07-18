.PHONY: init \
init-npm \
clean \
clean-npm \
clean-test \
test \
coverage \
deploy \

.DEFAULT_GOAL := help

# Deploy configuration
STAGE ?= dev
REGION ?= sa-east-1
PROFILE ?= uvsy-dev
DISTRIBUTION_ID ?= ""


AWS_CLI := $(shell which aws)
ifndef AWS_CLI
$(error aws CLI not found in path)
endif


help:
	@echo "    init"
	@echo "        Initialize development environment."
	@echo "    init-npm"
	@echo "        Initialize npm environment."
	@echo "    clean"
	@echo "        Remove all the development environment files."
	@echo "    clean-npm"
	@echo "        Remove Node modules."
	@echo "    clean-test"
	@echo "        Remove Test data."
	@echo "    test"
	@echo "        Run tests."
	@echo "    deploy"
	@echo "        Build and deploy to AWS."

init: clean init-npm
	@echo "Project initialized"

init-npm:
	@npm install

clean: clean-npm clean-build

clean-npm:
	@echo "Removing node modules..."
	@rm -rf node_modules

test:
	@echo "Not implemented"

clean-build:
	@echo "Removing build artifacts"
	@rm -rf ./dist

build:
	@echo ""
	@echo "Build for stage $(STAGE)"
	@npx ng build --prod --aot

sync: 
	@echo ""
	@echo "Sync build files with AWS"
	@aws s3 sync ./dist/universy-web s3://universy-${STAGE}-universy-origin \
	--delete \
	--region $(REGION) \
	--profile $(PROFILE)

invalidate: 
	@echo ""
	@echo "Invalidating old distribution files"
	@aws cloudfront create-invalidation \
		--distribution-id $(DISTRIBUTION_ID) \
		--region $(REGION) \
		--profile $(PROFILE) \
		--paths /


deploy: build sync invalidate 
	@echo "Deployed to stage $(STAGE)"
	
	
