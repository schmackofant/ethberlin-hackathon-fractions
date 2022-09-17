// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FRENToken is ERC20 {

    uint256 public parent1155;
    address public parentFactory;
    address public accountLockingFAM;

    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 initialSupply,
        address _accountLockingFAM,
        uint256 _parent1155,  // The parent ERC1155 token id that the ERC20 is a FREN for
        address _parentFactory
    ) ERC20(name, symbol) {
        _mint(_accountLockingFAM, initialSupply * 10**uint256(decimals));
        _accountLockingFAM = accountLockingFAM;
        parent1155 = _parent1155;
        parentFactory = _parentFactory;
    }

    // mint only if more FAM tokens are to be locked
    // make sure only FRENConstitutor is calling this, you can verify off of public variable on FRENTokenFactory contract
    function mint(address recipient, uint256 amount) public {
        require(msg.sender == parentFactory, "not frenConstitutor");

        _mint(recipient, amount);
    }

}
