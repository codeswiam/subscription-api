import Subscription from "../models/subscription.model.js"
import { workflowClient } from '../config/upstash.js'
import { SERVER_URL } from '../config/env.js'

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create( {
            ...req.body,
            user: req.user._id, // which user is creating the subscription // comes from auth middleware
        });

        // trigger workflow related to sending reminder emails
        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`, // endpoint to call to start this workflow
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                'content-type': 'application/json',
            },
            retries: 0,
        });      

        res.status(201).json({success: true, data: subscription, workflowRunId});
    } catch (e) {
        next(e);
    }
}

export const getUserSubscription = async (req, res, next) => {
    try {
        // req.params.id is the one passed in
        // req.user.id is the one 
        // check if the user logged in is trying to fetch their own subscription
        if (req.user.id !== req.params.id) {
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }

        const subscription = await Subscription.findById({ id: req.params.id,user: req.params.id });

        res.status(200).json({ success: true, data: subscription });
    } catch (e) {
        next(e);
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        // check if the user logged in is trying to fetch their own subscriptions
        if (req.user.id !== req.params.id) {
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: req.params.id });

        res.status(200).json({ success: true, data: subscriptions });
    } catch (e) {
        next(e);
    }
}

export const updateSubscription = async (req, res, next) => {
    
}

export const cancelSubscription = async (req, res, next) => {
    
}

export const deleteSubscription = async (req, res, next) => {
    
}