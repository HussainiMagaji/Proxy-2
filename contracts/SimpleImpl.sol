// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";


contract SimpleImpl is OwnableUpgradeable {
    uint public numContents;

    function initialize(address _initialOwner, uint _numContents) public initializer {
        __Ownable_init(_initialOwner);
        numContents =  _numContents;
    }

    function reduceContents( ) public {
        require(numContents > 0, "Contents are empty!");
        --numContents;
    }
}