// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FRENToken is ERC20 {

    uint256 public _parent1155;

    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 initialSupply,
        address owner,
        uint256 parent1155  // The parent ERC1155 token id that the ERC20 is a FREN for
    ) ERC20(name, symbol) {
        _mint(owner, initialSupply * 10**uint256(decimals));
        _parent1155 = parent1155;
    }
}
