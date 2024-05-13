const withAuth = (req, res, next) => {
    // if loggedIn is false, it will redirect to the login page
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;