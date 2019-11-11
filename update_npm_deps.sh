#!/usr/bin/env bash
for i in $(npm outdated --depth=0 | sed '1d' | awk '{print $1}'); do
    echo "NPM :: $i"; 
    npm install "$i" --save
done
