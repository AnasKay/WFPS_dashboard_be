const SSH = require('simple-ssh');
const vsphere = require("../middleware/vsphereAuth");
const {getHosts} = require("./getmachines.controller");

global.test = 'test';

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.opsBoard = (req, res) => {
  let output = ssh('10.100.101.78', 'root', '','df -h');
  console.log(output);
  res.status(200).send(output);
};

exports.infBoard = (req, res) => {
  res.status(200).send("Inf Content.");
};

exports.devOpsBoard = (req, res) => {
  let output = ssh('10.100.101.109', 'root', '','kubectl get pods -n kube-system')
  res.status(200).send(output);
};

exports.loggedinBoard = (req, res) => {
  res.status(200).send("Login token valid.");
};

exports.testBoard = (req, res) => {
  let output = ssh('10.100.101.109', 'root', '','kubectl get pods -n kube-system');
  console.log('btngan\n'+output);
  res.status(200).send(output);
};

exports.allUserOnServer = (req, res) => {
  let output = ssh('10.100.101.81', 'root', '', 'ls /home');
  res.status(200).send(output);
};

exports.createUser = (req, res) => {
  ssh('10.100.101.81', 'root', '', "useradd -d /home/test.user -m test.user -u 1818")
  res.status(200).send("user created");
};


exports.deleteUser = (req, res) => {
  ssh('10.100.101.81', 'root', '', "userdel -r test.user")
  res.status(200).send("user deleted");
};




async function asyncssh(host, user, password, command) {
  let output;
  console.log('inside the system')
  let ssh_options = new SSH({
    host: host,
    user: user,
    pass: password
  });
  await ssh_options.exec(command, {
    out: function (stdout) {
      console.log('inside of exec: ' + stdout);
      test = stdout;
    }
  }).start();
  //console.log('this is test: ' + test);
  return test;
}

function ssh(host, user, password, command) {
  let output;
  console.log('inside the system')
  let ssh_options = new SSH({
    host: host,
    user: user,
    pass: password
  });
  ssh_options.exec(command, {
    out: function (stdout) {
      console.log('inside of exec: ' + stdout);
      test = stdout;
    }
  }).start();
  //console.log('this is test: ' + test);
  return test;
}








