// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./CR8Cert.sol" ;
import {CREATE3} from "solady/src/utils/CREATE3.sol";


//make a unified dataset / model representing struct
interface IDataProvision {

}

contract DataProvision is IDataProvision , Ownable {
    //mapping author dataset
    mapping (address => Dataset) datasets;
    //mapping author moddel
    mapping (address => Model) models;
    //mapping NFTs authors
    mapping (address => uint256[]) tokens;

    mapping (address => bool) providersList;

    CR8Cert public cr8Cert;

    event OwnershipNFTMinted(uint256 _tokenID);
    
    //recup tokenURI before mint
    constructor() payable Ownable(msg.sender) {
        cr8Cert = new CR8Cert();
    }

    function addProvider(address provider) public onlyOwner {
        require(provider != address(0));
        providersList[provider] = true;
    }

    modifier _onlyProvider() {
        require(providersList[msg.sender]);
        _;
    }

    function addDataset(
        string id,
        uint256 price,
        string memory dtype,
        string memory liscence,
        uint256 quantity,
        string memory storageUrl,
        uint256 size,
        uint256 date

    ) external _onlyProvider {
        DatasetMetadata memory metadata = DatasetMetadata(quantity, storageUrl, size, date);
        Dataset memory dataset = Dataset(id, price ,msg.sender, datatype.def, liscence, metadata);
        //require  successful upload
        require(bytes(storageUrl).length > 0, "Storage Url is empty");
        //mint NFT after successful upload
        uint256 tokenId =  cr8Cert.safeMint(msg.sender, storageUrl);
        emit OwnershipNFTMinted(tokenId);
        
        //update mappings
        datasets[msg.sender] = dataset;
        tokens[msg.sender].push(tokenId);
    }

    function addModel(
        string id, 
        uint256 price, 
        address author,
        string memory liscence,
        string memory storageUrl
    ) external _onlyProvider{
        Model memory model = Model(id, price, author, liscence, storageUrl);
        //require  successful upload
        require(bytes(storageUrl).length > 0, "Storage Url is empty");
        //mint NFT after successful upload
        uint256 tokenId =  cr8Cert.safeMint(msg.sender, storageUrl);
        emit OwnershipNFTMinted(tokenId);

        //update mappings
        models[msg.sender] = model;
        tokens[msg.sender].push(tokenId);
    }

    /*function create3(byte32 salt, bytes memory creationCode) external payable onlyOwner returns (address addr) {
        addr = CREATE3.deploy(salt, creationCode, 0);
    }

    function addressOf(bytes32 salt) external view returns (address) {
        return CREATE3.getDeployed(salt);
    }*/

    modifier _onlyOwnerProvider(string assetId) {
        require(providersList[msg.sender]);
        require(_isOwner(assetId)); //must be owner of that asset
        _;
    }

    function setPrice(datasetId/modelId, sender) {
        
    }

    function _isOwner(string assetId) view returns (bool) {

    }

    function getTokensPerAuthor
    function getDatasetsPerAuthor
    function getModelsPerAuthor() public 
    
    function isProvidor(address addr) public view returns () {
        return providersList[addr];
    }

}

//make art creators pay for storage
// - at dataset upload => gen hash or something represetative of the dataset, metadata : place(ipfs), size, num of elets, ... 
// - setPrice() => 
// - metadata() => {Date, owner(s), IP, liscence, ... , termes d'usage,}
// - mint proof of ownership (data provider will pay gas fee)

// Recieve shares when dataset used 
