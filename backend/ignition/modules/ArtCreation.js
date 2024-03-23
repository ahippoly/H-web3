const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const INITIAL_OWNER = "0x9473EC0057AcBBa6b6E1d6af50d14C6343C0817A";
const DATASET_IDS = [0xe0d24];
const MODEL_IDS = [0x5a1ee8d6a];
const PROMPT = "a948904f2f0f479b8f8197694b30184b0d2";

module.exports = buildModule("ArtCreation", (m) => {
  //constructor arguments ; address initialOwner, uint256[] memory datasetIds, uint256[] memory modelIds, string memory prompt
  const datasetIds = m.getParameter("datasetIds", DATASET_IDS);
  const modelIds = m.getParameter("modelIds", MODEL_IDS);
  const prompt = m.getParameter("prompt", PROMPT);

  const artCreation = m.contract("ArtCreation", [datasetIds, modelIds, prompt]);
  const cr8Cert = m.contract("CR8Cert");

  return { artCreation , cr8Cert};
});
