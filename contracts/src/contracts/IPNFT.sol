// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract IPNFT is Ownable, Pausable, ERC1155URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter public _tokenIdCounter;
    
    // address public frenFactory;

    constructor() ERC1155("") {}


    // mappings 
    mapping(uint256 => uint256) private _totalSupply;
    mapping(uint256 => FRENContracts) public erc1155ToFREN;

    //structs
    struct FRENContracts {
        uint256 tokenId;
        uint256 tokensLocked;
        address FRENaddress;
    }



    modifier onlyHolder(uint256 _id) {
        require(balanceOf(msg.sender, _id) > 0, "Must be FAM Holder");
        require(totalSupply(_id) == 1, "Must be single holder");
        _;
    }

    function create(uint256 initialSupply, string memory tokenURI) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _mint(msg.sender, tokenId, initialSupply, "");
        _setURI(tokenId, tokenURI);
    }

    function addFAM(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner onlyHolder(id) {
        _mint(account, id, amount, data);
    }

    function burn(
        address account,
        uint256 id,
        uint256 value
    ) public virtual {
        require(
            account == _msgSender() || isApprovedForAll(account, _msgSender()),
            "ERC1155: caller is not token owner or approved"
        );

        _burn(account, id, value);
    }

    function burnBatch(
        address account,
        uint256[] memory ids,
        uint256[] memory values
    ) public virtual {
        require(
            account == _msgSender() || isApprovedForAll(account, _msgSender()),
            "ERC1155: caller is not token owner or approved"
        );

        _burnBatch(account, ids, values);
    }

    /**
     * @dev Total amount of tokens in with a given id.
     */
    function totalSupply(uint256 id) public view virtual returns (uint256) {
        return _totalSupply[id];
    }

    /**
     * @dev Indicates whether any token exist with a given id, or not.
     */
    function exists(uint256 id) public view virtual returns (bool) {
        return totalSupply(id) > 0;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * @dev See {ERC1155-_beforeTokenTransfer}.
     */
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);

        if (from == address(0)) {
            for (uint256 i = 0; i < ids.length; ++i) {
                _totalSupply[ids[i]] += amounts[i];
            }
        }

        if (to == address(0)) {
            for (uint256 i = 0; i < ids.length; ++i) {
                uint256 id = ids[i];
                uint256 amount = amounts[i];
                uint256 supply = _totalSupply[id];
                require(
                    supply >= amount,
                    "ERC1155: burn amount exceeds totalSupply"
                );
                unchecked {
                    _totalSupply[id] = supply - amount;
                }
            }
        }
    }
}
