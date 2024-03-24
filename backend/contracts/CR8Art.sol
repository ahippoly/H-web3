// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// CR8 Art NFT 

contract CR8Art is ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    constructor() ERC721("CR8Art", "CR8A") Ownable(msg.sender) {}

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