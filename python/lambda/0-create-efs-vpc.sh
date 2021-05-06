#!/bin/bash
set -eo pipefail
aws cloudformation create-stack --stack-name twitter-efs --template-body file://./efs-vpc/create.yml