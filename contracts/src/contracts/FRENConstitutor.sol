// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./FRENToken.sol";
import "./FRENTokenFactory.sol";

contract FRENConstitutor {

    using Strings for uint256;  // clever package which lets you cast uints to strings

    FRENToken public frenToken;
    FRENTokenFactory public frenTokenFactory;

    //structs
    struct FAMDepositorProfile {
        uint256 tokenId;
        uint256 tokensLocked;
    }

    // FAM depositor profiles
    mapping(address => FAMDepositorProfile) public FAMDepositorProfiles;

    // Mapping FAM tokens to their associated FREN Tokens
    mapping(uint256 => address) public FAMTokenIdToFRENToken;


    constructor(
        address _frenToken
    ) {
        frenToken = _frenToken;
    }

    // Say you createFren with some FAM tokens and then send remaining FAM tokens to another person
    // There is no use for that person to createFren against the FAM tokens they got from you
    // Because the FREN contract already exists
    function createFren(
        uint256 id, // ID of FAM token we're minting FRENS against
        uint256 amountFAMToLock,
        uint256 initialSupply
    ) {
        // what if you mint multiple FREN tokens against the same FAM token ID. we gotta stop that
        require(FAMTokenIdToFRENToken[id] == address(0), "FREN already created");

        // acquire FAM tokens
        FAMToken.safeTransferFrom(
            msg.sender,
            address(this),
            id,
            amountFAMToLock,
            "0x"
        );

        FAMDepositorProfiles[msg.sender].tokenId = id;
        FAMDepositorProfiles[msg.sender].tokensLocked += amountFAMToLock;

        // This mints initialSupply to msg.sender as well as create contract
        address FREN = IFactory(frenTokenFactory).deployNewFRENToken(
            string(
                abi.encodePacked(
                    "FREN Token - ",
                    id.toString()
                )
            ), // name
            string(
                abi.encodePacked(
                    "FREN",
                    id.toString()
                )
            ), // symbol
            18,
            initialSupply,
            msg.sender,
            id,
            frenTokenFactory.address
        );

        FAMDepositorProfiles[msg.sender].FRENaddress = FREN;
        FAMTokenIdToFRENToken[id] = FREN;

        // FAMDepositorProfiles[]
        // FRENContracts memory newContract;
        // newContract.tokenId = id;
        // // newContract.tokensLocked = ;
        // newContract.FRENaddress = FREN;
        // erc1155ToFREN[id] = newContract;
        return FREN;
    }

    // function createMooorFren
    // takes amount of FAM token to deposit and amount of FREN token to mint
    // "exchange rate" is implied as a result
    function createMooooorFren(
        uint256 amountFAMToLock,
        uint256 amountFRENToMint
    ) {
        // acquire FAM tokens
        FAMToken.safeTransferFrom(
            msg.sender,
            address(this),
            FAMDepositorProfiles[msg.sender].tokenId,
            amountFAMToLock,
            "0x"
        );

        FAMDepositorProfiles[msg.sender].tokensLocked += amountFAMToLock;

        // minting amountFRENToMint
    }

    // receive USDC from FAM acquirer


    // allow FREN holders to signal support


}