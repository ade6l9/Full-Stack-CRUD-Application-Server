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

/* EDIT STUDENT */
router.put('/:id', ash(async(req, res) => {
  await Student.update(req.body,
        { where: {id: req.params.id} }
  );
  // Find student by Primary Key
  let student = await Student.findByPk(req.params.id);
  res.status(201).json(student);  // Status code 201 Created - successful creation of a resource
}));




// remove studnet from campus
// PUT /api/students/:id
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










// Export router, so that it can be imported to construct the apiRouter (app.js)
module.exports = router;



//----------------------------------------------------------------------
// Route to get students who are not associated with any campus
// In your backend routes (e.g., students.js)
// Route to get students without a campus
// Assuming you're using Express.js with Mongoose

// Backend route to fetch students without a campus
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









// Route to add an existing student to a campus
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
