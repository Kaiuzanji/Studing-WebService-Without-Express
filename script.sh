alias jq=C:/Bash/jq-win64.exe ## This is optional

echo -e 'Requesting all users'
curl localhost:3000/users

echo -e '\n\nRequesting with wrong body'
curl --silent -X POST \
  --data-binary '{"invalid":"data"}' \
  localhost:3000/users

echo -e '\n\nCreating Bruno'
CREATE=$(curl --silent -X POST \
  --data-binary '{"name":"Bruno", "age": 22 }' \
  localhost:3000/users)

echo $CREATE

ID=$(echo $CREATE | jq .id)

echo -e '\nRequesting flash'
curl localhost:3000/users/$ID