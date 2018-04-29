const passport = require('passport');
const userService = global.serviceLocator.get('userService');

passport.serializeUser(userService.serializeUser.bind(userService));
passport.deserializeUser(userService.deserializeUser.bind(userService));