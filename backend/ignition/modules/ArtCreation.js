const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ArtCreation", (m) => {

  const artCreation = m.contract("ArtCreation");
  const dataProvision = m.contract("DataProvision");
  const cr8Cert = m.contract("CR8Cert");
  const cr8Art = m.contract("CR8Art");


  return { /*cr8Cert, cr8Art, */artCreation, dataProvision };
});
