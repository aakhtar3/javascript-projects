import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { History } from '../../startup/both/collections.js'

import './app_body.html';
import './app_body.css';

import '../components/nav/nav.js';
import '../components/card/card.js';
import '../components/loader/loader.js';


Template.app_body.onCreated(function() {
  this.autorun(() => {
    this.subscribe('recent-history');
  });
});

Template.app_body.helpers({
  coin_ids() {
    return History.findOne();
  }
});