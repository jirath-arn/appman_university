const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAll = async (req, res) => {
    try {
        const result = await prisma.university.findMany({
            where: { status: 'ENABLE' }
        });
    
        return res.status(200).json({
            data: result
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

const getUniversity = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        let university = await prisma.university.findFirst({
            where: {
                id,
                status: 'ENABLE'
            }
        });

        if (university) {
            const students = await prisma.education.findMany({
                where: {
                    universityId: university.id,
                    status: 'STUDY',
                    student: { status: 'ENABLE' }
                },
                select: {
                    student: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true
                        }
                    },
                    degree: true
                }
            });

            university.students = students.map(({ student, degree }) => ({
                id: student.id,
                firstName: student.firstName,
                lastName: student.lastName,
                degree
            }));
        }

        return res.status(200).json({
            data: university
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

const createUniversity = async (req, res) => {
    try {
        const { name } = req.body;

        const result = await prisma.university.create({
            data: { name }
        });

        return res.status(201).json({
            message: 'Created university successfully.',
            data: result
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

const updateUniversity = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name } = req.body;

        const result = await prisma.university.update({
            where: { id },
            data: { name }
        });

        return res.status(200).json({
            message: 'Updated university successfully.',
            data: result
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

const deleteUniversity = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const result = await prisma.university.update({
            where: { id },
            data: { status: 'DISABLE' }
        });

        return res.status(200).json({
            message: 'Deleted university successfully.',
            data: result
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

module.exports = {
    getAll,
    getUniversity,
    createUniversity,
    updateUniversity,
    deleteUniversity
};
