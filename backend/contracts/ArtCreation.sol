// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import "./CR8Art.sol";
import "./DataProvision.sol";

//CR8Art NFT data
struct Cr8ArtMetadata {
    string artId;
    address creator;
    string[] datasets;
    string[] models;
    string prompt;
    string storageUrl;
    bool paid;  
}

/*enum PaymentModel {
    fix,
    subscription //
}*/

interface IArtCreation {
    function payFee(string memory artId) external payable;
}

contract ArtCreation is IArtCreation, Ownable {

    //mapping user/model ? => if a user is subscribed to a model or not / else put the fixed fee 

    mapping (address => mapping (string => Cr8ArtMetadata)) public cr8Metadata; //mapping user generated arts 

    CR8Art public cr8Art;
    address public dataProvision;
    uint256 public plateformFees;

    
    //----events

    event SuccessfulArtCreationAttempt(string artId); 
    event CR8ArtNFTCreated(uint256 tokenId);
    event PayementFailed(); /*"Unsufficient balance"*/
    
    //----functions 

    //constructor
    constructor() Ownable(msg.sender) {
        cr8Art = new CR8Art();
    }

    function generateArt(string memory artId, string[] memory datasetIds, string[] memory modelIds, string memory prompt, string memory storageUrl) public {
        cr8Metadata[msg.sender][artId] = Cr8ArtMetadata(artId, msg.sender, datasetIds, modelIds, prompt, storageUrl, false); //pending until user pays / NFT is not revoked
        require(bytes(storageUrl).length > 0, "Storage Url is empty");
        emit SuccessfulArtCreationAttempt(artId);
    }

    //called internally (on doit savoir chaque utilisateur et son subscription model later-on)
    function _definePlateformFeePercentage(address user, uint256 bps) private view returns (uint256)  {
        //initially we fixed the value
        return plateformFees * bps / 10_000;
    }

    //only User
    function _calculateTotalProvidersFees(string memory artId) public view returns (uint256) {
        //check if user have used models/data sets before loop ?
        uint256 sum = 0;
        string[] memory datasets = cr8Metadata[msg.sender][artId].datasets;
        string[] memory models = cr8Metadata[msg.sender][artId].models;
            for (uint i=0; i <= datasets.length; i += 1) {
                Dataset memory dataset = IDataProvision(dataProvision).getDatasetById(datasets[i]);
                sum +=  dataset.price;
            }
            for (uint i=0; i <= models.length; i += 1) {
                Model memory model = IDataProvision(dataProvision).getModelById(models[i]);
                sum += model.price;
            }
        return sum;
    }

    function payFee(string memory  artId) external payable {
        //make sure this art is his 
        require(_isCreator(msg.sender, artId), "You can't claim what's not yours!");

        uint256 plateformFee = _definePlateformFeePercentage(msg.sender, 20_000);
        uint256 providorsFee = _calculateTotalProvidersFees(artId);

        require(msg.sender.balance > providorsFee+plateformFee, "Not enough balance!");
        
        _deposit(providorsFee+plateformFee);

        uint256 tokenId = cr8Art.safeMint(msg.sender, cr8Metadata[msg.sender][artId].storageUrl); //update with NFT metadata URI
        
        _distributeFees(artId);

        emit CR8ArtNFTCreated(tokenId);
    }

    //implement _deposit() which does the transfer from user to this contract
    function _deposit(uint256 amount) private {
        (bool sent, bytes memory data) = address(this).call{value: amount}("");
        require(sent, "Failed to send XTZ.");
    }

    //implement _sendShare(address to, uint256 amount) 
    function _sendShare(address _to, uint256 amount) private {
        (bool sent, bytes memory data) = _to.call{value: amount}("");
        require(sent, "Failed to send XTZ.");
    }

    function _distributeFees(string memory artId) private { //called only by contract

        //each author address gets the price spicified (initially we have only one)
        string[] memory datasetIds = cr8Metadata[msg.sender][artId].datasets; //enhance this
        for (uint i=0; i <= datasetIds.length; i += 1) {
            Dataset memory dataset = IDataProvision(dataProvision).getDatasetById(datasetIds[i]);
            _sendShare(dataset.author, dataset.price); //send to account
        }

        string[] memory modelIds = cr8Metadata[msg.sender][artId].models; //enhance this
        for (uint i=0; i <= modelIds.length; i += 1) {
            Model memory model = IDataProvision(dataProvision).getModelById(modelIds[i]);
            _sendShare(model.author, model.price); //send to account
        }
    }

    function _isCreator(address addr, string memory  artId) public view returns (bool) {
        if (keccak256(abi.encodePacked(cr8Metadata[addr][artId].artId)) 
            == keccak256(abi.encodePacked(artId)))
            {
            return true;
        }
        return false;
    }

    //getters & setters
    //getTokenByUser?

    function setDataProvisionAddr(address _dataProvision) public {
        dataProvision = _dataProvision;
    }

    function setFees(uint256 fees) public onlyOwner {
        plateformFees = fees;
    }

    //implement recieve function to recieve eth (or equiv XTZ)
    function recieve() external payable {}

} 


