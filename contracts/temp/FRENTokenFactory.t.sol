// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/contracts/FRENTokenFactory.sol";
import "../src/contracts/FRENToken.sol";


contract FRENTokenFactoryTest is Test {
  FRENTokenFactory public factory;
  FRENToken public token;
  address bob = address(0x1);
  uint256 HUNDRED_IN_WEI = 100000000000000000000;

  function setUp() public {
        factory = new FRENTokenFactory();
        token = new FRENToken(
          "foo",
          "foo",
          18,
          100,
          bob,
          1
        );
    }

    function testCreate() public {
        vm.startPrank(bob);
        factory.deployNewFRENToken(
          "foo",
          "foo",
          18,
          100,
          bob,
          1
        );
        vm.stopPrank();

        assertEq(token.balanceOf(bob), HUNDRED_IN_WEI);
    }

}