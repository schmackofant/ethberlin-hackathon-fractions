// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/console.sol";
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

        assertEq(token.balanceOf(bob, 1), 1);
    }

    function testCounter() public {
        vm.startPrank(bob);
        token.create();
        token.create();
        vm.stopPrank();

        assertEq(token.balanceOf(bob, 1), 1);
    }

    function testTokenURI() public {
        vm.startPrank(bob);
        token.create();
        vm.stopPrank();

        console.log(token.uri(1));

        assertEq(token.uri(1), "ar://i-am-a-test-uri");
    }
}
