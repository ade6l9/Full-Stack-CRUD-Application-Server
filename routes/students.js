/*==================================================
/routes/students.js

It defines all the students-related routes.
==================================================*/
// Import Express module
const express = require('express');
// Create an Express router function called "router"
const router = express.Router();
// Import database models
const { Student, Campus } = require('../database/models');

// Import a middleware to replace "try and catch" for request handler, for a concise coding (fewer lines of code)
const ash = require('express-async-handler');

/* GET ALL STUDENTS: async/await using "try-catch" */
// router.get('/', async (req, res, next) => {
//   try {
//     let students = await Student.findAll({include: [Campus]});
//     res.status(200).json(students);
//   } 
//   catch(err) {
//     next(err);
//   }
// });

/* GET ALL STUDENTS: async/await using express-async-handler (ash) */
// Automatically catches any error and sends to Routing Error-Handling Middleware (app.js)
// It is the same as using "try-catch" and calling next(error)
router.get('/', ash(async(req, res) => {
  let students = await Student.findAll({include: [Campus]});
  res.status(200).json(students);  // Status code 200 OK - request succeeded
}));

/* GET STUDENT BY ID */
router.get('/:id', ash(async (req, res) => {
  // Find student by Primary Key
  let student = await Student.findByPk(req.params.id, { include: [Campus] });  // Get the student and its associated campuses
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });  // Status code 404 Not Found
  }
  res.status(200).json(student);  // Status code 200 OK - request succeeded
}));

/* ADD NEW STUDENT */
router.post('/', async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log incoming data
    const { firstname, lastname, email, imageurl, gpa, campusId } = req.body;

    // Validate required fields
    if (!firstname || !lastname || !email || gpa === undefined) {
      return res.status(400).json({
        error: "First name, last name, email, and GPA are required.",
      });
    }

    // Validate GPA
    if (gpa < 0.0 || gpa > 4.0) {
      return res.status(400).json({
        error: "GPA must be between 0.0 and 4.0.",
      });
    }

    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: "Email must be a valid email address." });
    }

    // Create the new student
    const newStudent = await Student.create({
      firstname,
      lastname,
      email,
      gpa: parseFloat(gpa),
      imageurl: imageurl || "https://via.placeholder.com/150", // Use default if undefined
      campusId: campusId || null,
    });

    console.log("Saved Student:", newStudent); // Log saved student
    res.status(201).json(newStudent); // Status code 201 Created
  } catch (error) {
    console.error("Error creating student:", error.message); // Log the error
    res.status(500).json({ error: "Error creating student." }); // Status code 500 Internal Server Error
  }
});

/* DELETE STUDENT */
router.delete('/:id', function(req, res, next) {
  Student.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.status(200).json("Deleted a student!"))
    .catch(err => next(err));
});

/* REMOVE STUDENT FROM CAMPUS || SINGLE CAMPUS VIEW */ 
router.put('/:id', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      await student.update(req.body);
      res.status(200).send(student);
    } else {
      res.status(404).send('Student not found');
    }
  } catch (err) {
    next(err);
  }
});

/* REMOVE STUDENT FROM A CAMPUS || SINGLE STUDENT VIEW */ 
router.put('/students/:id', async (req, res) => {
  try {
    const studentId = req.params.id;

    // Update the student's campusId to null (removing them from the campus)
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { campusId: null },
      { new: true } // Return the updated student
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json(updatedStudent); // Return the updated student
  } catch (error) {
    console.error("Error removing student from campus:", error);
    res.status(500).json({ error: 'Failed to remove student from campus' });
  }
});

/* EDIT STUDENT */
router.put('/:id', async (req, res) => {
  try {
    const { firstname, lastname, email, imageurl, gpa, campusId } = req.body;
    const studentId = req.params.id;

    // Find student by ID and update details
    const updatedStudent = await Student.update(
      {
        firstname,
        lastname,
        email,
        imageurl,
        gpa: parseFloat(gpa),  // Ensure GPA is a float
        campusId: campusId || null,  // If campusId is not provided, set it to null
      },
      {
        where: { id: studentId },
        returning: true,  // Return the updated student
      }
    );

    if (updatedStudent[0] === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Send back the updated student
    res.status(200).json(updatedStudent[1][0]);
  } catch (error) {
    console.error("Error updating student:", error.message);
    res.status(500).json({ error: "Error updating student." });
  }
});

/* GET STUDENTS WITHOUT CAMPUS */
router.get('/students/', async (req, res) => {
  try {
    // Fetch students where campusId is NULL or an empty string
    const studentsWithoutCampus = await Student.find({
      $or: [{ campusId: null }, { campusId: "" }]
    });

    res.status(200).json(studentsWithoutCampus); // Send only students without a campus
  } catch (error) {
    console.error('Error fetching students without campus:', error);
    res.status(500).json({ error: 'Failed to fetch students without a campus' });
  }
});

/* ADD AN EXISTING STUDENT TO CAMPUS */ 
router.put('/students/:studentId/', async (req, res) => {
  const studentId = req.params.studentId;
  const { campusId } = req.body;

  try {
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    if (student.campusId) {
      return res.status(400).json({ error: 'Student is already associated with a campus' });
    }

    student.campusId = campusId;
    await student.save();

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add student to campus' });
  }
});



/* EXPORT ROUTER */
module.exports = router;