import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './nav.html';
import './nav.css';


Template.nav.rendered = function() {
  $('.modal').modal();
};
