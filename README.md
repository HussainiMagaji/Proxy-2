# Swisstronik upgradeable proxy

This project demonstrates the implementation, deployment and upgrading a proxy on swisstronik testnet.

1. npm install
   
2. Create .env file at the root and fill up:
   1. URL="https://json-rpc.testnet.swisstronik.com/"
   2. PRIVATE_KEY="YOUR PRIVATE KEY SHOULD GO HERE"
      
3. npx hardhat run scripts/deploySimpleImpl.js --network swisstronik
   1. Copy the contract address as displayed in the terminal output
   2. Create the following in the .env
      SIMPLE_IMPL_ADDR="PASTE THE CONTRACT ADDRESS HERE"
      
4. npx hardhat run scripts/deployProxyAdmin.js --network swisstronik
   1. Copy the proxy admin contract address as displayed in the terminal output
   2. Create the following in the .env
      PROXY_ADMIN_ADDR="PASTE THE PROXY ADMIN CONTRACT ADDRESS HERE"
      
5. npx hardhat run scripts/deployProxy.js --network swisstronik
   1. Copy the proxy contract address as displayed in the terminal output
   2. Create the following in the .env
      PROXY_ADDR="PASTE THE PROXY CONTRACT ADDRESS HERE"
      
6. npx hardhat run scripts/upgradeProxy.js --network swisstronik
   The proxy upgrade hash will be displayed afterwards!

ALL CONTRACT VERIFIED! ENJOY!!
