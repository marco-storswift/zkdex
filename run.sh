#!/bin/bash
# First check that Leo is installed.
if ! command -v leo &> /dev/null
then
    echo "leo is not installed."
    exit
fi

# The private key and address of the bank.
# Swap these into program.json, when running transactions as the second bidder.
# "private_key": "APrivateKey1zkpGxAvbhBvD5x44AXkWUN3x6X1ES2x3Y7t72tB6rsCybDL"
# "address": "aleo1e4d2gk420wthu7ap778cutmaz8apcwseyv8cgud0jpdgc7q5hvxq5n29mg"

# Swap in the private key and address to program.json.
echo "{
  \"program\": \"uinaleo.aleo\",
  \"version\": \"0.0.0\",
  \"description\": \"\",
  \"development\": {
      \"private_key\": \"APrivateKey1zkpGxAvbhBvD5x44AXkWUN3x6X1ES2x3Y7t72tB6rsCybDL\",
      \"address\": \"aleo1e4d2gk420wthu7ap778cutmaz8apcwseyv8cgud0jpdgc7q5hvxq5n29mg\"
  },
  \"license\": \"MIT\"
}" > program.json

# create_public_account
echo "
###############################################################################
########           -----------------------------------------           ########
########           |  public_domain_name  |         sui    |           ########
########           -----------------------------------------           ########
########                                                               ########
###############################################################################
"
leo run createpool 21888242871839275222field 21888242871839275222246405745257275088548364400416034343698204186575808495617field 21888242871839275222246405745257275088548364400416034343698204186575808495618field;
