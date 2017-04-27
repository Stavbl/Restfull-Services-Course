var game    = require('./action_modules');
var action  = require('./action_config').events; 
var express = require('express');
    app     = express();

    port    = process.env.PORT || 3000;

var player1 = game('Cristiano Ronaldo','Real Madrid');
var player2 = game('Lionel Messi','FC Barcelona');

function goal() {
    console.log(`${this.name} Scored a Goal for ${this.club}`);
}
function cancelGoal() {
    var reason = ['OFFSIDE','FAUL','HANDBALL'];
    var randomNumber = Math.floor(Math.random()*reason.length);
    console.log(`${this.name}'s goal was canceled. Reason: ${reason[randomNumber]}`);
}
function verify() {
    console.log(`This is not how U play Football! Illegal move.`);       
}
player1.on(action.ADD, goal);
player1.on(action.REMOVE, cancelGoal);
player1.on(action.ERROR, verify);
player2.on(action.ADD, goal);
player2.on(action.REMOVE, cancelGoal);
player2.on(action.ERROR, verify);

app.get('/', function(req,res) {
    player1.addGoal();
    player2.addGoal();
    player2.addGoal();
    player1.removeGoal();
    player1.removeGoal();
    res.send({p1:player1.getPlayerDetails(),p2:player2.getPlayerDetails()});
});

app.listen(port);
console.log('listening on port ${port}');