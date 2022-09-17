// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./FRENToken.sol";
import "../interfaces/IFactory.sol";

contract FRENTokenFactory is IFactory {
    event FRENTokenCreated(address tokenAddress);

    function deployNewFRENToken(
        string calldata name,
        string calldata symbol,
        uint8 decimals,
        uint256 initialSupply,
        address owner,
        uint256 parent1155
    ) public returns (address) {
        FRENToken frenToken = new FRENToken(
            name,
            symbol,
            decimals,
            initialSupply,
            owner,
            parent1155
        );
        emit FRENTokenCreated(address(frenToken));

        return address(frenToken);
    }
}
