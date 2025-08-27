import User from "../models/User.js";
import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// Inngest Functions to save user data to a data base
const syncUserCreation = inngest.createFunction(
    {id: 'sync-user-data-clerk'},
    {event: 'clerk/user.created'},
    async ({ event }) => {
        const {id, first_name, last_name, email_addresses, image_url} = event.data;
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            image: image_url
        }
        await User.create(userData);
    }
);

// Inngest Functions to delete user data from database
const syncUserDeletion = inngest.createFunction(
    {id: 'delete-user-data-clerk'},
    {event: 'clerk/user.deleted'},
    async ({ event }) => {
        const {id} = event.data;
        await User.findByIdAndDelete(id);
    }
);

// Inngest Functions to update user data to a data base
const syncUserUpdation = inngest.createFunction(
    {id: 'update-user-from-clerk'},
    {event: 'clerk/user.updated'},
    async ({ event }) => {
        const {id, first_name, last_name, email_addresses, image_url} = event.data;
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            image: image_url
        }
        await User.findByIdAndUpdate(id, userData);
    }
);


export const functions = [ syncUserCreation, syncUserUpdation, syncUserDeletion];