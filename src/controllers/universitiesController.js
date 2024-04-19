const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAll = async (req, res) => {
    return res.status(200).json({
        data: null
    });
};

const getUniversity = async (req, res) => {
    const id = req.params.id;

    return res.status(200).json({
        data: null
    });
};

const createUniversity = async (req, res) => {
    return res.status(201).json({
        data: null
    });
};

const updateUniversity = async (req, res) => {
    const id = req.params.id;

    return res.status(200).json({
        data: null
    });
};

const deleteUniversity = async (req, res) => {
    const id = req.params.id;

    return res.status(200).json({
        data: null
    });
};

module.exports = {
    getAll,
    getUniversity,
    createUniversity,
    updateUniversity,
    deleteUniversity
};
