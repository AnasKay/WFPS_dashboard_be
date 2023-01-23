const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const getMachinecontroller = require("../controllers/getmachines.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", 
	controller.allAccess
  );

  app.get("/api/test/loggedin",
    [authJwt.verifyToken],
    controller.loggedinBoard
  );

  app.get("/api/test/ops",
    [authJwt.verifyToken, authJwt.isOps],
    controller.opsBoard
  );

  app.get("/api/test/devops",
      [authJwt.verifyToken, authJwt.isDevOps],
      controller.devOpsBoard
  );

  app.get("/api/test/inf",
    [authJwt.verifyToken, authJwt.isInf],
    controller.infBoard
  );


  app.get("/api/test/kuber",
      [authJwt.verifyToken, authJwt.isOps],
      controller.testBoard
  );

  app.post("/api/test/createuser",
      [authJwt.verifyToken, authJwt.isInf],
      controller.createUser
  );

  app.get("/api/test/vms",
      [authJwt.verifyToken, authJwt.isOpsOrInf],
      getMachinecontroller.getVms
  );

  app.get("/api/vm/user",
      [authJwt.verifyToken, authJwt.isInf],
      controller.allUserOnServer
  );

  app.delete("/api/vm/deleteuser",
      [authJwt.verifyToken, authJwt.isInf],
      controller.deleteUser
  );
};
