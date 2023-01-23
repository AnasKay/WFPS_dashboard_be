let httpPort = 443;
let httpPath = '/rest/com/vmware/cis/session';
let httpMethod = 'POST';

my_http_options = {
    host: 'my.vsphere.host.com',
    port: httpPort,
    path: httpPath,
    method: httpMethod,
    rejectUnauthorized: false,
    requestCert: true,
    agent: false,
    auth: 'username' + ":" + 'password'
};

function callback(res) {
    console.log("STATUS: " + res.statusCode);
    res.on('error', function(err) { console.log("ERROR in SSO authentication: ", err) });
    res.on('data', function(chunk) {});
    res.on('end', function() {
        if (res.statusCode == 200) {
            // Save session ID authentication.
            let cookieValue = res.headers['set-cookie'];
            my_http_options.headers = {'Cookie': cookieValue};
            // Remove username-password authentication.
            my_http_options.auth = {};
        }
        console.log("Session ID:\n" + res.headers['set-cookie']);
    });

}

module.exports = { callback };