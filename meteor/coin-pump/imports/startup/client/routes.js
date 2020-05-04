import { FlowRouter } from 'meteor/kadira:flow-router';
// import { BlazeLayout } from 'meteor/kadira:blaze-layouts';

// Import to load these templates
import '../../ui/layouts/app_body.js';
import '../../ui/pages/app_not_found.js';

FlowRouter.route('/', {
  name: 'app.home',
  action() {
    BlazeLayout.render('app_body');
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('app_not_found');
  },
};
