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

## Manual

- add environment variables
- create EFS and access point
- setup a trigger with EventBridge: using `15minCron` trigger event

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
