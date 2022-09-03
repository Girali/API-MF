const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");

//const { PORT, TOKEN } = process.env;
PORT = 8080;
TOKEN = "vyRFyRWCLug5CcL4";

const app = express();
const auth = (req, res, next) => {
  if (req.query.token !== TOKEN) return res.status(401).send("INVALID_TOKEN");
  return next();
};
const fs = require("fs");
const { Console } = require("console");
const sequelize = new Sequelize(
  "bj2uqmkmdsvkl7htuxjy",
  "uxqutkbyo0s9wyqn",
  "cA7iXbjxS7xPNgnUL88k",
  {
    host: "bj2uqmkmdsvkl7htuxjy-mysql.services.clever-cloud.com",
    dialect: "mysql",
  }
);

const User = sequelize.define("User", {
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  vehicul: Sequelize.INTEGER,
  timeStart: Sequelize.BIGINT,
});

const VehiculUse = sequelize.define("VehiculUse", {
  user_id: Sequelize.INTEGER,
  startTime: Sequelize.BIGINT,
  stopTime: Sequelize.BIGINT,
  state: Sequelize.BOOLEAN,
  comment: Sequelize.STRING,
  vehicul: Sequelize.INTEGER,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(auth);

app.post("/connectUser", (req, res) => {
  User.findOne({
    where: {
      name: req.body.name,
      password: req.body.password,
    },
  })
    .then((user) => {
      if (user === null) res.send(`${false}`);
      else res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/createUser", (req, res) => {
  User.create({
    name: req.body.name,
    password: req.body.password,
    vehicul: -1,
    timeStart: 0,
  })
    .then((player) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.put("/userStart", (req, res) => {
  User.update(req.body, {
    where: {
      id: req.body.id,
    },
  })
    .then((user) => {
      res.send(req.body);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/createVehiculUse", (req, res) => {
  VehiculUse.create({
    user_id: req.body.user_id,
    startTime: req.body.startTime,
    stopTime: -1,
    state: true,
    comment: "",
    vehicul: req.body.vehicul,
  })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.put("/stopVehiculUse", (req, res) => {
  VehiculUse.update(req.body, {
    where: {
      id: req.body.id,
    },
  })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.put("/userStop", (req, res) => {
  User.update(req.body, {
    where: {
      id: req.body.id,
    },
  })
    .then((user) => {
      res.send(req.body);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/getVehiculsByUser:userId", (req, res) => {
  VehiculUse.findAll({
    where: {
      user_id: req.params.userId,
    },
  })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/getVehiculsByVehicul:vehicul", (req, res) => {
  VehiculUse.findAll({
    where: {
      vehicul: req.params.vehicul,
    },
  })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.delete("/delete:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      res.send("true");
    })
    .catch((err) => {
      res.json(err);
    });
});

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[Express] is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`${err}`);
  });
