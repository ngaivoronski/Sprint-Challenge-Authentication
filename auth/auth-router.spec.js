const request = require("supertest");
const server = require("../api/server");
const Auth = require("./auth-router");
const db = require("../database/dbConfig");

describe("auth-router.js", function() {
    describe("environment", function() {
        it("should set environment to testing", function() {
        expect(process.env.DB_ENV).toBe("testing");
        });
    });

    describe("post /api/auth/login", function() {
        it("no credentials should return a 500 error", function() {
        // spin up the server
        return request(server)
            .post("/api/auth/login")
            .then(res => {
                expect(res.status).toBe(500);
            });
        });

        it("invalid credentials should return a 401 error", function() {
            return request(server)
                .post("/api/auth/login")
                .send({ username: "user3", password: "asdfasdf" })
                .then(res => {
                expect(res.status).toBe(401);
                });
        });

        it("valid credentials should return a 200 and a token", function() {
            return request(server)
                .post("/api/auth/login")
                .send({ username: "user1", password: "pass" })
                .then(res => {
                    expect(res.status).toBe(200);
                    expect(typeof(res.body.token)).toBe('string');
                });
        });
    });

    describe("post /api/auth/register", function() {
        it("no JSON should return a 500 error", function() {
        // spin up the server
        return request(server)
            .post("/api/auth/register")
            .then(res => {
                expect(res.status).toBe(500);
            });
        });

        it("invalid fields should return a 500 error", function() {
            return request(server)
                .post("/api/auth/register")
                .send({ username: "user3", sdf: "asdfasdf" })
                .then(res => {
                expect(res.status).toBe(500);
                });
        });

        it.skip("valid fields should return a 201 status", function() {
            return request(server)
                .post("/api/auth/register")
                .send({ username: "user4", password: "pass" })
                .then(res => {
                    expect(res.status).toBe(201);
                });
        });
    });

    describe("get /api/jokes", function() {

        it("getting jokes without authentication gives a 401", function() {
            return request(server)
                .get("/api/jokes")
                .then(res => {
                    expect(res.status).toBe(401);
                });
        });

        it("getting jokes with authentication works", function() {
            return request(server)
                .post("/api/auth/login")
                .send({ username: "user1", password: "pass" })
                .then(res => {
                const token = res.body.token;
    
                return request(server)
                    .get("/api/jokes")
                    .set("authorization", token)
                    .then(res => {
                        expect(res.status).toBe(200);
                        expect(Array.isArray(res.body)).toBe(true);
                    });
                });
        });

    });



});