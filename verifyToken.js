const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  // Az authorization header-ből kiszedjük a token-t
  
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

  if (!token) {
    // Ha nincs token, akkor hibát dobunk
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }

  // Megpróbáljuk ellenőrizni a tokent
  jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
    if (err) {
      // Ha a token érvénytelen, akkor hibát dobunk
      console.log( err);
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    // Ha a token érvényes, akkor eltároljuk a token payload-ját a request objektumon belül
    console.log( decoded);
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;