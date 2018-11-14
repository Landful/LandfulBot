#!/bin/bash

npm install

npm install now --no-save

now --public -e TOKEN="${TOKEN}" -t ${NOW_TOKEN}
