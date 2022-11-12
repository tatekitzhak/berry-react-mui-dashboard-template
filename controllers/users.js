import express from "express";

import { v4 as uuid } from "uuid";

let users = [];

export const getUsersList = (req, res) => {
    res.send(users);
};


export const createUser = (req, res) => {
    const user = req.body;

    users.push({...user, id: uuid() });
    console.log('users:',users)
    res.send("A user added successfully:")
}