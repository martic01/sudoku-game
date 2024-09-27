import { inputCreation } from './game.js';
import { pickBox } from './game.js';
import { inputNumbers } from './game.js';
import { clearInputed } from './game.js';
import { num1to9Checker } from './game.js';
import { generatePuzzle } from './game.js';
import { solvePuzzle } from './game.js';
import { disabled } from './game.js';
import { userAnswer } from './game.js';

import './css/styles.css';
import $ from 'jquery';

window.onload = () => {
    disabled()
    const numClues = 20;
    inputCreation();
    pickBox();
    inputNumbers();
    clearInputed();
    num1to9Checker();

    $(".start").click(function () {
        $(".endbtn").show();
        $(".start").hide();
        $(".result").slideUp();
        generatePuzzle(numClues);
        disabled()
    });
    $(".done").click(function () {
        $(".endbtn").show()
        $(".start").hide()
        $(".result").slideDown()
        disabled()
        userAnswer()
    });
    $(".again").click(function () {
        $(".endbtn").show()
        $(".start").hide()
        $(".result").slideUp()
        generatePuzzle(numClues);
        disabled()
    });
    $(".solve").click(function () {
        $(".endbtn").show()
        $(".start").hide()
        $(".result").slideUp()
        $(".bac").show()
        solvePuzzle();
    });
    $(".bac").click(function () {
        $(".endbtn").show()
        $(".start").hide()
        $(".result").slideDown()
        $(".bac").hide()
    });

};
