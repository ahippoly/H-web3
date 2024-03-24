const { ethers } = require("hardhat");

async function testDeployement() {
    const cr8Cert = await ethers.getContractFactory("CR8Cert");
    const cr8Art = await ethers.getContractFactory("CR8Art");
    const artCreation = await ethers.getContractFactory("ArtCreation");
    const dataProvision = await ethers.getContractFactory("DataProvision");
    
    const contract1 = cr8Cert.attach(
        "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
    );
    const contract2 = cr8Art.attach(
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    );
    const contract3 = artCreation.attach(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    );
    const contract4 = dataProvenance.attach(
        "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
    );

    await contract.safeMint("0x9473EC0057AcBBa6b6E1d6af50d14C6343C0817A","https://ipfs.io/ipfs/QmVxeTWLdQRkHbL9pyR99S7FPDZ6fZU3faATrFg18famgF1.jpg");
}

testDeployement().catch((error) => {
    console.error(error);
    process.exitCode = 1;

});