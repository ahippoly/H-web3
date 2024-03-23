// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

//make a unified dataset / model representing struct
interface IDataProvision {

}

contract DataProvision is IDataProvision {
    
}

//make art creators pay for storage
// - at dataset upload => gen hash or something represetative of the dataset, metadata : place(ipfs), size, num of elets, ... 
// - setPrice() => 
// - metadata() => {Date, owner(s), IP, liscence, ... , termes d'usage,}
// - mint proof of ownership (data provider will pay gas fee)

// Recieve shares when dataset used 
