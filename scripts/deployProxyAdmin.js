const { ethers } = require("hardhat");

async function main( ) {
  const [signer] = await ethers.getSigners( );
  console.log("Deploying ProxyAdmin with the account:", signer.address);

  const ProxyAdmin = await ethers.deployContract("ProxyAdmin", [signer.address]);
  await ProxyAdmin.waitForDeployment( );
  console.log(`ProxyAdmin deployed to ${ ProxyAdmin.target }`);

  console.log("Verifying Contract...");
  try {
    await hre.run("verify:verify", {
      address: ProxyAdmin.target,
      constructorArguments: [signer.address]
    });
    console.log(`Contract verified to ${hre.config.etherscan.customChains[0].urls.browserURL}/address/${ProxyAdmin.target}`);
  } catch (err) {
    console.error("Error veryfing Contract. Reason:", err);
  }
}

main( ).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});