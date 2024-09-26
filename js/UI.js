


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
