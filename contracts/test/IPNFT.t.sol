// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/IPNFT.sol";

contract IPNFTTest is Test {
    IPNFT public token;

    function setUp() public {
        token = new IPNFT();
    }

    // function testSomething() public {
    //   assertEq(token.totalSupply(), 0);
    // }
}
