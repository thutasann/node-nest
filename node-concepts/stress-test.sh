#!/bin/bash
target=${1:-http://localhost:3000/memory-management/memory-leak}

while true
do
    for i in $(seq 100)
    do 
        curl $target > /dev/null &
    done

    wait
done