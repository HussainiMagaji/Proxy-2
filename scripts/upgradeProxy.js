const { ethers } = require("hardhat");
const { sendShieldedTransaction } = require("../utils");

require("dotenv").config( );

async function main( ) {
    const [signer] = await ethers.getSigners( );

    const SWTRProxy = await ethers.getContractAt("SWTRProxy", process.env.PROXY_ADDR);
    const ProxyAdmin = await ethers.getContractAt("ProxyAdmin", process.env.PROXY_ADMIN_ADDR);

    const SimpleImpl2 = await ethers.deployContract("SimpleImpl2");
    await SimpleImpl2.waitForDeployment( );
    console.log(`SimpleImpl2 deployed to ${ SimpleImpl2.target }`);

    let tx = await sendShieldedTransaction(
        signer,
        ProxyAdmin.target,
        ProxyAdmin.interface.encodeFunctionData("upgradeTo", [
            SWTRProxy.target, //proxy address
            SimpleImpl2.target, // implementation 2 address
        ]),
        "0"
    );

    await tx.wait( );
    console.log(`Contract upgrade hash: ${tx.hash}`);

}

main( ).catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
