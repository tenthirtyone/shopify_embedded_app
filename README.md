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

Once the server is built and running the app use this listing to install to your development store.

Build client

`
$ cd client && npm install && gulp
`

Server

`$ npm install`

## Usage
`$ node app.js`
