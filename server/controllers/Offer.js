"use strict";

// Import of the Offer model.
const Offer = require("../models/Offer");

// Define the controller with its own different behaviours.
const CONTROLLER = {
  // Behaviour to retrieve all the offers kept in DB.
  getOffers: (request, response) => {
    Offer.find()
      .sort("createdAt")
      .exec((error, offers) => {
        // If there is any error...
        if (error) {
          return response.status(500).send({
            status: "error",
            message: `${error}`,
          });
          // Or there are not stored offers in the DB...
        } else if (!offers) {
          return response.status(404).send({
            status: "not found",
            message: "There aren't offers in the DB.",
          });
          // Return all the offers.
        } else {
          return response.status(200).send({
            status: "success",
            offers,
          });
        }
      });
  },

  // Behaviour to retrieve all the offers by the recruiter ID.
  getOffersByRecruiter: (request, response) => {
    Offer.find({ recruiter: request.user._conditions._id })
      .sort("createdAt")
      .exec((error, offers) => {
        // If there is any error...
        if (error) {
          return response.status(500).send({
            status: "error",
            message: `${error}`,
          });
          // Or there are not stored offers in the DB...
        } else if (!offers) {
          return response.status(404).send({
            status: "not found",
            message: "There aren't offers in the DB created by that recruiter.",
          });
          // Return all the offers.
        } else {
          return response.status(200).send({
            status: "success",
            offers,
          });
        }
      });
  },

  // Behaviour to get a single offer.
  getOffer: (request, response) => {
    // Check if exists.
    if (!request.params.url || request.params.url === null) {
      return response.status(404).send({
        status: "not found",
        message: "An url is required to search for an offer!",
      });
    }
    // Look for the offer.
    Offer.findOne({ url: request.params.url }, (error, offer) => {
      // If there is any error retrieving the offer from the DB...
      if (error) {
        return response.status(500).send({
          status: "error",
          message: `${error}`,
        });
        // If there is not any offer with that url...
      } else if (!offer) {
        return response.status(404).send({
          status: "not found",
          message: "There aren't offers in the DB with that url.",
        });
      } else {
        // Return the offer.
        return response.status(200).send({
          status: "success",
          offer,
        });
      }
    });
  },

  // Behaviour to save any offer.
  createOffer: (request, response) => {
    // Add the recruiter to the offer info.
    request.body.recruiter = request.user._conditions._id;
    // Save the object from the "request.body" property.
    Offer.create(request.body, (error, offerStored) => {
      // If there is any error when saving the offer...
      if (error || !offerStored) {
        return response.status(500).send({
          status: "error",
          message: `The offer has not been saved because of ${error}`,
        });
        // Otherwise, save the offer and send a 200 response.
      } else {
        return response.status(200).send({
          status: "success",
          offerStored,
        });
      }
    });
  },

  // Behaviour to update an existent offer.
  updateOffer: (request, response) => {
    /**
     * Update the document filtering by the "url" property of the model.
     * Then, pass the object to be saved through "request.body".
     */
    Offer.findOneAndUpdate(
      { url: request.params.url },
      request.body,
      { new: true, runValidators: true },
      (error, offerUpdated) => {
        // If there is any error when updating the offer...
        if (error || !offerUpdated) {
          return response.status(500).send({
            status: "error",
            message: `The offer has not been updated because of ${error}`,
          });
          // Otherwise, update the offer and send a 200 response.
        } else {
          return response.status(200).send({
            status: "success",
            offerUpdated,
          });
        }
      }
    );
  },
};

// Here we export the controller.
module.exports = CONTROLLER;
