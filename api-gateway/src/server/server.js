import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import accessEnv from "../helpers/accessEnv";

const PORT = accessEnv("PORT", 7000);

const apolloServer = new ApolloServer({
    context: a => a
});

const app = express();

app.use(
    cors({
        origin: (origin, cb) => cb(null, true),
        credentials: true
    })
);

apolloServer.applyMiddleware({ app, cors: false });

app.listen(PORT, "0.0.0.0", () => {
    console.info(`API gateway listening on ${PORT}`);
});