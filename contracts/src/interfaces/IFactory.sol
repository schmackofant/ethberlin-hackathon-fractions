// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IFactory{
    function deployNewFRENToken(
        string calldata name,
        string calldata symbol,
        uint8 decimals,
        uint256 initialSupply,
        address owner,
        uint256 parent1155,
        address _parentFactory
    ) external returns(address erc20address); 
}