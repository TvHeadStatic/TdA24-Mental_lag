docker ps -q
OUTPUT=$(docker ps -q)
docker kill "${OUTPUT}"