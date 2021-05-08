## Description

Use the scripts provided to deploy a lambda function to AWS.

## Package Creation

We install the linux compatible versions of `numpy` and `pandas` using the wheel files do that they can run on AWS Lambda.

More info here: https://korniichuk.medium.com/lambda-with-pandas-fd81aa2ff25e

## File Storage

We need to store the FSA codes and BallTree index somewhere that the Lambda fn can use it.

More info here: https://aws.amazon.com/blogs/compute/choosing-between-aws-lambda-data-storage-options-in-web-apps/

### Temporary storage with `/tmp`

- Lambda execution environment provides a file system for code to use at `/tmp`
- fixed size of 512MB
- same execution environment may be reused by multiple invocations to optimize performance
- each time new execution env is created, this area is deleted, so it is intended as an ephemeral storage area. Functions may cache date here b/w invocations, but is not a permanent data store.

### Lambda layers

- these are for additional libraries
- max deployment size of 50MB

### EFS for Lambda

- The file system grows and shrinks as you add or delete data, so you do not need to manage storage limits
- The Lambda service mounts EFS file systems when the execution environment is prepared, does not impact cold start latency.
- If the execution environment is warm from previous invocations, the mount is already prepared.
- Additionally, you can use this to include packages that exceed the limits of layers.

# Setup Guide

## Local

1. Create EFS and VPC using `./0-create-efs-vpc.sh`
2. Create S3 bucket with `./1-create-bucket.sh`
3. Build layer with dependencies `./2-build-layer.sh`
4. Deploy to AWS Lambda `./3-deploy.sh`

## AWS Console

1. add environment variables
2. setup a trigger with EventBridge: using `15minCron` trigger event
3. add lambda function to VPC with all subnets
4. connect EFS and EFS access point to lambda function
5. Ensure that EFS security groups allow for access over port 2049 (NFS)
6. Create 2 SNS topics and subscriptions pairs for success, and failure

## Load to EFS

1. Create EC2 instance with an SG group with SSH port open and a route table for an internet gateway
2. Mount EFS to EC2 instance
3. SSH into EFS and create a folder, chmod this folder as root user
4. SCP files from computer

### Didnt work? - DataSync non-stop errors

6. Upload required files to S3 Bucket
7. Use DataSync to transfer files from S3 to EFS

# Guides

## Python Lambda

https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchevents-tutorial.html

## EFS

https://aws.amazon.com/blogs/compute/using-amazon-efs-for-aws-lambda-in-your-serverless-applications/

# Code

## Source

Python Lambda: https://github.com/awsdocs/aws-lambda-developer-guide/tree/main/sample-apps/blank-python

## TODO:

EFS Examples: https://github.com/aws-samples/aws-lambda-efs-samples
