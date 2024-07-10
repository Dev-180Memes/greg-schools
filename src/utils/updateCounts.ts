import School from "@/models/school.model";
import CollegeFaculty from "@/models/collegeFaculty.model";
import Department from "@/models/department.model";
import Level from "@/models/level.model";
import Course from "@/models/course.model";

export const updateSchoolCounts = async (schoolId: string, field: 'collegeFaculty' | 'departments' | 'materials', increment: number) => {
    await School.findByIdAndUpdate(schoolId, { $inc: { [field]: increment } });
};

export const updateCollegeFacultyCounts = async (collegeFacultyId: string, increment: number) => {
    await CollegeFaculty.findByIdAndUpdate(collegeFacultyId, { $inc: { departments: increment } });
    // Find school that the collegeFaculty belongs to and update departments count
    const collegeFaculty = await CollegeFaculty.findById(collegeFacultyId);
    await updateSchoolCounts(collegeFaculty?.university.toString() || '', 'departments', increment);
};

export const updateDepartmentCounts = async (departmentId: string, increment: number) => {
    await Department.findByIdAndUpdate(departmentId, { $inc: { levels: increment } });
};

export const updateLevelCounts = async (levelId: string, increment: number) => {
    await Level.findByIdAndUpdate(levelId, { $inc: { courses: increment } });
};

export const updateCourseCounts = async (courseId: string, increment: number) => {
    await Course.findByIdAndUpdate(courseId, { $inc: { materials: increment } });
    // Find school that the course belongs to and update materials count
    const course = await Course.findById(courseId);
    const level = await Level.findById(course?.level.toString());
    const department = await Department.findById(level?.department.toString());
    const collegeFaculty = await CollegeFaculty.findById(department?.collegeFaculty.toString());
    await updateSchoolCounts(collegeFaculty?.university.toString() || '', 'materials', increment);
};