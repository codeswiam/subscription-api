import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { cancelSubscription, createSubscription, deleteSubscription, getUserSubscription, getUserSubscriptions, updateSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

// Create a new subscription
subscriptionRouter.post("/", authorize, createSubscription);

// Get a subscription by id
subscriptionRouter.get("/:id", authorize, getUserSubscription);

// Get all subscriptions of a user
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

// Update a subscription by id
subscriptionRouter.put("/:id", updateSubscription);

// Cancel a subscription by id
subscriptionRouter.put("/:id/cancel", cancelSubscription);

// Delete a subscription by id
subscriptionRouter.delete("/:id", deleteSubscription);

subscriptionRouter.put("/upcoming-renewals", (req, res) => {
    res.send({title: "GET upcoming renewals"});
});

export default subscriptionRouter;