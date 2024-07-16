//SPDX-License-Identifier: UNLICENSED

import "./Token.sol";
pragma solidity ^0.8.9;

contract Bridge {
    address immutable public token;
    mapping(bytes32 => bool) redemeed;
    mapping(address => uint) faceded;
    event SwapInitialized(address from, address to, uint256 amount, string symbol);
    event RedeemInitialized(address from, address to, uint256 amount, uint256 tx_hash, string symbol);

    constructor(address _token) {
        token = _token;
    }

    mapping(address => bytes) public signatures;

    modifier checkValidERC20(string memory symbol) {
        require(keccak256(abi.encodePacked(Token(token).symbol())) ==
                keccak256(abi.encodePacked(symbol)), "non supported erc20 token");
        _;
    }


    function facet() public {
        require(faceded[msg.sender] <= (block.timestamp - 1 days), "we can only send facet every 24 hours");
        faceded[msg.sender] = block.timestamp;
        Token(token).mint(msg.sender, 1 ether);
    }

    //Swap(): transfers tokens from sender to the contract
    function swap(address to, uint256 amount, string memory symbol) checkValidERC20(symbol) public {
            Token(token).burn(msg.sender, amount);
            emit SwapInitialized(msg.sender, to, amount, symbol);
    }

    // takes hashed message and a signature, calls ecrecover to recover the signer and verifies 
    //if the recovered address is the validator address; if yes, transfers tokens to the receiver.
    function redeem(address from, address to, uint256 amount, uint256 tx_hash, string memory symbol) checkValidERC20(symbol) public {

        bytes32 message = keccak256(abi.encodePacked(from, to, amount, symbol));
        require(!redemeed[message], "re-entrance");
        redemeed[message]=true;

        Token(token).mint(to, amount);
        emit RedeemInitialized(from, to, amount, tx_hash, symbol);
    }
}