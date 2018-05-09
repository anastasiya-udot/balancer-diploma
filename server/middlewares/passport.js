const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const userService = global.serviceLocator.get('userService');

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, userService.authenticate.bind(userService)));

passport.serializeUser(userService.serializeUser.bind(userService));
passport.deserializeUser(userService.deserializeUser.bind(userService));