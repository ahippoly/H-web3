const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");
  const { ethers } = require("hardhat");

  describe("ArtCreation", function() {

  });

  beforeEach(async function () {

  });

  describe("")
  //Art Creation contracts must impelment => 
// - erc-721 NFT minted when piece is generated
// - include in metadata (mapping dataset(hash? (id))=>struct @authors (one per dataset), price , datatype(enum) )
// - prompt(hash) ?/ owner / 
// - calculeFee()+plateform fee (fix)/or not (subscription based model)
// - payFee() [checkBalance]
// - ...
