const bcrypt = require("bcrypt-nodejs");

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

module.exports = app => {
  const obterHash = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, null, (err, hash) => {
        callback(hash);
      });
    });
  };

  const save = (req, res) => {
    if (!validateEmail(req.body.email)) {
      res.status(400).send("Insira um email válido");
    }

    obterHash(req.body.password, hash => {
      const password = hash;

      app
        .db("users")
        .insert({
          name: req.body.name,
          email: req.body.email,
          password
        })
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).json(err));
    });
  };

  return { save };
};
