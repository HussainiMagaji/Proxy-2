const { ethers } = require("hardhat");

require("dotenv").config( );

async function main( ) {
    const [signer] = await ethers.getSigners( );
    console.log("Deploying SWTRProxy with the account:", signer.address);

    const SimpleImpl = await ethers.getContractAt("SimpleImpl", process.env.SIMPLE_IMPL_ADDR);
    const ProxyAdmin = await ethers.getContractAt("ProxyAdmin", process.env.PROXY_ADMIN_ADDR);

    const SWTRProxy = await ethers.deployContract("SWTRProxy", [
        SimpleImpl.target, // implementation address
        ProxyAdmin.target, // admin address
        SimpleImpl.interface.encodeFunctionData("initialize", [signer.address, 100]), // data
    ]);
    await SWTRProxy.waitForDeployment( );
    console.log(`SWTRProxy deployed to ${ SWTRProxy.target }\n`);
    
    console.log("Verifying Contract...");
    try {
        await hre.run("verify:verify", {
            address: SWTRProxy.target,
            contract: "contracts/SWTRProxy.sol:SWTRProxy",
            constructorArguments: [
                SimpleImpl.target, // implementation address
                ProxyAdmin.target, // admin address
                SimpleImpl.interface.encodeFunctionData("initialize", [signer.address, 100]), // data
            ]
        });
        console.log(`Contract verified to ${hre.config.etherscan.customChains[0].urls.browserURL}/address/${SWTRProxy.target}`);
    } catch (err) {
        console.error("Error veryfing Contract. Reason:", err);
    }
}

main( ).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});