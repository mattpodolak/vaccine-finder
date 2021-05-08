echo "Uploading FSA.csv"
scp -i ~/.ssh/HOME_WINDOWS.pem ./FSA.csv ubuntu@ec2-3-218-244-115.compute-1.amazonaws.com:/mnt/efs/twitter

echo "Uploading ball tree index"
scp -i ~/.ssh/HOME_WINDOWS.pem ./ball_postal_index.p ubuntu@ec2-3-218-244-115.compute-1.amazonaws.com:/mnt/efs/twitter
