"use strict";

// Import express package.
const EXPRESS = require("express");

// Import the Offer controller.
const OFFER_CONTROLLER = require("../controllers/Offer");

// Create the router.
const ROUTER = EXPRESS.Router();

/**
 * GET routes.
 */
ROUTER.get("/", OFFER_CONTROLLER.getOffers);
ROUTER.get("/offers/:url", OFFER_CONTROLLER.getOffer);

/**
 * POST routes.
 */
ROUTER.post("/offers/new", OFFER_CONTROLLER.createOffer);

/**
 * PUT routes.
 */
ROUTER.put("/offers/edit/:url", OFFER_CONTROLLER.updateOffer);

/**
 * DELETE routes.
 */

// Here we export the module.
module.exports = ROUTER;
