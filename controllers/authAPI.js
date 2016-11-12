var express = require('express');
var root = process.cwd();
var config = require(root + '/lib/config');
var router = express.Router();
var url = require('url');
var ShopifyService = require(root + '/services/ShopifyService');
var OAuth = require('oauth').OAuth2;

router.get('/', (req, res) => {
  var parsedUrl = url.parse(req.originalUrl, true);
  if (!req.session.oauth_access_token) {
    if (parsedUrl.query && parsedUrl.query.shop) {
      req.session.shopUrl = 'https://' + parsedUrl.query.shop;
    }

    res.redirect('/authenticate');
  } else {
    //Verify Token is still valid
    let url = parsedUrl.query.shop;
    let token = req.session.oauth_access_token;
    ShopifyService.verifyToken(url, token, (err, body) => {
      if (err) {
        req.session = null;
        res.redirect(req.originalUrl);
      } else {
        // Request is fine, api error?
        if (body.errors) {
          req.session = null;
          res.redirect(req.originalUrl);
        } else {
          res.redirect('/app');
        }
      }
    });
  }
});

router.get('/authenticate', (req, res) => {
  if (!req.session.oauth_access_token) {
    res.redirect('/escape_iframe');
  } else {
    //Verify Token is still valid
    let url = parsedUrl.query.shop;
    let token = req.session.oauth_access_token;
    ShopifyService.verifyToken(url, token, (err, body) => {
      if (err) {
        req.session = null;
        res.redirect(req.originalUrl);
      } else {
        // Request is fine, api error?
        if (body.errors) {
          req.session = null;
          res.redirect(req.originalUrl);
        } else {
          res.redirect('/app');
        }
      }
    });
  }
});

router.get('/escape_iframe', (req, res) => {
  res.render('escape_iframe');
});

router.get('/auth_code', (req, res) => {
  var redirectUrl = OAuthUrl(req.session.shopUrl).getAuthorizeUrl({
    redirect_uri: config.redirectUrl,
    scope:        config.scope,
  });
  res.redirect(redirectUrl);
});

router.get('/app', (req, res) => {
  res.render('index', {
    apiKey:   config.apiKey,
    shopUrl:  req.session.shopUrl,
  });
});

router.get('/auth_token', (req, res) => {
  var parsedUrl = url.parse(req.originalUrl, true);
  OAuthUrl(req.session.shopUrl).getOAuthAccessToken(
    parsedUrl.query.code, {},
    function (error, accessToken, refreshToken) {
      if (error) {
        res.send(500);
        return;
      } else {
        req.session.oauth_access_token = accessToken;
        res.redirect('/app');
      }
    }
  );
});

var OAuthUrl = function (shopUrl) {
    return new OAuth(
      config.apiKey,
      config.clientSecret,
      shopUrl,
      '/admin/oauth/authorize',
      '/admin/oauth/access_token');
  };

module.exports = router;
