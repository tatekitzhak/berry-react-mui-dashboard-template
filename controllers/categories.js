import express from "express";
import axios from 'axios';

import { v4 as uuid } from "uuid";

let users = [];

export async function getData(req, res) {
    try {
        const apiRes = await axios.get('https://jsonplaceholder.typicode.com/albums');
    
        console.log('getData:',apiRes)
        // return res.json({ info: apiRes.data.info });
      } catch (err) {
          console.log('error:', err)
        // return next(err);
      }
};