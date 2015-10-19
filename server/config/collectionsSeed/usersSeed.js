var _ = require('lodash');
var User = require('../../api/user/user.model');
var Room = require('../../api/room/room.model');
var RoomCtrl = require('../../api/room/room.controller');
var Game = require('../../api/game/game.model');
module.exports = {
  refillCollection: function(){
    User.find({}).remove(function () {
      User.create({
          provider: 'local',
          email: 'test@test.com',
          password: 'test',
          kind: 'player',
          profilePhoto: 'user.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Test',
            lastName: 'Player',
            number: 32,
            team: 'team1',
            position: 'Quarterback',
            hometown: 'hometown',
            height: '6\'2',
            weight: '210',
            age: 23,
            experience: '2 year pro (europe)'
          }
        }, {
          provider: 'local',
          email: 'test1@test1',
          password: 'test1',
          kind: 'player',
          profilePhoto: 'user.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Test',
            lastName: 'Player1',
            number: 1,
            team: 'team1',
            position: 'Wide receiver',
            hometown: 'hometown',
            height: '6\'2',
            weight: '210',
            age: 23,
            experience: '2 year pro (europe)'
          }
        }, {
          provider: 'local',
          email: 'test2@test2',
          password: 'test2',
          kind: 'player',
          profilePhoto: 'user.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Test',
            lastName: 'Player2',
            number: 2,
            team: 'team1',
            position: 'Linebacker',
            hometown: 'hometown',
            height: '6\'2',
            weight: '210',
            age: 23,
            experience: '2 year pro (europe)'
          }
        }, {
          provider: 'local',
          email: 'test3@test3',
          password: 'test3',
          kind: 'player',
          profilePhoto: 'user.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Test',
            lastName: 'Player3',
            number: 3,
            team: 'team1',
            position: 'Quarterback',
            hometown: 'hometown',
            height: '6\'2',
            weight: '210',
            age: 23,
            experience: '2 year pro (europe)'
          }
        }, {
          provider: 'local',
          email: 'test4@test4',
          password: 'test4',
          kind: 'player',
          profilePhoto: 'user.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Test',
            lastName: 'Player4',
            number: 4,
            team: 'team1',
            position: 'Left guard',
            hometown: 'hometown',
            height: '6\'2',
            weight: '210',
            age: 23,
            experience: '2 year pro (europe)'
          }
        }, {
          provider: 'local',
          email: 'test5@test5',
          password: 'test5',
          kind: 'player',
          profilePhoto: 'user.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Test',
            lastName: 'Player5',
            number: 5,
            team: 'team1',
            position: 'Right guard',
            hometown: 'hometown',
            height: '6\'2',
            weight: '210',
            age: 23,
            experience: '2 year pro (europe)'
          }
        }, {
          provider: 'local',
          email: 'test6@test6',
          password: 'test6',
          kind: 'player',
          profilePhoto: 'user.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Test',
            lastName: 'Player6',
            number: 6,
            team: 'team1',
            position: 'Defensive tackle',
            hometown: 'hometown',
            height: '6\'2',
            weight: '210',
            age: 23,
            experience: '2 year pro (europe)'
          }
        }, {
          provider: 'local',
          email: 'test7@test7',
          password: 'test7',
          kind: 'player',
          profilePhoto: 'user.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Test',
            lastName: 'Player7',
            number: 7,
            team: 'team1',
            position: 'Quarterback',
            hometown: 'hometown',
            height: '6\'2',
            weight: '210',
            age: 23,
            experience: '2 year pro (europe)'
          }
        }, {
          provider: 'local',
          email: 'test8@test8',
          password: 'test8',
          kind: 'player',
          profilePhoto: 'user.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Test',
            lastName: 'Player8',
            number: 8,
            team: 'team2',
            position: 'Runningback',
            hometown: 'hometown',
            height: '6\'2',
            weight: '210',
            age: 23,
            experience: '2 year pro (europe)'
          }
        }, {
          provider: 'local',
          email: 'test9@test9',
          password: 'test9',
          kind: 'player',
          profilePhoto: 'user.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Test',
            lastName: 'Player9',
            number: 9,
            team: 'team2',
            position: 'Tight end',
            hometown: 'hometown',
            height: '6\'2',
            weight: '210',
            age: 23,
            experience: '2 year pro (europe)'
          }
        }, {
          provider: 'local',
          email: 'test10@test10',
          password: 'test10',
          kind: 'player',
          profilePhoto: 'user.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Test',
            lastName: 'Player10',
            number: 10,
            team: 'team2',
            position: 'Runningback',
            hometown: 'hometown',
            height: '6\'2',
            weight: '210',
            age: 23,
            experience: '2 year pro (europe)'
          }
        }, {
          provider: 'local',
          email: 'test11@test11',
          password: 'test11',
          kind: 'player',
          profilePhoto: 'user.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Test',
            lastName: 'Player11',
            number: 11,
            team: 'team2',
            position: 'Quarterback',
            hometown: 'hometown',
            height: '6\'2',
            weight: '210',
            age: 23,
            experience: '2 year pro (europe)'
          }
        }, {
          provider: 'local',
          email: 'test12@test12',
          password: 'test12',
          kind: 'player',
          profilePhoto: 'user.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Test',
            lastName: 'Player12',
            number: 12,
            team: 'team2',
            position: 'Wide receiver',
            hometown: 'hometown',
            height: '6\'2',
            weight: '210',
            age: 23,
            experience: '2 year pro (europe)'
          }
        }, {
          provider: 'local',
          email: 'test13@test13',
          password: 'test13',
          kind: 'player',
          profilePhoto: 'user.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Test',
            lastName: 'Player13',
            number: 13,
            team: 'team2',
            position: 'Right tackle',
            hometown: 'hometown',
            height: '6\'2',
            weight: '210',
            age: 23,
            experience: '2 year pro (europe)'
          }
        }, {
          provider: 'local',
          email: 'test14@test14',
          password: 'test14',
          kind: 'player',
          profilePhoto: 'user.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Test',
            lastName: 'Player14',
            number: 14,
            team: 'team2',
            position: 'Left tackle',
            hometown: 'hometown',
            height: '6\'2',
            weight: '210',
            age: 23,
            experience: '2 year pro (europe)'
          }
        }, {
          provider: 'local',
          email: 'test15@test15',
          password: 'test15',
          kind: 'player',
          profilePhoto: 'user.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Test',
            lastName: 'Player15',
            number: 15,
            team: 'team2',
            position: 'Defensive end',
            hometown: 'hometown',
            height: '6\'2',
            weight: '210',
            age: 23,
            experience: '2 year pro (europe)'
          }
        }, {
          provider: 'local',
          email: 'barnes@barnes',
          password: 'barnes',
          kind: 'player',
          profilePhoto: 'barnes.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Harrison',
            lastName: 'Barnes',
            number: 40,
            team: 'Golden State Warriors',
            position: 'Small forward',
            hometown: 'Ames',
            height: '6\'8',
            weight: '220 lbs',
            age: 23,
            experience: '3 years'
          }
        }, {
          provider: 'local',
          email: 'green@green',
          password: 'green',
          kind: 'player',
          profilePhoto: 'green.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Draymond',
            lastName: 'Green',
            number: 23,
            team: 'Golden State Warriors',
            position: 'Small forward',
            hometown: 'Saginaw',
            height: '6\'7',
            weight: '230 lbs',
            age: 23,
            experience: '3 years'
          }
        }, {
          provider: 'local',
          email: 'curry@curry',
          password: 'curry',
          kind: 'player',
          profilePhoto: 'curry.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Stephen',
            lastName: 'Curry',
            number: 40,
            team: 'Golden State Warriors',
            position: 'Point guard',
            hometown: 'Akron',
            height: '6\'3',
            weight: '190 lbs',
            age: 27,
            experience: '6 years'
          }
        }, {
          provider: 'local',
          email: 'iguodala@iguodala',
          password: 'iguodala',
          kind: 'player',
          profilePhoto: 'iguodala.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Andre',
            lastName: 'Iguodala',
            number: 9,
            team: 'Golden State Warriors',
            position: 'Shooting guard',
            hometown: 'Springfield',
            height: '6\'6',
            weight: '215 lbs',
            age: 31,
            experience: '11 years'
          }
        }, {
          provider: 'local',
          email: 'kthompson@kthompson',
          password: 'kthompson',
          kind: 'player',
          profilePhoto: 'kthompson.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Klay',
            lastName: 'Thompson',
            number: 11,
            team: 'Golden State Warriors',
            position: 'Shooting guard',
            hometown: 'Los Angeles',
            height: '6\'7',
            weight: '215 lbs',
            age: 25,
            experience: '4 years'
          }
        }, {
          provider: 'local',
          email: 'ezeli@ezeli',
          password: 'ezeli',
          kind: 'player',
          profilePhoto: 'ezeli.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Festus',
            lastName: 'Ezeli',
            number: 31,
            team: 'Golden State Warriors',
            position: 'Center',
            hometown: 'California',
            height: '6\'11',
            weight: '265 lbs',
            age: 25,
            experience: '11 years'
          }
        }, {
          provider: 'local',
          email: 'livingston@livingston',
          password: 'livingston',
          kind: 'player',
          profilePhoto: 'livingston.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Shaun',
            lastName: 'Livingston',
            number: 34,
            team: 'Golden State Warriors',
            position: 'Point guard',
            hometown: 'Peoria',
            height: '6\'7',
            weight: '192 lbs',
            age: 29,
            experience: '10 years'
          }
        }, {
          provider: 'local',
          email: 'barbosa@barbosa',
          password: 'barbosa',
          kind: 'player',
          profilePhoto: 'barbosa.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Leandro',
            lastName: 'Barbosa',
            number: 19,
            team: 'Golden State Warriors',
            position: 'Shooting guard',
            hometown: 'Rio de Janeiro',
            height: '6\'3',
            weight: '194 lbs',
            age: 32,
            experience: '12 years'
          }
        }, {
          provider: 'local',
          email: 'lebron@lebron',
          password: 'lebron',
          kind: 'player',
          profilePhoto: 'lebron.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'James',
            lastName: 'Lebron',
            number: 23,
            team: 'Cleveland Cavaliers',
            position: 'Small forward',
            hometown: 'Akron',
            height: '6\'8',
            weight: '250 lbs',
            age: 30,
            experience: '12 years'
          }
        }, {
          provider: 'local',
          email: 'mozgov@mozgov',
          password: 'mozgov',
          kind: 'player',
          profilePhoto: 'mozgov.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Timofey',
            lastName: 'Mozgov',
            number: 20,
            team: 'Cleveland Cavaliers',
            position: 'Center',
            hometown: 'Moscow',
            height: '7\'1',
            weight: '250 lbs',
            age: 29,
            experience: '5 years'
          }
        }, {
          provider: 'local',
          email: 'tthompson@tthompson',
          password: 'tthompson',
          kind: 'player',
          profilePhoto: 'tthompson.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Tristan',
            lastName: 'Thompson',
            number: 13,
            team: 'Cleveland Cavaliers',
            position: 'Center',
            hometown: 'Montreal',
            height: '6\'9',
            weight: '238 lbs',
            age: 24,
            experience: '4 years'
          }
        }, {
          provider: 'local',
          email: 'shumpert@shumpert',
          password: 'shumpert',
          kind: 'player',
          profilePhoto: 'shumpert.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Iman',
            lastName: 'Shumpert',
            number: 4,
            team: 'Cleveland Cavaliers',
            position: 'Shooting guard',
            hometown: 'Oak Park',
            height: '6\'5',
            weight: '220 lbs',
            age: 25,
            experience: '4 years'
          }
        }, {
          provider: 'local',
          email: 'dellavedova@dellavedova',
          password: 'dellavedova',
          kind: 'player',
          profilePhoto: 'dellavedova.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Matthew',
            lastName: 'Dellavedova',
            number: 8,
            team: 'Cleveland Cavaliers',
            position: 'Shooting guard',
            hometown: 'Sydney',
            height: '6\'4',
            weight: '200 lbs',
            age: 24,
            experience: '2 years'
          }
        }, {
          provider: 'local',
          email: 'jones@jones',
          password: 'jones',
          kind: 'player',
          profilePhoto: 'jones.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'James',
            lastName: 'Jones',
            number: 1,
            team: 'Cleveland Cavaliers',
            position: 'Small forward',
            hometown: 'Miami',
            height: '6\'8',
            weight: '215 lbs',
            age: 34,
            experience: '12 years'
          }
        }, {
          provider: 'local',
          email: 'miller@miller',
          password: 'miller',
          kind: 'player',
          profilePhoto: 'miller.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'Mike',
            lastName: 'Miller',
            number: 18,
            team: 'Cleveland Cavaliers',
            position: 'Shooting guard',
            hometown: 'Mitchell',
            height: '6\'8',
            weight: '218 lbs',
            age: 35,
            experience: '15 years'
          }
        }, {
          provider: 'local',
          email: 'smith@smith',
          password: 'smith',
          kind: 'player',
          profilePhoto: 'smith.png',
          completed: true,
          photos: [],
          player: {
            firstName: 'J.R.',
            lastName: 'Smith',
            number: 5,
            team: 'Cleveland Cavaliers',
            position: 'Shooting guard',
            hometown: 'Freehold',
            height: '6\'6',
            weight: '225 lbs',
            age: 29,
            experience: '11 years'
          }
        }, {
          provider: 'local',
          email: 'coach@coach',
          password: 'coach',
          kind: 'coach',
          profilePhoto: 'user.png',
          photos: [],
          completed: true,
          coach: {
            firstName: 'Test',
            lastName: 'Coach',
            team: 'team name',
            position: 'position',
            hometown: 'hometown',
            height: '6\'2',
            weight: '210',
            age: 23,
            experience: '2 year pro (europe)'
          }

        }, {
          provider: 'local',
          email: 'fan@fan',
          password: 'fan',
          kind: 'fan',
          profilePhoto: 'user.png',
          photos: [],
          fan: {
            firstName: 'Test',
            lastName: 'Fan',
            team: 'team name',
            position: 'position',
            city: 'hometown',
            height: '6\'2',
            weight: '210',
            birth: 23,
            exp: '2 year pro (europe)'
          }
        }, {
          provider: 'local',
          email: 'team@team',
          password: 'team',
          kind: 'team',
          profilePhoto: 'user.png',
          photos: [],
          completed: true,
          team: {
            name: 'team test',
            fans: [],
            league: 'Missouri Valley Football Conference',
            city: 'vermillion south dakota usa'
          }
        }, {
          provider: 'local',
          email: 'league@league',
          password: 'league',
          kind: 'league',
          profilePhoto: 'user.png',
          completed: true,

          photos: [],

          league: {
            name: 'league',
            fans: [],
            teams: [],
            city: 'vermillion south dakota usa'
          }
        }, {
          provider: 'local',
          email: 'nba@nba',
          password: 'nba',
          kind: 'league',
          profilePhoto: 'nba.png',
          completed: true,
          sport: 'basketball',

          photos: [],

          league: {
            name: 'National Basketball Association',
            fans: [],
            teams: [],
            city: 'New York, USA'
          }
        }, {
          provider: 'local',
          email: 'team1@team1',
          password: 'team1',
          completed: true,
          sport: 'football',
          kind: 'team',
          profilePhoto: 'user.png',
          photos: [],
          team: {
            name: 'team1',
            short: 'T1',
            fans: [],
            league: 'Missouri Valley Football Conference',
            city: 'vermillion south dakota usa'
          }
        }, {
          provider: 'local',
          email: 'team2@team2',
          password: 'team2',
          sport: 'football',
          kind: 'team',
          profilePhoto: 'user.png',
          photos: [],
          completed: true,
          team: {
            name: 'team2',
            short: 'T2',
            fans: [],
            league: 'Missouri Valley Football Conference',
            city: 'vermillion south dakota usa'
          }
        }, {
          provider: 'local',
          email: 'warriors@warriors',
          password: 'warriors',
          completed: true,
          sport: 'basketball',
          kind: 'team',
          profilePhoto: 'warriors.png',
          photos: [],
          team: {
            name: 'Golden State Warriors',
            short: 'GSW',
            fans: [],
            league: 'NBA',
            city: 'Golden State'
          }
        }, {
          provider: 'local',
          email: 'cavaliers@cavaliers',
          password: 'cavaliers',
          completed: true,
          sport: 'basketball',
          kind: 'team',
          profilePhoto: 'cavaliers.png',
          photos: [],
          team: {
            name: 'Cleveland Cavaliers',
            short: 'CC',
            fans: [],
            league: 'NBA',
            city: 'Cleveland'
          }
        }, {
          provider: 'local',
          role: 'admin',
          email: 'admin@admin.com',
          password: 'admin',
          kind: 'fan',
          profilePhoto: 'user.png',
          photos: [],
          fan: {
            firstName: 'Test',
            lastName: 'Admin',
            team: 'team name2',
            position: 'position2',
            hometown: 'hometown2',
            height: '6\'22',
            weight: '2102',
            age: 223,
            experience: '2 year pro (europe2)'
          }
        }, function () {
          User.find({kind: "player"}, function (err1, players) {
            User.find({kind: "team"}, function (err2, teams) {
              User.find({kind: "league"}, function (err3, leagues) {
                var team1, team2, cavs, wars, i;
                for (i = 0; i < teams.length; i++) {
                  if (teams[i].team.name === "team1") {
                    team1 = teams[i];
                  }
                  if (teams[i].team.name === "team2") {
                    team2 = teams[i];
                  }
                  if (teams[i].team.name === "Cleveland Cavaliers") {
                    cavs = teams[i];
                  }
                  if (teams[i].team.name === "Golden State Warriors") {
                    wars = teams[i];
                  }
                }
                var destTeam;
                for (i = 0; i < players.length; i++) {
                  if (_.contains(["test@test.com", "test1@test1", "test2@test2", "test3@test3", "test4@test4", "test5@test5", "test6@test6", "test7@test7"], players[i].email)) {
                    destTeam = team1;
                  }
                  if (_.contains(["test8@test8", "test9@test9", "test10@test10", "test11@test11", "test12@test12", "test13@test13", "test14@test14", "test15@test15"], players[i].email)) {
                    destTeam = team2;
                  }
                  if (_.contains(["barnes@barnes", "green@green", "curry@curry", "iguodala@iguodala", "kthompson@kthompson", "ezeli@ezeli", "barbosa@barbosa", "livingston@livingston"], players[i].email)) {
                    destTeam = wars;
                  }
                  if (_.contains(["lebron@lebron", "mozgov@mozgov", "tthompson@tthompson", "shumpert@shumpert", "dellavedova@dellavedova", "jones@jones", "miller@miller", "smith@smith"], players[i].email)) {
                    destTeam = cavs;
                  }
                  console.log(players[i].email);
                  console.log(destTeam.team.name);
                  destTeam.assigned.push({
                    user: players[i],
                    dateTo: new Date(),
                    dateFrom: new Date(),
                    position: players[i].position,
                    isPresent: true
                  });
                  players[i].assignedTo.push({
                    user: destTeam,
                    dateTo: new Date(),
                    dateFrom: new Date(),
                    position: players[i].position,
                    isPresent: true
                  });
                  players[i].save();
                }
                var nba;
                for (i = 0; i < leagues.length; i++) {
                  if (leagues[i].email === "nba@nba") {
                    nba = leagues[i];
                  }
                }
                cavs.assignedTo.push({
                  user: nba,
                  dateTo: new Date(),
                  dateFrom: new Date(),
                  isPresent: true
                });
                wars.assignedTo.push({
                  user: nba,
                  dateTo: new Date(),
                  dateFrom: new Date(),
                  isPresent: true
                });
                nba.assigned.push({
                  user: wars,
                  dateTo: new Date(),
                  dateFrom: new Date(),
                  isPresent: true
                });
                nba.assigned.push({
                  user: cavs,
                  dateTo: new Date(),
                  dateFrom: new Date(),
                  isPresent: true
                });
                nba.save();
                team1.save(function () {
                  team2.save(function () {
                    cavs.save(function () {
                      wars.save(function () {
                        User.find({kind: "team"})
                          .populate('assigned.user')
                          .exec(function (err2, teams) {

                            _.each(teams, function (team) {
                              team = team.toObject();
                              var users = _.map(team.assigned, function (user) {
                                return user.user;
                              });

                              var players = _.filter(users, function (user) {
                                return user.kind === 'player';
                              });

                              var coaches = _.filter(users, function (user) {
                                return user.kind === 'coach';
                              });

                              var playersIds = _.map(players, function (user) {
                                return user._id;
                              });
                              playersIds.push(team._id);
                              var coachesIds = _.map(coaches, function (user) {
                                return user._id;
                              });
                              coachesIds.push(team._id);


                              RoomCtrl.createRoom(team._id, 'Players', playersIds);
                              RoomCtrl.createRoom(team._id, 'Coaches', coachesIds);

                            });


                          });

                      });
                    });
                  });
                });


              });
            });
          });
          User.find({kind: {$in: ["player", 'coach']}}, function (err1, players) {
            for (var i = 0; i < players.length; i++) {
              for (var j = i + 1; j < players.length; j++) {
                var pi = players[i].toObject(),
                  pj = players[j].toObject();

                players[i].friends.push(pj._id);
                players[j].friends.push(pi._id);
                players[i].save();
                players[j].save();
              }
            }
          });

          User.findOne({'league.name': 'league'}, function (err1, league) {
            User.findOne({'team.name': 'team1'}, function (err2, team1) {
              User.findOne({'team.name': 'team2'}, function (err3, team2) {
                league.assigned = [{user: team1._id, dateFrom: new Date(), dateTo: new Date(), isPresent: true},
                  {user: team2._id, dateFrom: new Date(), dateTo: new Date(), isPresent: true}];
                league.save();
                team1.assignedTo = [{user: league._id, dateFrom: new Date(), dateTo: new Date(), isPresent: true}];
                team1.save();
                team2.assignedTo = [{user: league._id, dateFrom: new Date(), dateTo: new Date(), isPresent: true}];
                team2.save();

                Game.find({}).remove(function () {
                  var rand = function () {
                    return Math.floor((Math.random() * 100) + 1);
                  };
                  _.times(100, function () {
                    Game.create({
                      league: league._id,
                      team1: team1._id,
                      team2: team2._id,
                      date: new Date(),
                      data: {
                        T1: [],
                        T2: [],
                        score1: rand(),
                        score2: rand(),
                        winner: rand() % 2,
                        isFinished: rand() % 2 === 0,
                        quart: 1+(rand() % 4),
                        time: rand()
                      },
                      userData: {},
                      lastIn: {},
                      sport: 'football'
                    });

                  });
                });

              });
            });
          });
          console.log('finished populating users');

        }
      );
    });
  }
};
