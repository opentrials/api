#!/bin/bash
# This script deploys to docker-cloud on stack $STACK_NAME.
# The $STACK_NAME environment variable **must** be set before calling it.

function getStackfilePath() {
  local CURRENT_DIR=`dirname $0`
  echo "$CURRENT_DIR/$ENV.yml"
}

function ensurePreconditions() {
  if [[ ! "$1" ]]
  then
    error "This script must be called with the stack name as parameter."
    exit 1
  fi

  if [[ ! "$ENV" ]]
  then
    error "The \"\$ENV\" variable must be set."
    exit 1
  fi

  local STACKFILE_PATH=$(getStackfilePath)
  if [[ ! -f $STACKFILE_PATH ]]
  then
    error "The Stackfile \"$STACKFILE_PATH\" doesn't exist."
    exit 1
  fi

  if ! command -v docker-cloud > /dev/null 2>&1
  then
    error "The \"docker-cloud\" executable doesn't exist in the PATH."
    exit 1
  fi
}

function createOrUpdateStack() {
  local STACK_NAME=$1
  local DOCKER_CLOUD_PARAMS=${@:2}

  _fixEnvVariables $ENV

  debug "Creating stack \"$STACK_NAME\""
  debug "$ docker-cloud stack up --sync -n \"$STACK_NAME\" $DOCKER_CLOUD_PARAMS"
  local RESULT=$(docker-cloud stack up --sync -n "$STACK_NAME" $DOCKER_CLOUD_PARAMS 2>&1)
  echo $RESULT
  if  echo $RESULT | grep -q "Duplicated name"
  then
    STACK_UUID=$(_getDockerCloudStackUUID "$STACK_NAME")
    debug "Stack \"$STACK_NAME\" ($STACK_UUID) already exists, updating it."
    debug "$ docker-cloud stack update --sync \"$STACK_UUID\" $DOCKER_CLOUD_PARAMS"
    docker-cloud stack update --sync "$STACK_UUID" $DOCKER_CLOUD_PARAMS
  fi
}

function _fixEnvVariables() {
  if [[ "$ENV" = "staging" ]]
  then
    debug "Setting \"$ENV\" environment variables."

    export DATABASE_URL=$DATABASE_URL__STAGING
    export ELASTICSEARCH_URL=$ELASTICSEARCH_URL__STAGING
  fi
}

function _getDockerCloudStackUUID() {
  # Return the received stack name's UUID if it exists or empty string
  # otherwise.
  local STACK_NAME=$1

  echo "`docker-cloud stack ls | grep -oP "^$STACK_NAME\s+\K[^\s]+" | tail -1`"
}

function debug() {
  echo "DEBUG: $@" 1>&2
}

function error() {
  echo "ERROR: $@" 1>&2
}

STACK_NAME=$1
ensurePreconditions $STACK_NAME
createOrUpdateStack $STACK_NAME -f "$(getStackfilePath)"
