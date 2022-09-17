// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.13;

// import "forge-std/Test.sol";
// import "../src/contracts/FRENConstitutor.sol";

// contract FRENConstitutorTest is Test {
//     FRENConstitutor public constitutor;
//     address bob = address(0x1);
//     uint256 HUNDRED_IN_WEI = 100000000000000000000;

//     function setUp() public {
//         token = new Constitutor();
//     }

//     function testCreate() public {
//         // bob mints 100 tokens for himself
//         vm.startPrank(bob);
//         vm.stopPrank();

//         assertEq(token.balanceOf(bob), HUNDRED_IN_WEI);
//     }
// }