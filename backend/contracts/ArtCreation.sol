// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol"; //recode with solady as it saves gas
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; //not sure if we need it
import {ERC721Burnable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol"; // not sure if we need it

import "./CR8Art.sol";

//CreateInterface
//events / modifiers ...
//add comments & type annotations
//assign visibility correctly & memory types
//gather all constants
interface IArtCreation {
    
}

enum datatype {
    images,
    music,
    video,
    def //default value
}

struct DatasetMetadata {
    uint256 quantity;
    string storageUrl;
    uint256 size;
    uint256 date; // update this field later
}

struct Dataset {
    string id; //hash of dataset ?
    uint256 price; 
    address author;//authors
    datatype datatype;
    //terms & conditions
    string liscence;
    //dataset related metadata
    DatasetMetadata metadata;

}

struct Model {
    string id; //hash of dataset ?
    uint256 price; 
    address author;//authors
    //datatype datatype;
    //terms & conditions
    string liscence;
    string storageUrl;
    //model related metadata
    //DatasetMetadata metadata;

}

//immutable CR8Art NFT data
struct Cr8ArtMetadata {
    address creator;
    uint256[] datasets;
    uint256[] models;
    string prompt;
    bool paid;  //why this is here ?
}

/*enum PaymentModel {
    fix,
    subscription //
}*/

contract ArtCreation is IArtCreation, Ownable {//transfer this to deployer account & create the NFT one
    //pub variables
    //mapping user/model ? => if a user is subscribed to a model or not / else put the fixed fee 
   // mapping (address => )
   uint256 private _nextTokenId;

    mapping (address => Cr8ArtMetadata[]) cr8Metadata; //mapping user generated arts ?
    mapping (uint256 => Dataset) datasets; //from the other contract
    mapping (uint256 => Model) models; //from the other contract

    CR8Art public cr8Art;
    
    //----events
    //SuccessfulArtCreationAttempt event
    //failedArtCreationAttempt event
    //nftCreated
    //paymentFailed
    
    //----functions 
    //modifiers
    //modifier _onlyOwner { //can call payfee?}

    //constructor
    constructor(/*uint256[] memory datasetIds, uint256[] memory modelIds, string memory prompt*/) ERC721("CR8Art", "CR8") Ownable(msg.sender) {
        //set some metadata / vars
        //cr8Metadata[msg.sender] = Cr8ArtMetadata(msg.sender, datasetIds, modelIds, prompt, false);
        cr8Art = new Cr8Art();

    }

    //on récup ça depuis le compte user selon son subscription model ?
    //called internally
    function _definePlateformFeePercentage(address user) private pure returns (uint256)  {
        //initially we fix the value
        return 2;
    }

    //only User
    function _calculateTotalProvidersFees() public view returns (uint256) {
        //check if user have used models/data sets before loop ?
        uint256 sum = 0;
            for (uint i=0; i <= cr8Metadata[msg.sender].datasets.length; i += 1) {
                sum += cr8Metadata[msg.sender].datasets[i];
            }
            for (uint i=0; i <= cr8Metadata[msg.sender].models.length; i += 1) {
                sum += cr8Metadata[msg.sender].models[i];
            }
        return sum;
    }

    function payFee() public payable  {
        uint256 plateformFee = _definePlateformFeePercentage(msg.sender);
        uint256 providorsFee = _calculateTotalProvidersFees();
        require(msg.value > providorsFee+plateformFee, "Not enough credit"); //or use balance instead
        //paying ... use safeTransfer
        _deposit(providorsFee+plateformFee);

        _mintNFT(msg.sender, "tokenURI");//update with NFT metadata URI
        _distributeFees();//or call it individually ?  [exchange places or not ?]
    }

    function _mintNFT(address user, string memory tokenURI) private returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(user, tokenId); //refer to that contract for minting (external func )
        _setTokenURI(tokenId, tokenURI);

        return tokenId;
    }

    //implement _payFees() which do the transfer
    function _deposit(uint256 amount) private {
        (bool sent, bytes memory data) = address(this).call{value: amount}("");
        require(sent, "Failed to send XTZ.");
    }

    //implement _sendShare(address to, uint256 amount) 
    function _sendShare(address author, uint256 amount) private {
        //transfer (safeTransferTo) author, amount
    }

    function _distributeFees() private { //called only by contract

        //each author address gets the price spicified (initially we have only one)
        uint256[] memory datasetIds = cr8Metadata[msg.sender].datasets; //enhance this
        for (uint i=0; i <= datasetIds.length; i += 1) {
            address author = datasets[datasetIds[i]].author;
            uint256 amount = datasets[datasetIds[i]].price;
            _sendShare(author, amount); //send to account
        }

        uint256[] memory modelIds = cr8Metadata[msg.sender].models; //enhance this
        for (uint i=0; i <= modelIds.length; i += 1) {
            address author = datasets[datasetIds[i]].author;
            uint256 amount = datasets[datasetIds[i]].price;
            _sendShare(author, amount); //send to account
        }
    }

    //getters & setters


    //fill in & get metadata out our creation

    //Burn NFT :))

    //implement recieve function to recieve eth (or equiv tezos)
    function recieve() external payable {}

} 
//Art Creation contracts must impelment => 
// - erc-721 NFT minted when piece is generated
// - include in metadata (mapping dataset(hash? (id))=>struct @authors (one per dataset), price , datatype(enum) )
// - prompt(hash) ?/ owner / 
// - calculeFee()+plateform fee (fix)/or not (subscription based model)
// - payFee() [checkBalance]
// - ...

