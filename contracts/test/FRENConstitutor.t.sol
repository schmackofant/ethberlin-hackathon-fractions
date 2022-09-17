// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/contracts/FRENConstitutor.sol";
import "../src/contracts/IPNFT.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FRENConstitutorTest is Test {
    FRENConstitutor public constitutor;
    IPNFT public ipnft;
    ERC20 public usdc;
    address bob = address(0x1);
    uint256 THOUSAND_IN_WEI = 1000000000000000000000;

    function setUp() public {
        ipnft = new IPNFT();
        usdc = new ERC20("Test","TET");
        constitutor = new FRENConstitutor(ipnft,usdc);
    }

    function testCreate() public {
        // bob mints 100 tokens for himself
        vm.startPrank(bob);
        ipnft.create(100, "ar://i-am-a-test-uri");
        ipnft.setApprovalForAll(address(constitutor),true);
        address frens = constitutor.createFren(0, 50, 1000);
        vm.stopPrank();

        assertEq(ipnft.balanceOf(bob,0), 50);
        assertEq(IERC20(frens).balanceOf(bob), THOUSAND_IN_WEI);
    }
}