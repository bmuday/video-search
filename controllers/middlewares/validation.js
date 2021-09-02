module.exports = (req, res, next) => {
  //TODO: vérifier si les infos d'un utilisateur sont valides
  const validEmail = (email) => {
    return;
  };

  if (req.path === "/signup") {
  }

  if (req.path === "/login") {
  }

  // Next middleware
  next();
};
