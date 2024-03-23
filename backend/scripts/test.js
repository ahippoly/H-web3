const { ethers } = require("hardhat");

async function testDeployement() {
    const cr8Cert = await ethers.getContractFactory("CR8Cert");
    const contract = cr8Cert.attach(
        "0xEB57863C01aF79814b6B20c416c13520ee51119f"
    );

    await contract.addItem("0x9473EC0057AcBBa6b6E1d6af50d14C6343C0817A","");
}

testDeployement().catch((error) => {
    console.error(error);
    process.exitCode = 1;

});