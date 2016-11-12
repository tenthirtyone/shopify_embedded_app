# Shopify Embedded App

Skeleton for Embedded Shopify Apps.

## Installation

1. Signup for [Shopify Partners](https://www.shopify.com/partners)
2. Create a Development Store

![Missing Image](https://github.com/tenthirtyone/shopify_embedded_app/blob/master/assets/CreateDevStore.png?raw=true "Create Dev Store")
3. Create an App

![Missing Image](https://github.com/tenthirtyone/shopify_embedded_app/blob/master/assets/CreateApp.png?raw=true "Create App")
4. Configure App (Apps => AppName => Edit App Settings)
* Enable Embedded SDK
* App URL: http://localdev.com/
* Redirect URL: http://localdev.com/auth_token
* Save Changes
5. Edit App Store Listings (Beside Edit App Settings)
6. Save
7. View App Listing

Once the server is built and running open your development store. Then use this listing to install to your development store.

Build client

`
$ cd client && npm install && gulp
`

Server

`$ npm install`

`$ cd keys && openssl req -new -newkey rsa:2048 -days 365 -nodes -x509 -keyout key.pem -out cert.pem`

/etc/hosts

`127.0.0.1 localdev.com`

## Usage
`$ node app.js`
