#!/bin/bash

npm install

npm install now --no-save

now rm landfulbot -y -t ${NOW_TOKEN}
now -t ${NOW_TOKEN}
now alias -t ${NOW_TOKEN}
now scale landfulbot.now.sh sfo1 1 1 -t ${NOW_TOKEN}
