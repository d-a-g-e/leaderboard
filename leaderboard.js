PlayersList = new Mongo.Collection('players');

if (Meteor.isClient) {
  console.log("codigo que se ejecuta en el cliente")

  // helper leaderboard
  Template.leaderboard.helpers({
    //helpers del template
  });

  // helper player selected
  Template.playerSelected.helpers({
    showPlayer: function(){
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selectedPlayer)
    }
  });

  // helper player list
  Template.playersList.helpers({
    players: function(){
      return PlayersList.find({},{sort: {score: -1, name: 1}});
    },
    count: function(){
      return PlayersList.find().count()
    },
    selectedClass: function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if(playerId == selectedPlayer){
        return "selected"
      }
    }
  });

  // events leaderboard
  Template.leaderboard.events({
    'click .player': function(){
      var playerId = this._id;
      console.log("me hicieron click: " + this.name + " " +this._id);
      Session.set('selectedPlayer', playerId);
    },
    'click .increment': function(){
      selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: 5} });
    },
    'click .decrement': function(){
      selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(selectedPlayer, {$inc: {score: -5} });
    },
     'click .remove': function(){
       var selectedPlayer = Session.get('selectedPlayer');
       PlayersList.remove(selectedPlayer);
    }
  });

  // events formulario
  Template.addPlayerForm.events({
    'submit form': function(event) {
      event.preventDefault();
      var playerName = event.target.playerName.value;
      PlayersList.insert({
          name: playerName,
          score: 0
      });
    }
  });

};

if (Meteor.isServer) {
  console.log("codigo que se ejecuta en el servidor")
};
