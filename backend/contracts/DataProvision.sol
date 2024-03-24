// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./CR8Cert.sol" ;


//make a unified dataset / model representing struct
interface IDataProvision {
    function getDatasetById(string memory id) external view returns (Dataset memory);
    function getModelById(string memory id) external view returns (Model memory);
}

contract DataProvision is IDataProvision , Ownable {
    //mapping author dataset
    mapping (address => Dataset) public datasets;
    //mapping author model
    mapping (address => Model) public models;
    //mapping NFTs authors
    mapping (address => uint256[]) public tokens;

    mapping (address => bool) public providersList;
    address[] _providers; 

    CR8Cert public cr8Cert;

    event OwnershipNFTMinted(uint256 _tokenID);
    event PriceUpdated(string assetId, uint256 newPrice);
    
    //recup tokenURI before mint
    constructor() payable Ownable(msg.sender) {
        cr8Cert = new CR8Cert();
    }

    function addProvider(address provider) public onlyOwner {
        require(provider != address(0));
        providersList[provider] = true;
        _providers.push(provider);
    }

    modifier _onlyProvider() {
        require(providersList[msg.sender]);
        _;
    }

    function addDataset(
        string memory id,
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
        string memory id, 
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

    modifier _onlyOwnerProvider(string memory assetId) {
        require(providersList[msg.sender]);
        require(_isOwner(msg.sender, assetId)); //must be owner of that asset
        _;
    }

    /* can't reset fee before distributeFee() & after users deposit [stealing from the plateform]
    function setPrice(string assetId, uint256 price) _onlyOwnerProvider(assetId) {
        try {
            Dataset memory dataset = getDatasetByID(assetId);
            datasets[dataset.author].price = price; 
        catch{}
        emit PriceUpdated()
    }*/

    function _isOwner(address addr, string memory assetId) public view returns (bool) {
        Dataset memory dataset =  _getDatasetById(assetId);
        if (dataset.author == addr){
            return true;
        } else {
            Model memory model = _getModelById(assetId);
            if (model.author == addr) {
                return false;
            }
        }
        return false;
    }

    function getTokensPerAuthor(address author) public view returns (uint256[] memory) {
        return tokens[author];
    }
    
    function getDatasetsPerAuthor(address author) public view returns (Dataset memory) {
        return datasets[author];
    }

    function getModelsPerAuthor(address author) public view returns (Model memory) {
        return models[author];
    }
    
    function isProvidor(address addr) public view returns (bool) {
        return providersList[addr];
    }

    function _getDatasetById(string memory id) public view returns (Dataset memory) {
        for (uint i=0; i <= _providers.length; i+=1) {
            if (keccak256(abi.encodePacked(datasets[_providers[i]].id)) 
            == keccak256(abi.encodePacked(id))) {
                return datasets[_providers[i]];
            }
        }
        revert("Not Found");
    }

    function _getModelById(string memory id) public view returns (Model memory) {
        for (uint i=0; i <= _providers.length; i+=1) {
            if (keccak256(abi.encodePacked(models[_providers[i]].id)) 
            == keccak256(abi.encodePacked(id))) {
                return models[_providers[i]];
            }
        }
        revert("Not Found");
    }

    function getDatasetById(string memory id) external view returns (Dataset memory) {
        return _getDatasetById(id);
    }

    function getModelById(string memory id) external view returns (Model memory){
        return _getModelById(id);
    }

}

