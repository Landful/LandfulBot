#!/bin/bash

npm install

npm install now --no-save

now --public -e TOKEN="${TOKEN}" -t ${NOW_TOKEN}
now alias -t ${NOW_TOKEN}
now scale landfulbot.now.sh sfo1 1 1 -t ${NOW_TOKEN}
