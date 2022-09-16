// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/ERC20TokenFactory.sol";
import "../src/ERC20Token.sol";


contract ERC20TokenFactoryTest is Test {
  ERC20TokenFactory public factory;
  ERC20Token public token;
  address bob = address(0x1);
  uint256 HUNDRED_IN_WEI = 100000000000000000000;

  function setUp() public {
        factory = new ERC20TokenFactory();
        token = new ERC20Token(
          "foo",
          "foo",
          18,
          100,
          bob
        );
    }

    function testCreate() public {
        vm.startPrank(bob);
        factory.deployNewERC20Token(
          "foo",
          "foo",
          18,
          100
        );
        vm.stopPrank();

        assertEq(token.balanceOf(bob), HUNDRED_IN_WEI);
    }

}