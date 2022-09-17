// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./FRENToken.sol";
import "../interfaces/IFactory.sol";

contract FRENTokenFactory is IFactory {
    event FRENTokenCreated(address tokenAddress);
    
    address public frenConstitutor;

    constructor(address _frenConstitutor) {
        frenConstitutor = _frenConstitutor;
    }

    function deployNewFRENToken(
        string calldata name,
        string calldata symbol,
        uint8 decimals,
        uint256 initialSupply,
        address owner,
        uint256 parent1155,
        address _parentFactory
    ) public returns (address) {
        require(msg.sender == ipNFT, "not IPNFT");

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
