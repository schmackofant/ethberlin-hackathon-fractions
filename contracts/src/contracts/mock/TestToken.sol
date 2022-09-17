// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {

    constructor(
        address mintTo
    ) ERC20("US Dollar Coin", "USDC") {
        _mint(mintTo, 10_000_000e18);
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

}