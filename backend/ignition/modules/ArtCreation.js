const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ArtCreation", (m) => {

  //const artCreation = m.contract("ArtCreation", [datasetIds, modelIds, prompt]);
  const cr8Cert = m.contract("CR8Cert");
  //const dataProvision = m.contract("DataProvision");

  return { cr8Cert };
});
