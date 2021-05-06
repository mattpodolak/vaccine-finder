VPC_ID=vpc-05bbc3ac11f095af5
aws ec2 describe-subnets --filters "Name=vpc-id,Values=$VPC_ID" --query 'Subnets[*].{Id: SubnetId}' --output text
