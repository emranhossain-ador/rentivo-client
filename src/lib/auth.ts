import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGO_DB_URL as string);
const db = client.db('rentivodb');

export const auth = betterAuth({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
        maxPasswordLength: 10
    },
    database: mongodbAdapter(db, {
        client,
    }),
    user: {
        additionalFields: {
            role: {
                type: "string",
                input: true,
                defaultValue: 'customer'
            },
            address: {
                type: "string",
                input: true,
            },
            phoneNumber: {
                type: "string",
                input: true,
            },
        },
    },
});