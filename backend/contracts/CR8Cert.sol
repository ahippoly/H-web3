// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

//NFT for Datasets & Model
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

enum datatype {
    images,
    music,
    video,
    def
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

enum assetType {
    dataset,
    model
}

contract CR8Cert is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    /*uint256 public assetId; 
    assetType public assetType;
    address public provider;*/

    constructor() ERC721("CR8Certificate", "CR8C") Ownable(msg.sender) {}

    function safeMint(address provider, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        uint256 tokenId = _nextTokenId++;
        _safeMint(provider, tokenId);
        _setTokenURI(tokenId, tokenURI);

        return tokenId;
    }


}

