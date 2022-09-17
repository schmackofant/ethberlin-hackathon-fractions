// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./ERC20Token.sol";

contract ERC20TokenFactory {
    event ERC20TokenCreated(address tokenAddress);

    function deployNewERC20Token(
        string calldata name,
        string calldata symbol,
        uint8 decimals,
        uint256 initialSupply
    ) public returns (address) {
        ERC20Token erc20Token = new ERC20Token(
            name,
            symbol,
            decimals,
            initialSupply,
            msg.sender
        );
        emit ERC20TokenCreated(address(erc20Token));

        return address(erc20Token);
    }
}
