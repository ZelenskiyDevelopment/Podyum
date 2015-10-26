'use strict';

angular.module('abroadathletesApp')
  .filter('footballDescription', function () {
    return function (input) {
      var result = "";
      if(input.type ==="run") {
        if(input.data.gain > 0 || input.data.gain < 0)
          return "Player " + input.data.player + " ran for " + input.data.gain + " yards gain."
        else
          return "Player " + input.data.player + " ran for no gain."
      }
      else if(input.type === "tackle") {
        if(input.data.tackler > 0) {
          result += "Tackled by player " +input.data.tackler;
        }
        if(input.data.assist > 0) {
          result += " assisted by player " + input.data.assist;
        }
        return result;
      }
      else if(input.type ==="lateral") {
        if(input.data.received) {
          result += "Lateral received by player " + input.data.received
        }
        if(input.data.gain > 0 || input.data.gain < 0) {
          result += " for " + input.data.gain + " yards gain."
        }
        else {
          result += " for no gain."
        }
        return result;
      }
      else if(input.type ==="fumble") {
        result += "Player " + input.data.player + " fumbles"
        if(input.data.caused) {
          result += " caused by player " + input.data.caused;
        }
        if(input.data.teamRecovered == 0) {
          if(input.data.recovered > 0) {
            result += " and it was recovered by player " + input.data.recovered + " from home team"
          }
          else {
            result += " and it was recovered by home team"
          }
          if(input.data.gain > 0 || input.data.gain < 0) {
            result += " for " + input.data.gain + " yards gain."
          }
          else {
            result += "for no gain."
          }
        }
        else if(input.data.teamRecovered == 1) {
          if(input.data.recovered > 0) {
            result += " and it was recovered by player " + input.data.recovered + " from away team"
          }
          else {
            result += " and it was recovered by away team"
          }
          if(input.data.gain > 0 || input.data.gain < 0) {
            result += " for " + input.data.gain + " yards gain."
          }
          else {
            result += "for no gain."
          }
        }
        else {
          result += " and noone recovered the ball."
        }
        return result;
      }
      else if(input.type === "touchdown") {
        result = "Player " + input.data.player + " scores a touchdown!";
        return result;
      }
      else if(input.type === "safety") {
        result = "Safety by player " + input.data.player;
        return result;
      }
      else if(input.type === "kneel") {
        result = "Player " + input.data.player + " kneeled.";
        return result;
      }
      else if(input.type === "complete") {
        result = "Player " + input.data.passer + " successfully passed the ball to player " + input.data.receiver + " for ";
        if(input.data.gain > 0 || input.data.gain < 0) {
          result += input.data.gain + " yards gain."
        }
        else {
          result += " no gain."
        }
        return result;
      }
      else if(input.type === "incomplete") {
        result = "Pass from player " + input.data.passer + " broken"
        if(input.data.breakup > 0) {
          result += " by player " + input.data.breakup;
        }
        return result;
      }
      else if(input.type === "intercept") {
        result = "Pass from player " + input.data.passer + " intercepted"
        if(input.data.intercept > 0) {
          result += " by player " + input.data.intercept + " for ";
        }
        if(input.data.gain > 0 || input.data.gain < 0) {
          result += input.data.gain + " yards gain."
        }
        else {
          result += " no gain."
        }
        return result;
      }
      else if(input.type ==="sack") {
        result += "Player " + input.data.player + " sacked"
        if(input.data.gain > 0 || input.data.gain < 0) {
          result += " after " + input.data.gain + " yards gain."
        }
        return result;
      }
      else if(input.type === "kickoff") {
        result = "Player " + input.data.player + " made a kickoff for " + input.data.gain + " yards";
        if(input.data.result === "touchback") {
          result += " and a touchback!";
        }
        else if(input.data.result === "noreturn") {
          result += " which was not returned."
        }
        else if(input.data.result === "out") {
          result += " which went out of bounds."
        }
        else if(input.data.result === "onside") {
          result += " which was an onside."
        }
        return result;
      }
      else if(input.type === "recover") {
        if(input.data.teamRecovered == 0) {
          if(input.data.recovered > 0) {
            result += "The ball was recovered by player " + input.data.recovered + " from home team"
          }
          else {
            result += "The ball was recovered by home team"
          }
          if(input.data.gain > 0 || input.data.gain < 0) {
            result += " for " + input.data.gain + " yards gain."
          }
          else {
            result += "for no gain."
          }
        }
        else if(input.data.teamRecovered == 1) {
          if(input.data.recovered > 0) {
            result += "The ball was recovered by player " + input.data.recovered + " from away team"
          }
          else {
            result += "The ball was recovered by away team"
          }
          if(input.data.gain > 0 || input.data.gain < 0) {
            result += " for " + input.data.gain + " yards gain."
          }
          else {
            result += "for no gain."
          }
        }
        else {
          result += "Noone recovered the ball."
        }
        return result;
      }
      else if(input.type === "return") {
        result = "The ball was returned by player " + input.data.player;
        if(input.data.fairCatch) {
          result += " with a fair catch.";
        }
        else if(input.data.gain > 0 || input.data.gain < 0) {
          result += " for " + input.data.gain + " yards gain."
        }
        else {
          result += " for no gain."
        }
        return result;
      }
      else if(input.type === "punt") {
        result = "Player " + input.data.player + " made a punt for " + input.data.gain + " yards gain";
        if(input.data.result === "touchback") {
          result += " and a touchback!";
        }
        else if(input.data.result === "noreturn") {
          result += " which was not returned."
        }
        else if(input.data.result === "blocked") {
          result += " which was blocked."
        }
      }
      else if(input.type === "fieldgoal") {
        result = "Field goal attempt by player " + input.data.player;
        if(input.data.gain > 0 || input.data.gain < 0) {
          result += " for " + input.data.gain + " yards gain"
        }
        else {
          result += " for no gain"
        }
        if(input.data.result === "good") {
          result += " was good."
        }
        else if(input.data.result === "blocked") {
          result += " was blocked.";
        }
        else {
          result += " was no good."
        }
        return result;
      }
      else if(input.type === "pointafter") {
        result = "Point after " + input.data.type + " made by player " + input.data.player;
        if(input.data.result === " good") {
          result += " which was good."
        }
        else if(input.data.result === "blocked") {
          result += " which was blocked."
        }
        else if(input.data.result === "no good") {
          result += " which was no good."
        }
        return result;
      }
    };
  });
