var SSH = require('simple-ssh');

function ssh(host, user ,password){

    console.log('inside the system')
    var ssh_options = new SSH({
        host: host,
        user: user,
        pass: password
    });
    // execute the df -h command to find out disk utilization
    ssh.exec('df -h', {
        out: function(stdout) {
            parse(stdout);
        }
    }).start();
}