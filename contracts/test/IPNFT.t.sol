// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/IPNFT.sol";

contract IPNFTTest is Test {
    IPNFT public token;
    address bob = address(0x1);

    function setUp() public {
        token = new IPNFT();
    }

    function testCreate() public {
        vm.startPrank(bob);
        token.create();
        vm.stopPrank();

        assertEq(token.balanceOf(bob, 0), 1);
    }
}
