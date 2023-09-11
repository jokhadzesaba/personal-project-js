import { Person, Teacher } from "./interfaces";
import { Shared } from "./shared";

export { Teachers };
class Teachers<T extends Person & Teacher> extends Shared {
  private teachers: T[] = [];

  add(teacher: T): string {
    for (const phone of teacher.phones) {
      if (!this.validateNumber(phone.phone, /^(?:\+995\s?)?(?:5\d{2}\s?\d{2}\s?\d{2}\s?\d{2})$/)) {
        throw new Error("Invalid phone number: " + phone.phone);
      }
    }

    for (const emailObj of teacher.emails) {
      if (!this.validateEmail(emailObj.email, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
        throw new Error("Invalid email address: " + emailObj.email);
      }
    }
    if (!this.validateDateOfBirth(teacher.dateOfBirth, /^\d{4}-\d{2}-\d{2}$/)) {
      throw new Error("Invalid date of birth: " + teacher.dateOfBirth);
    }
    this.validatePrimaryFlags(teacher.phones, "phones");
    this.validatePrimaryFlags(teacher.emails, "emails");
    if (teacher.sex !== "male" && teacher.sex !== "female") {
      throw new Error("Invalid sex: " + teacher.sex);
    }

    const id = this.generateUniqueId(2, 6);
    const teacherWithId = { ...teacher, id };
    this.teachers.push(teacherWithId);
    return id;
  }

  read(id: string): string {
    this.checkIfInArray(this.teachers, id);
    return JSON.stringify(this.teachers.filter((e) => e["id"] === id));
  }

  remove(id: string): void {
    this.checkIfInArray(this.teachers, id);
    this.teachers = this.teachers.filter((e) => e["id"] !== id);
  }

  update(id: string, updatedProfile: Partial<T>): void {
    this.checkIfInArray(this.teachers, id);
    const teacherIndex = this.teachers.findIndex((teacher) => teacher["id"] === id);
    if (teacherIndex !== -1) {
      const existingTeacher = { ...this.teachers[teacherIndex] };
      if (updatedProfile.name) {
        existingTeacher["name"] = updatedProfile["name"];
      }
      if (updatedProfile.dateOfBirth) {
        existingTeacher["dateOfBirth"] = updatedProfile["dateOfBirth"];
      }
      if (updatedProfile.phones) {
        existingTeacher["phones"] = updatedProfile["phones"];
      }
      if (updatedProfile.sex) {
        existingTeacher["sex"] = updatedProfile["sex"];
      }
      if (updatedProfile.description !== undefined) {
        existingTeacher["description"] = updatedProfile["description"];
      }
      if (updatedProfile.emails) {
        existingTeacher["emails"] = updatedProfile["emails"];
      }
      if (updatedProfile.subjects) {
        existingTeacher["subjects"] = updatedProfile["subjects"];
      }
      this.teachers[teacherIndex] = existingTeacher;
    } else {
      throw new Error("The teacher with this id does not exist");
    }
  }
}





