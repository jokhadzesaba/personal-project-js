import { Shared } from "./shared.mjs";
export {Gradebooks}

class Gradebooks extends Shared {
  constructor(groups, teachers, subjects) {
    super();
    this.gradebooks = [];
    this.groups = groups;
    this.teachers = teachers;
    this.subjects = subjects;
  }

  add(groupId) {
    this.checkString(groupId);
    const gradeBookId = this.generateUniqueId(2, 8);
    this.gradebooks.push({ id: gradeBookId, groupId, records: [] });
    return gradeBookId;
  }

  clear(gradebookId) {
    this.checkString(gradebookId);
    const gradebook = this.gradebooks.find((gb) => gb.id === gradebookId);
    if (gradebook) {
      gradebook.records = [];
    }
  }

  addRecord(gradebookId, record) {
    this.checkString(gradebookId);
    this.checkObject(record);
    this.#recordValidation(record);
    const gradebook = this.gradebooks.find((gb) => gb.id === gradebookId);
    if (gradebook) {
      gradebook.records.push(record);
    }
  }

  #recordValidation(record) {
    if (
      !record.pupilId ||
      !record.teacherId ||
      !record.subjectId ||
      !record.lesson ||
      !record.mark
    ) {
      throw new Error("All fields are required");
    }
    this.checkString(record.pupilId);
    this.checkString(record.teacherId);
    this.checkString(record.subjectId);
    this.checkNumber(record.lesson);
    this.checkNumber(record.mark);
  }
  read(gradebookId, pupilId) {
    this.checkString(gradebookId);
    this.checkString(pupilId);
    const gradebook = this.gradebooks.find((gb) => gb.id === gradebookId);
    const pupil = this.groups
      .read(gradebook.groupId)
      .pupils.find((pupil) => pupil.id === pupilId);
    const records = gradebook.records.filter(
      (record) => record.pupilId === pupilId
    );

    const formattedRecords = records.map((record) => ({
      teacher: `${this.teachers.read(record.teacherId).name.first} ${
        this.teachers.read(record.teacherId).name.last
      }`,
      subject: this.subjects.read(record.subjectId).title,
      lesson: record.lesson,
      mark: record.mark,
    }));
    const obj = {
      name: `${pupil.name.first} ${pupil.name.last}`,
      records: formattedRecords,
    };
    return obj;
  }

  readAll(gradebookId) {
    this.checkString(gradebookId);
    const gradebook = this.gradebooks.find((gb) => gb.id === gradebookId);

    if (!gradebook) {
      throw new Error("Invalid gradebookId");
    }

    const group = this.groups.read(gradebook.groupId);
    if (!group) {
      throw new Error("Invalid group in gradebook");
    }

    const allPupilRecords = group.pupils.map((pupil) => {
      const records = gradebook.records.filter(
        (record) => record.pupilId === pupil.id
      );

      const formattedRecords = records.map((record) => ({
        teacher: `${this.teachers.read(record.teacherId).name.first} ${
          this.teachers.read(record.teacherId).name.last
        }`,
        subject: this.subjects.read(record.subjectId).title,
        lesson: record.lesson,
        mark: record.mark,
      }));

      return {
        pupil: `${pupil.name.first} ${pupil.name.last}`,
        records: formattedRecords,
      };
    });

    return JSON.stringify(allPupilRecords, null, 2);
  }
}
