// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

interface IReentrancyGuard {
    error ReentrancyGuard__ReentrantCall();
}
