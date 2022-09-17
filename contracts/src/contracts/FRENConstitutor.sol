// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./FRENToken.sol";
import "./IPNFT.sol";

contract FRENConstitutor {

    using Strings for uint256;  // clever package which lets you cast uints to strings

    IPNFT public famToken;
    // FRENTokenFactory public frenTokenFactory;
    IERC20 public reconstitutionOfferToken; // Token that we're accepting reconstitution offers in 

    //structs
    struct FAMDepositorProfile {
        uint256 tokenId;
        uint256 tokensLocked;
    }
    
    struct TopReconstitutionOffer {
        address offerer;
        uint256 amount;
        uint256 tokenId; // FAM Token ID that the offer is for 
    }

    // FAM depositor profiles
    mapping(address => FAMDepositorProfile) public FAMDepositorProfiles;

    // Mapping FAM tokens to their associated FREN Tokens
    mapping(uint256 => address) public FAMTokenIdToFRENToken;

    // FAM token ids to top reconstitution offers
    mapping(uint256 => TopReconstitutionOffer) public FAMToTopReconstitutionOffer;

    // FAM token id to reconstitution votes
    mapping(uint256 => uint256) public FAMToReconstitutionVotes;

    // (super inefficient) map accounts to voting status on various FAMs
    mapping(address => mapping(uint256 => bool)) votingStatus;

    // mapping FAM to whether reconstitution is active for it
    mapping(uint256 => bool) reconstitutionStatus;

    event FRENTokenCreated(address tokenAddress);


    constructor(
        IPNFT _famToken,
        IERC20 _reconstitutionOfferToken
    ) {
        famToken = _famToken;
        reconstitutionOfferToken = _reconstitutionOfferToken;
    }

    //////////////////////////////////////////////////////////////////
    /* FREN Token Factory Logic                                     */
    //////////////////////////////////////////////////////////////////

    function deployNewFRENToken(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 initialSupply,
        address accountLockingFAM,
        uint256 parent1155
    ) internal returns (address) {

        FRENToken frenToken = new FRENToken(
            name,
            symbol,
            decimals,
            initialSupply,
            accountLockingFAM,
            parent1155,
            address(this)
        );
        emit FRENTokenCreated(address(frenToken));

        return address(frenToken);
    }

    //////////////////////////////////////////////////////////////////
    /* FREN Generation and FAM Locking                              */
    //////////////////////////////////////////////////////////////////

    // Say you createFren with some FAM tokens and then send remaining FAM tokens to another person
    // There is no use for that person to createFren against the FAM tokens they got from you
    // Because the FREN contract already exists
    function createFren(
        uint256 id, // ID of FAM token we're minting FRENS against
        uint256 amountFAMToLock,
        uint256 initialSupply
    ) public returns(address) {
        // what if you mint multiple FREN tokens against the same FAM token ID. we gotta stop that
        require(FAMTokenIdToFRENToken[id] == address(0), "FREN already created");

        // acquire FAM tokens
        famToken.safeTransferFrom(
            msg.sender,
            address(this),
            id,
            amountFAMToLock,
            "0x"
        );

        FAMDepositorProfiles[msg.sender].tokenId = id;
        FAMDepositorProfiles[msg.sender].tokensLocked += amountFAMToLock;

        // This mints initialSupply to msg.sender as well as create contract
        address FREN = deployNewFRENToken(
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
            id
        );

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
    ) public {
        // acquire FAM tokens
        famToken.safeTransferFrom(
            msg.sender,
            address(this),
            FAMDepositorProfiles[msg.sender].tokenId,
            amountFAMToLock,
            "0x"
        );

        FAMDepositorProfiles[msg.sender].tokensLocked += amountFAMToLock;

        // minting amountFRENToMint
        FRENToken( FAMTokenIdToFRENToken[ FAMDepositorProfiles[msg.sender].tokenId ] ).mint(msg.sender,amountFRENToMint);
    }

    //////////////////////////////////////////////////////////////////
    /* Reconstitution Logic                                         */
    //////////////////////////////////////////////////////////////////

    // receive USDC from FAM acquirer
    // future: require that governance has given you permission to make a reconstitution offer 
    // @param id ID of FAM token that the offer is being made for
    function reconstitutionOffer(uint256 amount, uint256 id) public {
        // must be higher offer than current offer for FAM
        require(amount > FAMToTopReconstitutionOffer[id].amount, "offer too low");
        // reconstitution can't be active
        require(reconstitutionStatus[id], "reconstitution is active");

        reconstitutionOfferToken.transferFrom(msg.sender, address(this), amount);
        
        // refund previous offerer
        reconstitutionOfferToken.transferFrom(address(this), FAMToTopReconstitutionOffer[id].offerer, FAMToTopReconstitutionOffer[id].amount);

        // set new high offer
        FAMToTopReconstitutionOffer[id].offerer = msg.sender;
        FAMToTopReconstitutionOffer[id].amount = amount;
        FAMToTopReconstitutionOffer[id].tokenId = id;

    }
    
    // allow FREN holders to signal support
    // we're not dealing with the logic of reseting voting status for now
    function vote(uint256 id) public {
        require(votingStatus[msg.sender][id] == false, "already voted");

        uint256 votingImpact = FRENToken(FAMTokenIdToFRENToken[id]).balanceOf(msg.sender);

        FAMToReconstitutionVotes[id] += votingImpact;
        votingStatus[msg.sender][id] = true; // you've now voted
    }

    function reconstitute(uint256 id) public {
        require(FAMToReconstitutionVotes[id] > FRENToken(FAMTokenIdToFRENToken[id]).totalSupply() / 2, "not past 50%");

        reconstitutionStatus[id] = true;
    }


}