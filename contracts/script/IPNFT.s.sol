// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/contracts/IPNFT.sol";
import "../src/contracts/FRENConstitutor.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract IPNFTScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        IPNFT nft = new IPNFT();
        // deploy the FRENConstitutor contract with the right params
        FRENConstitutor frenConstitutor = new FRENConstitutor(nft, IERC20(0x2f3A40A3db8a7e3D09B0adfEfbCe4f6F81927557))
;        vm.stopBroadcast();
    }
}

// - Run `anvil` to start local chain and get some accounts
// - Put the first private key in .env file and run `source .env`
// - Run `forge script script/IPNFT.s.sol:IPNFTScript --fork-url $ANVIL_RPC_URL --private-key $PRIVATE_KEY --broadcast -vvvv`