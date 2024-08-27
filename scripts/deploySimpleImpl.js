const { ethers } = require("hardhat");

async function main( ) {
  const [signer] = await ethers.getSigners( );
  console.log("Deploying SimpleImpl with the account:", signer.address);

  const SimpleImpl = await ethers.deployContract("SimpleImpl");
  await SimpleImpl.waitForDeployment();
  console.log(`SimpleImpl deployed to ${SimpleImpl.target}`);

  console.log("Verifying Contract...");
  try {
    await hre.run("verify:verify", {
      address: SimpleImpl.target,
    });
    console.log(`Contract verified to ${hre.config.etherscan.customChains[0].urls.browserURL}/address/${SimpleImpl.target}`);
  } catch (err) {
    console.error("Error veryfing Contract. Reason:", err);
  }
}

main( ).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});