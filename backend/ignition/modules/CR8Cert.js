const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CR8Cert", (m) => {

  const cr8Cert = m.contract("CR8Cert");

  return { cr8Cert };
});
