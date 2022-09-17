// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/contracts/IPNFT.sol";

contract IPNFTTest is Test {
    IPNFT public token;
    address bob = address(0x1);

    function setUp() public {
        token = new IPNFT();
    }

    function testCreate() public {
        vm.startPrank(bob);
        token.create(100, "ar://i-am-a-test-uri");
        vm.stopPrank();

        assertEq(token.balanceOf(bob, 0), 100);
    }

    function testCounter() public {
        vm.startPrank(bob);
        token.create(100, "ar://i-am-a-test-uri");
        token.create(100, "ar://i-am-a-test-uri-too");
        vm.stopPrank();

        assertEq(token.balanceOf(bob, 1), 100);
    }

    function testTokenURI() public {
        vm.startPrank(bob);
        token.create(100, "ar://i-am-a-test-uri");
        vm.stopPrank();

        assertEq(token.uri(0), "ar://i-am-a-test-uri");
    }
}
