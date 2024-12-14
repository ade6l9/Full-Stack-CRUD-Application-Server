/*==================================================
/routes/campuses.js

It defines all the campuses-related routes.
==================================================*/
// Import Express module
const express = require('express');
// Create an Express router function called "router"
const router = express.Router();
// Import database models
const { Student, Campus } = require('../database/models');

// Import a middleware to replace "try and catch" for request handler, for a concise coding (fewer lines of code)
const ash = require('express-async-handler');

/* GET ALL CAMPUSES: async/await using "try-catch" */
// router.get('/', async (req, res, next) => {
//   try {
//     let campuses = await Campus.findAll({include: [Student]});
//     res.status(200).json(campuses);
//   } 
//   catch(err) {
//     next(err);
//   }
// });

/* GET ALL CAMPUSES */
router.get('/', ash(async(req, res) => {
  let campuses = await Campus.findAll({include: [Student]});  // Get all campuses and their associated students
  res.status(200).json(campuses);  // Status code 200 OK - request succeeded
}));

/* GET CAMPUS BY ID */
router.get('/:id', ash(async(req, res) => {
  // Find campus by Primary Key
  let campus = await Campus.findByPk(req.params.id, {include: [Student]});  // Get the campus and its associated students
  res.status(200).json(campus);  // Status code 200 OK - request succeeded
}));

/* DELETE A CAMPUS */
router.delete('/:id', ash(async (req, res) => {
  const { id } = req.params;

  try {
    // Attempt to delete the campus
    const deleted = await Campus.destroy({ where: { id } });

    // If no campus is found, send a 404 error
    if (!deleted) {
      return res.status(404).json({ error: "Campus not found." });
    }

    // Return a 204 No Content status
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error deleting the campus." });
  }
}));

/* ADD NEW CAMPUS */
router.post('/', async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log incoming data
    const { name, address, description, imageUrl } = req.body;

    const newCampus = await Campus.create({
      name,
      address,
      description,
      imageUrl: imageUrl || 'https://via.placeholder.com/150', // Use default if undefined
    });

    console.log("Saved Campus:", newCampus); // Log saved campus
    res.status(201).json(newCampus);
  } catch (error) {
    console.error("Error creating campus:", error.message);
    res.status(500).json({ error: "Error creating campus." });
  }
});

/* EDIT CAMPUS */
module.exports = router;
router.put("/:id", async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    if (campus) {
      const updatedCampus = await campus.update(req.body);
      res.status(200).json(updatedCampus);
    } else {
      res.status(404).send("Campus not found");
    }
  } catch (error) {
    next(error);
  }
});
