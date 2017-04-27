var Emitter = require('events');
var action  = require('../action_config').events;
class Player extends Emitter {

    constructor(name ,club) {
        super();
        this.name  = name;
        this.club  = club;
        this.goals = 0;
    }

    getPlayerDetails(){
        return {'Name': this.name,
                'Club': this.club,
                'Goals': this.goals
        };
    }

    addGoal() {
        this.goals++;
        this.emit(action.ADD);
    }
    removeGoal() {
        this.goals--;
        if(this.verify() == true) 
            this.emit(action.REMOVE);
        else
            this.emit(action.ERROR)
    }
    verify() {
        if(this.goals < 0) {
            this.goals ++; 
            return false;       
        }
        return true;
    }
}

module.exports = function(name, club) {
    var p = new Player(name,club);
    return p;
}