#!/bin/bash
if [ -z $1 ]; then
  echo "*********  add -v flag for verbose logging of go tests  **********"
fi

cd ./backend/repo/
echo "===== Running Repo Package Unit Tests ======"
go test $1

# cd into other packages and add tests as they are completed...
cd ../game/
echo "===== Running User Package Unit Tests ======"
go test $1

cd ../utils
echo "===== Running Utils Package Unit Tests ======"
go test $1


