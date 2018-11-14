#!/bin/bash

npm install

now --public -e TOKEN='${TOKEN}' -t ${NOW_TOKEN}
