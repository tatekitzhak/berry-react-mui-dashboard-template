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
};

export const getUserByID = (req, res) => {
    const userID = users.filter( (user) => user.id === req.params.id );
    res.send(userID)
};

export const deleteUserByID = (req, res) => {
    users = users.filter((user) => user.id !== req.params.id );

    res.send("The user deleted successfully!")
};

export const updateUserByID = (req, res) => {
    const user = users.find((user) => user.id === req.params.id);

    user.name = req.body.name;
    user.email = req.body.email;
    user.contact = req.body.contact;

    res.send("The user updated successfully!")
}