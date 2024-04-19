-- CreateEnum
CREATE TYPE "Degree" AS ENUM ('BACHELOR', 'MASTER', 'DOCTORAL');

-- CreateEnum
CREATE TYPE "EducationalStatus" AS ENUM ('STUDY', 'GRADUATE', 'TERMINATE');

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "universityId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "degree" "Degree" NOT NULL,
    "status" "EducationalStatus" NOT NULL DEFAULT 'STUDY',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
