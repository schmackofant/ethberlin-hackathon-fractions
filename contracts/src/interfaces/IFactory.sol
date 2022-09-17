// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IFactory{
    function deployNewERC20Token(string calldata name, string calldata symbol, uint8 decimals,uint256 initialSupply) external returns(address erc20address); 
}
