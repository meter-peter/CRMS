const Department = require('../Model/Department');

// GET all departments
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a specific department by id
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.json(department);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE a new department
exports.createDepartment = async (req, res) => {
  const department = new Department({
    name: req.body.name,
    description: req.body.description,
    faculty: req.body.faculty,
  });
  try {
    const newDepartment = await department.save();
    res.status(201).json(newDepartment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE a department by id
exports.updateDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    department.name = req.body.name;
    department.description = req.body.description;
    department.faculty = req.body.faculty;
    const updatedDepartment = await department.save();
    res.json(updatedDepartment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE a department by id
exports.deleteDepartment = async (req, res) => {
    const { id } = req.params;
  
    try {
      const department = await Department.findById(id);
  
      if (!department) {
        return res.status(404).json({ message: `Department with id ${id} not found` });
      }
  
      await Department.deleteOne({ _id: id }); // Use the deleteOne method instead of remove
  
      res.status(200).json({ message: `Department with id ${id} deleted successfully` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
