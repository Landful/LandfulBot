#!/bin/bash

now --public -e TOKEN='${TOKEN}' -t ${NOW_TOKEN}
now alias -t ${NOW_TOKEN}
now scale -t ${NOW_TOKEN}
now rm landfulbot --yes -t ${NOW_TOKEN}
