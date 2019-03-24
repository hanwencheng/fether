#!/usr/bin/env bash

# Authorise Certificates in development environment

echo "Generating Root Private Key"
# Note: Add passphrase with `openssl genrsa -des3 ...`
openssl genrsa -out ./scripts/ssl/rootCA.key 2048
echo "Generating Root Certificate Request (.pem) from Root Private Key (.key)"
# Note: Configured to generate self-signed Root SSL Certificate (Certificate Authority) for 127.0.0.1
# from the existing Private Key non-interactively (without being prompted for the subject)
openssl req -x509 -new -nodes -key ./scripts/ssl/rootCA.key -days 1024 -out ./scripts/ssl/rootCA.pem -subj "/C=DE/ST=Berlin/L=Berlin/O=Parity/OU=Security/CN=rootCA"
echo "Generating Root Certificate Request (.crt) from Root Certificate Request (.pem)"
openssl x509 -outform der -in ./scripts/ssl/rootCA.pem -out ./scripts/ssl/rootCA.crt

echo "Generating Server Private Key"
openssl genrsa -out ./scripts/ssl/server.key 2048
echo "Generating Server Certificate Request (.csr) with Server Private Key (.key)"
openssl req -new -key ./scripts/ssl/server.key -out ./scripts/ssl/server.csr -subj "/C=DE/ST=Berlin/L=Berlin/O=Parity/OU=Security/CN=localhost"
echo "Generating Server Certificate (.crt)"
openssl x509 -req -in ./scripts/ssl/server.csr -CA ./scripts/ssl/rootCA.crt -CAkey ./scripts/ssl/rootCA.key -CAcreateserial -out ./scripts/ssl/server.crt -days 500

echo "Generating Server (.p12)"
# openssl pkcs12 -export -inkey ./scripts/ssl/server.key -in ./scripts/ssl/server.crt -name client -out ./scripts/ssl/server.p12
echo "Generating non-encrypted (.pem) using (.key) and (.crt) from (.p12)"
#openssl pkcs12 -in ./scripts/ssl/server.p12 -out ./scripts/ssl/server.pem -nodes -clcerts