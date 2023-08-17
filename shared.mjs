export { Shared };
class Shared {
  checkNumber(number) {
    if (typeof number !== "number") {
      throw new Error("not a number");
    }
  }
  checkString(string) {
    if (typeof string !== "string") {
      throw new TypeError("not a string");
    }
  }
  checkObject(obj) {
    if (typeof obj !== "object") {
      throw new TypeError("not a object");
    }
  }
  generateUniqueId(a, b) {
    const randomPart = Math.random().toString(36).substr(a, b);
    return randomPart;
  }
  checkIfInArray(array, id) {
    if (!array.includes(id)) {
      throw new Error("no such an id exists");
    }
  }

  validateProperty(obj, prop, type, nestedCheck = null) {
    if (!(prop in obj)) {
      throw new Error(`Missing required property: ${prop}`);
    }
    if (typeof obj[prop] !== type) {
      throw new TypeError(`Property ${prop} must be of type ${type}`);
    }
    if (nestedCheck) {
      nestedCheck(obj[prop]);
    }
  }

  validateArray(arr, type, nestedCheck = null) {
    if (!Array.isArray(arr)) {
      throw new TypeError("Array expected");
    }
    arr.forEach((item) => {
      if (typeof item !== "object" || Array.isArray(item)) {
        throw new TypeError("Object expected within array");
      }
      nestedCheck(item);
    });
  }

  validateArrayWithSinglePrimary(items, itemName) {
    this.validateArray(items, "object", (item) => {
      this.validateProperty(item, itemName, "string");
      this.validateProperty(item, "primary", "boolean");
      for (const prop in item) {
        if (prop !== itemName && prop !== "primary") {
          throw new Error(`Invalid property in '${itemName}s': ${prop}`);
        }
      }
    });

    const primaryCount = items.reduce((count, item) => {
      return count + (item.primary ? 1 : 0);
    }, 0);

    if (primaryCount !== 1) {
      throw new Error(
        `Exactly one 'primary' ${itemName} should be set to true`
      );
    }
  }
  s() {}
  validateEmails(emails) {
    this.validateArrayWithSinglePrimary(emails, "email");
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const emailSet = new Set();
    for (const emailObj of emails) {
      if (!emailObj.email.match(emailRegex)) {
        throw new Error("Invalid email format");
      }
      if (emailSet.has(emailObj.email)) {
        throw new Error(`Duplicate email: ${emailObj.email}`);
      }
      emailSet.add(emailObj.email);
    }
  }

  validatePhones(phones) {
    this.validateArrayWithSinglePrimary(phones, "phone");
    const emailRegex = /^(?:\+995\s?)?(?:5\d{2}\s?\d{2}\s?\d{2}\s?\d{2})$/;
    const phoneSet = new Set();
    for (const phoneObj of phones) {
      if (!phoneObj.phone.match(emailRegex)) {
        throw new Error("Invalid phone format");
      }
      if (phoneSet.has(phoneObj.phone)) {
        throw new Error(`Duplicate phone: ${phoneObj.phone}`);
      }

      phoneSet.add(phoneObj.phone);
    }
  }

  validateDateOfBirth(date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!date.match(dateRegex)) {
      throw new Error("Invalid date format for 'dateOfBirth', use YYYY-MM-DD");
    }
  }

  validateSubjects(subjects) {
    this.validateArray(subjects, "object", (subject) => {
      this.validateProperty(subject, "subject", "string");
      for (const prop in subject) {
        if (prop !== "subject") {
          throw new Error(`Invalid property in 'subjects': ${prop}`);
        }
      }
    });
  }
}
