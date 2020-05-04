import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Coin } from '../../../startup/both/collections.js'

import './card.html';
import './card.css';

import '../coin/coin.js';
import '../coin_history/coin_history.js';

Template.card.rendered = function() {
  $('.collapsible').collapsible({
    accordion : true
  });
};

Template.card.onCreated(function() {
  this.autorun(() => {
    this.subscribe('latest-coins', this.data.id);
  });
});

Template.card.helpers({
  coin_obj() {
    return Coin.findOne({_id: this.id});
  }
});
