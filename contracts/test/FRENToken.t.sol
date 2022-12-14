// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/contracts/FRENToken.sol";

contract FRENTokenTest is Test {
    FRENToken public token;
    address bob = address(0x1);
    address alice = address(0x2);
    uint256 HUNDRED_IN_WEI = 100000000000000000000;

    function setUp() public {
        token = new FRENToken(
          "foo",
          "foo",
          18,
          100,
          bob,
          1,
          alice
        );
    }

    function testCreate() public {
        // bob mints 100 tokens for himself
        vm.startPrank(bob);
        vm.stopPrank();

        assertEq(token.balanceOf(bob), HUNDRED_IN_WEI);

    }

    function testFailMint() public {
        // bob mints 100 tokens for himself
        vm.startPrank(bob);
        token.mint(bob, 100);
        vm.stopPrank();
    }

    function testSetup() public {
        // bob mints 100 tokens for himself
        vm.startPrank(bob);
        vm.stopPrank();

        assertEq(token.parent1155(), 1);
        assertEq(token.parentFactory(), alice);

    }
    

}