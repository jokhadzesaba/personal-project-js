export { Subject, Person, Teacher, Record };
interface Subject {
  title: string;
  lessons: number;
  description?: string;
  id?: string;
}
interface Person {
  name: {
    first: string;
    last: string;
  };
  dateOfBirth: string;
  phones: Array<{
    phone: string;
    primary: boolean;
  }>;
  sex: string;
  description?: string;
}
interface Teacher {
  emails: Array<{
    email: string;
    primary: boolean;
  }>;
  subjects: Array<{
    subject: string;
  }>;
}
type Record = {
  pupilId: string;
  teacherId: string;
  subjectId: string;
  lesson: number;
  mark: number;
};
