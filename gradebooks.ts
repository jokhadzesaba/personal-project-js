export { GradeBooks };
import { Groups } from "./groups";
import { Person, Record, Subject, Teacher } from "./interfaces";
import { Shared } from "./shared";
import { Subjects } from "./subjects";
import { Teachers } from "./teachers";
class GradeBooks extends Shared {
  private teachers: Teachers<Person & Teacher>;
  private groups: Groups;
  private subjects: Subjects<Subject>;
  public gradeBooks: Object[];
  constructor(
    groups: Groups,
    teachers: Teachers<Person & Teacher>,
    subjects: Subjects<Subject>
  ) {
    super();
    this.teachers = teachers;
    this.groups = groups;
    this.subjects = subjects;
    this.gradeBooks = [];
  }
  add(groupId: string): string {
    const id = this.generateUniqueId(2, 4);
    let recordArray: Record[] = [];
    this.gradeBooks.push({ id: id, groupId: groupId, records: recordArray });
    return id;
  }
  clear(gradeBookId: string): void {
    this.checkIfInArray(this.gradeBooks, gradeBookId);
    this.gradeBooks = [];
  }
  addRecord(gradeBookId: string, record: Record): void {
    const grbook = this.gradeBooks.find((e) => e["id"] === gradeBookId);
    if (grbook) {
      this.gradeBooks.map((e) => {
        if (e["id"] === gradeBookId) {
          return {
            id: gradeBookId,
            groupId: e["groupId"],
            records: e["records"].push(record),
          };
        }
      });
    } else {
      throw new Error("gradebook with this id does not exists");
    }
  }
  read(gradeBookId: string, pupilId: string): object {
    const gradebook = this.gradeBooks.find((e) => e["id"] === gradeBookId);

    if (!gradebook) {
      throw new Error("the gradebook with this id does not exists");
    }
    const pupil = this.groups.read(gradebook["groupId"]);
    const pupils = JSON.parse(pupil)[0]["pupils"];
    const selectedPupil = pupils.find((p: object) => p["id"] === pupilId);

    if (!selectedPupil) {
      throw new Error(
        "the pupil with this id does not exist in this gradebook"
      );
    }
    const records = gradebook["records"].filter(
      (record: Record) => record.pupilId === pupilId
    );
    const output = {
      name: `${selectedPupil.name.first} ${selectedPupil.name.last}`,
      records: records.map((record: Record) => {
        const teacher = JSON.parse(this.teachers.read(record["teacherId"]));
        const subject = this.subjects.read(record["subjectId"]);
        return {
          teacher: `${teacher[0]["name"]["first"]} ${teacher[0]["name"]["last"]}`,
          subject: subject[0]["title"],
          lesson: record["lesson"],
          mark: record["mark"],
        };
      }),
    };
    return output;
  }
  readAll(gradeBookId: string): { name: string; records: string }[] {
    const gradebook = this.gradeBooks.find((e) => e["id"] === gradeBookId);
    if (!gradebook) {
      throw new Error("The gradebook with this id does not exist");
    }
    const records = gradebook["records"];
    const recordsByPupil = {};
    records.forEach((e: Record) => {
      const teacher = JSON.parse(this.teachers.read(e["teacherId"]));
      const subject = this.subjects.read(e["subjectId"]);
      const pupil = this.groups.read(gradebook["groupId"]);
      const pupils = JSON.parse(pupil)[0]["pupils"];
      const selectedPupil = pupils.find(
        (p: object) => p["id"] === e["pupilId"]
      );
      const pupilName = `${selectedPupil["name"]["first"]} ${selectedPupil["name"]["last"]}`;
      if (!recordsByPupil[pupilName]) {
        recordsByPupil[pupilName] = [];
      }
      recordsByPupil[pupilName].push({
        teacher: `${teacher[0]["name"]["first"]} ${teacher[0]["name"]["last"]}`,
        subject: subject[0]["title"],
        lesson: e["lesson"],
        mark: e["mark"],
      });
    });
    const output = Object.keys(recordsByPupil).map((name) => ({
      name: name,
      records: JSON.stringify(recordsByPupil[name]),
    }));
    return output;
  }
}
