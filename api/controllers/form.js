const express = require('express');

// Import models
const Form = require('../models/form');

// Form controllers
module.exports = {
  addForm: async (req, res) => {
    const { form } = req.body;
    try {
      console.log(`form added ${form}`);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteForm: async (req, res) => {
    const { formId } = req.body;
    try {
      console.log(`form deleted ${formId}`);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
