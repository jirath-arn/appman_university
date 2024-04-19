const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAll = async (req, res) => {
    return res.status(200).json({
        data: null
    });
};

const getStudent = async (req, res) => {
    const id = req.params.id;

    return res.status(200).json({
        data: null
    });
};

const createStudent = async (req, res) => {
    return res.status(201).json({
        data: null
    });
};

const updateStudent = async (req, res) => {
    const id = req.params.id;

    return res.status(200).json({
        data: null
    });
};

const deleteStudent = async (req, res) => {
    const id = req.params.id;

    return res.status(200).json({
        data: null
    });
};

module.exports = {
    getAll,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
};
