const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAll = async (req, res) => {
    try {
        const result = await prisma.student.findMany({
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

const getStudent = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        let student = await prisma.student.findFirst({
            where: {
                id,
                status: 'ENABLE'
            }
        });

        if (student) {
            const universities = await prisma.education.findMany({
                where: {
                    studentId: student.id,
                    status: 'STUDY',
                    university: { status: 'ENABLE' }
                },
                select: {
                    university: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    degree: true
                }
            });

            student.universities = universities.map(({ university, degree }) => ({
                id: university.id,
                name: university.name,
                degree
            }));
        }

        return res.status(200).json({
            data: student
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

const createStudent = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            universityId,
            degree,
            status = 'STUDY'
        } = req.body;

        if (universityId && degree) {
            const university = await prisma.university.findFirst({
                where: {
                    id: universityId,
                    status: 'ENABLE'
                }
            });

            if (!university) {
                return res.status(404).json({
                    message: 'University not found.'
                });
            
            } else if (!['BACHELOR', 'MASTER', 'DOCTORAL'].includes(degree)) {
                return res.status(400).json({
                    message: 'Degree incorrect.'
                });

            } else if (!['STUDY', 'GRADUATE', 'TERMINATE'].includes(status)) {
                return res.status(400).json({
                    message: 'Status incorrect.'
                });
            }
        }

        let student = await prisma.student.create({
            data: { firstName, lastName }
        });

        if (universityId && degree) {
            const education = await prisma.education.create({
                data: {
                    universityId,
                    studentId: student.id,
                    degree,
                    status
                }
            });

            student.university = {
                id: education.universityId,
                degree: education.degree,
                status: education.status
            };
        }

        return res.status(201).json({
            message: 'Created student successfully.',
            data: student
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

const updateStudent = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { firstName, lastName } = req.body;

        const result = await prisma.student.update({
            where: { id },
            data: { firstName, lastName }
        });

        return res.status(200).json({
            message: 'Updated student successfully.',
            data: result
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const result = await prisma.student.update({
            where: { id },
            data: { status: 'DISABLE' }
        });

        return res.status(200).json({
            message: 'Deleted student successfully.',
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
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
};
