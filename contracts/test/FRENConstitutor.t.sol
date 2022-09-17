// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/contracts/FRENConstitutor.sol";
import "../src/contracts/IPNFT.sol";
import "../src/contracts/mock/TestToken.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FRENConstitutorTest is Test {
    FRENConstitutor public constitutor;
    IPNFT public ipnft;
    ERC20 public usdc;
    address bob = address(0x1);
    address alice = address(0x2);
    address sunny = address(0x3);
    uint256 THOUSAND_IN_WEI = 1000000000000000000000;

    function setUp() public {
        ipnft = new IPNFT();
        usdc = new TestToken(sunny);
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

    function testHappyPath() public {
        //// bob mints 100 tokens for himself
        vm.startPrank(bob);
        ipnft.create(100, "ar://i-am-a-test-uri");
        ipnft.setApprovalForAll(address(constitutor),true);
        address frens = constitutor.createFren(0, 50, 1000);
        // tranfer Alice the frens token
        IERC20(frens).transfer(alice, THOUSAND_IN_WEI);
        vm.stopPrank();

        //// makeReconstitutionOffer attempt
        vm.startPrank(sunny);
        // approve the constitutor to the max
        usdc.approve(address(constitutor), 2**256 - 1);
        // make offer for reconstitution with 1000 USDC
        constitutor.makeReconstitutionOffer(THOUSAND_IN_WEI, 0);
        vm.stopPrank();

        //// assertions
        ( address offerer, uint256 amount, uint256 tokenId ) = constitutor.FAMToTopReconstitutionOffer(0);
        assertEq(offerer , sunny, "wrong offerer");
        assertEq(amount , THOUSAND_IN_WEI, "wrong top offer amount");
        assertEq(tokenId , 0, "wrong top offer token id");
        assertEq(IERC20(frens).balanceOf(alice), THOUSAND_IN_WEI);

        //// Alice votes in favor of reconstitution
        vm.startPrank(alice);
        constitutor.vote(0);

        //// assertions
        assertEq(constitutor.votingStatus(alice, 0), true, "should have said alice already voted");

        //// Alice triggers reconstitution
        constitutor.reconstitute(0);

        //// assertions
        assertEq(constitutor.reconstitutionStatus(0), true, "reconstitution should have been true");

        //// Alice claims USDC and gives up her FREN tokens
        uint256 originalConstitutorFRENBalance = IERC20(frens).balanceOf(address(constitutor));
        uint256 originalAliceFRENBalance = IERC20(frens).balanceOf(alice);
        uint256 originalConstitutorUSDCBalance = usdc.balanceOf(address(constitutor));
        uint256 originalAliceUSDCBalance = usdc.balanceOf(alice);

        // logs
        console.log( FRENToken(constitutor.FAMTokenIdToFRENToken(0)).totalSupply() );
        ( address offerer1, uint256 amount1, uint256 tokenId1 ) = constitutor.FAMToTopReconstitutionOffer(0);
        console.log( amount1 );
        console.log( IERC20(frens).balanceOf(alice) );

        IERC20(frens).approve(address(constitutor), 2**256 - 1);
        constitutor.claim(0);

        vm.stopPrank();

        //// assertions
        assertEq(IERC20(frens).balanceOf(address(constitutor)), 0, "should have no FRENs in constitutor, no reason to"); // should have no FRENs in constitutor, no reason to
        assertEq(IERC20(frens).balanceOf(alice), 0, "Alice should have had all her FRENs burned"); // Alice should have had all her FRENs burned
        assertEq(usdc.balanceOf(address(constitutor)), originalConstitutorUSDCBalance - THOUSAND_IN_WEI, "Constitutor should have lost all THOUSAND_IN_WEI of USDC"); // Constitutor should have lost all THOUSAND_IN_WEI of USDC
        assertEq(usdc.balanceOf(alice), originalAliceUSDCBalance + THOUSAND_IN_WEI, "Alice should have gained THOUSAND_IN_WEI"); // Alice should have gained THOUSAND_IN_WEI

        //// Sunny claims all the FAM
        vm.startPrank(sunny);
        constitutor.offererFAMClaim(0);
        vm.stopPrank();

        //// assertions
        assertEq(ipnft.balanceOf(sunny,0),50, "didn't receive FAM as expected");

    }

}