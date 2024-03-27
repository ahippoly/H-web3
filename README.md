# H-W3B 2024 Hackathon 
### Summary 

Project : **CR8** *(Cr'eight)* is a collaborative web3 plateform for genrative art creators  that  allows artists/ Ip holders to monetize sharing their assets (datasets or AI models) and generative AI creators to have a legal and clean mean at their disposal, allowing them to have access proprietary and high quality assets for their creations.

## Overview 

### Smart Contracts Integration
- **ArtCreation**: to manage user's art creation actions, generateArt pieces and track their proveneance (used datasets and models along with their owners), including payement for their usage and the fee redistribution for concerned providers. This contract allows users to mint ownership NFT "CR8Art" to certify their art creation and belonging.
- **DataProvenance**: to manage the datasets and models creation and addition, it also allows to have a whitelisted mechanism to allow only registred providers to upload and beenfit from the plateform. This contract allows providers to mint an ownership NFT "CR8Cert" with each data/model upload to authetify its belonging to the original providers  

### deployed on : (Sepolia testnet / *Etherlink was down at the moment of deployment*) 
- ArtCreation contract: *0x86E5dE549fBF9a8cE9f4086259ecC1E66810f18b*
- DataProvenance contract: *0x56c467366972857a61990ADac352abf18F635Ce1*
- CR8Art NFT contract: *0x1d8062d5E2C49520531464813534C7D81d830Ae6*
- CR8Cert NFT contract: *0xf66AdD67f1d95B3FE38fc01130a0712594CcB3c6*

## Frontend & Screens

### Description

The Front-End is a tool to generate a NFT thanks to AI generation tool, you can choose a model and a dataset published by a user from the platform

You can then generate your image with this both parameters, we tried to track as much as possible the IA generation process, that is why we add the description given by the AI in the interface

There is also a interface for users to publish their datasets and models, they can set a price to it and earn revenue with that

### Usage

```bash
yarn install
```

```bash
yarn dev
```
Don't forget to add the API Keys from .env.example

### Screens

![alt text](https://cdn.discordapp.com/attachments/655207317788164108/1221404025409503302/image.png?ex=66127424&is=65ffff24&hm=e1bf26818a6783244593b8c2a642733a23df02594daace02a440d476939a1e58&)

![alt text](https://cdn.discordapp.com/attachments/655207317788164108/1221404145496494100/image.png?ex=66127440&is=65ffff40&hm=4045a72d37b99eba5e1ba3179e60382e5c4acf207ef39a5a200ea3fa9841dd68&)

![alt text](https://cdn.discordapp.com/attachments/655207317788164108/1221407063121465344/image.png?ex=661276f8&is=660001f8&hm=54f212024f7a9c142baf0f419d97e14e3ddc6f945e8bad52d51c5cc9d0140f34&)

![alt text](https://cdn.discordapp.com/attachments/655207317788164108/1221407235247444058/image.png?ex=66127721&is=66000221&hm=1905b1bf5ca94da68056dabb58e4e5307d0c796fb0d125fedf235ef51646f6b6&)

![alt text](https://cdn.discordapp.com/attachments/655207317788164108/1221409188496801842/image.png?ex=661278f3&is=660003f3&hm=df442ffdeb8a9185cb006d8739ad9b8633060cda2a5c5787b3443db2cbf8f284&)


### Technologies

 - **Backend** :
    - Hardhat & Solidity for smart contracts
    - PINATA/IPFS for data storage and NFT metadata.

 - **Frontend** : Typescript / React

#### Team
+ Arnaud
+ Anfal
+ Elliot
+ Lorenzo
+ Yue
