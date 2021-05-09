import boto3
import os
import logging

log = logging.getLogger(__name__)
log.setLevel(logging.INFO)

sns = boto3.client('sns')
sns_arn = os.environ['snsARN']  # Getting the SNS Topic ARN passed in by the environment variables.

def publish_message(success, notified, failed):
    
    try:
        message = ""
        message += "\nLambda extract summary" + "\n\n"
        message += "##########################################################\n"
        message += "# Loaded tweets:- " + str(success) + "\n"
        message += "# Failed to load:- " + str(failed) + "\n"
        message += "# Users notified:- " + str(notified) + "\n"
        message += "##########################################################\n"

        # Sending the notification...
        sns.publish(
            TargetArn=sns_arn,
            Subject=f'Execution success for TweetExtract',
            Message=message
        )
    except ClientError as e:
        log.error("An error occured: %s" % e)