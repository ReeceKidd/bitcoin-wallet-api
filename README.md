# bitcoin-wallet-api

- [Objectives](#objectives)
- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
- [Testing](#testing)
- [Improvements](#improvements)


## Objectives
1. Generates a random mnemonic words following BIP39 standard
2. Generate a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address from a given seed and path
2. Generate an n-out-of-m Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) bitcoin address, where n, m, and addresses can be specified 
 
## Installation
Set up the following environment variables in a .env file
````
NODE_ENV=test

PORT=3000

````
Once your environment variables are set up run
```
    yarn
```    

This project uses bitcoinjs-lib for generating bitcoin addresses.   

## Usage
Use the below command to run the node server locally
```
    yarn dev
```

## Documentation
Documentation is defined inside of swagger.json
To view the documentation run
```
    yarn dev
```
 and go to: 
**http://localhost:3000/swagger**



## Testing
The API has both unit and functional tests. 
```
 yarn test
```

## Improvements
* Add QR codes for address.
* Support different mnemonic languages
* Return more derived addresses


