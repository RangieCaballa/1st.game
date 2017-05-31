var w = 1200, h = 800;
var bounds =15000
var player, player2, player3, keyboard, leaf, leafs, redleaf, bb, bbs, gameover, highscore, buttonUp, buttonRight, buttonleft, stateText, time, platform,platformn,platform3,platform4,platform5,ulap,ulap2,ulap3,ulap4,ulap5;
var game = new Phaser.Game(w, h, Phaser.CANVAS, '');
var score = 0;
var scoreText;
var highscoreText;
var gamepage;
var restartbutton;
var winnerpage;
var titlepage;
var startButton;
var menuText;
var aboutText;
var aboutButton;
var aboutpage;
var buttonDown;
var platform6, platform7;
var textTime;
var time=60;
var enemy, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10;

game.state.add("bootGame",bootGame);
game.state.add("preloadGame",preloadGame);
game.state.add("menuGame",menuGame);
game.state.add("playGame",playGame);
game.state.add("winGame",winGame);
game.state.add("loseGame",loseGame);

game.state.start("bootGame");