// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface IReentrancyGuard {
    error ReentrancyGuard__ReentrantCall();
}
