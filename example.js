var express = require('express'),
    app = express();

var AutomaticApiClient = require('automatic-node-oauth2'),
    client = new AutomaticApiClient('YOUR_CLIENT_ID', 'YOUR_CLIENT_SECRET');

app.get('/authorize', function (req, res) {
    res.redirect(client.getAuthorizeUrl('scope:public scope:user:profile scope:location scope:vehicle:profile scope:vehicle:events scope:trip scope:behavior', 'YOUR_CALLBACK_URL'));
});

app.get('/callback', function (req, res) {
    client.getAccessToken(req.query.code, 'YOUR_CALLBACK_URL').then(function (result) {
        client.get('/trip/', result.access_token).then(function (results) {
            res.send(results[0]);
        });
    }).catch(function (error) {
        res.send(error);
    });
});

app.listen(3000);
