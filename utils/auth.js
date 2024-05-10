const withAuth = (req, res, next) => {
    // if loggedIn is false, it will redirect to the login page
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;