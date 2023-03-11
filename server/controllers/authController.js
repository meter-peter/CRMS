const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Model/User'); // assuming you have a user model defined in a separate file

const registerUser = async(req, res) => {
    const { email, password, role, firstName, lastName, phoneNumber, address } = req.body;
    try {
        // check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // create a new user
        user = new User({
            email,
            password,
            role,
            firstName,
            lastName,
            phoneNumber,
            address,
        });

        // hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // save the user to the database
        await user.save();

        // create a JWT token
        const payload = {
            user: {
                id: user.id,
                role: user.role,
            },
        };

        const token = jwt.sign(payload, "secret", { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

const loginUser = async(req, res) => {
    const { email, password } = req.body;
    try {
        // check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // create a JWT token
        const payload = {
            user: {
                id: user.id,
                role: user.role,
            },
        };

        const token = jwt.sign(payload, "secret", { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { registerUser, loginUser };