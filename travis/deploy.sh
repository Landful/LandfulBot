#!/bin/bash

now --public -e TOKEN='${TOKEN}' -t ${NOW_TOKEN}
now alias -t ${NOW_TOKEN}
now scale landfulbot.now.sh gru 1 auto -t ${NOW_TOKEN}
now rm landfulbot --yes -t ${NOW_TOKEN}
