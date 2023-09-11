export { Subjects };
import { Shared } from "./shared";
import { Subject } from "./interfaces";

class Subjects<T extends Subject> extends Shared {
  private subjects: T[] = [];

  add(subject: T): string {
    const id = this.generateUniqueId(2, 5);
    const subjectWithId = { ...subject, id };
    this.subjects.push(subjectWithId);
    return id;
  }

  remove(subjectId: string): void {
    this.checkIfInArray(this.subjects, subjectId);
    this.subjects = this.subjects.filter((subject) => subject.id !== subjectId);
  }

  verify(subjectToVerify: T): boolean {
    return this.subjects.some(
      (subject) =>
        subject.title === subjectToVerify.title &&
        subject.lessons === subjectToVerify.lessons
    );
  }
  readAll(): T[] {
    return this.subjects;
  }
  read(id: string): T[] {
    this.checkIfInArray(this.subjects, id);
    return this.subjects.filter((s) => s.id === id);
  }
}
// const subjects = new Subjects<Subject>();
