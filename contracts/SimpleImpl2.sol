// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";


contract SimpleImpl2 is OwnableUpgradeable {
    uint public numContents;

    // added state variable
    mapping(address => uint) count;

    function initialize(address _initialOwner, uint _numContents) public initializer {
        __Ownable_init(_initialOwner);
        numContents =  _numContents;
    }

    function reduceContents( ) public {
        require(numContents > 0, "Contents are empty!");
        require(count[msg.sender] < 3, "Cannot reduce more than 3 times!");
        --numContents;
        ++count[msg.sender];
    }

    function addContents( ) public onlyOwner {
        ++numContents;
    }
}