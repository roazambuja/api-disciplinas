import crypto from "crypto";

const subjectRepository = () => {
  const subjects = [];

  const create = ({ name, hours, isMandatory }) => {
    const newSubject = {
      id: crypto.randomUUID(),
      name,
      hours,
      isMandatory,
    };
    subjects.push(newSubject);
    return newSubject;
  };

  const list = (name = "") => {
    return subjects.filter((subject) => {
      return subject.name.toLowerCase().includes(name.toLowerCase());
    });
  };

  const findById = (id) => {
    return subjects.find((subject) => subject.id === id);
  };

  const update = (id, data) => {
    const subject = subjects.find((subject) => subject.id === id);
    if (!subject) return null;
    subject.name = data.name;
    subject.hours = data.hours;
    subject.isMandatory = data.isMandatory;
    return subject;
  };

  const remove = (id) => {
    const index = subjects.findIndex((subject) => subject.id === id);
    if (index === -1) return false;
    subjects.splice(index, 1);
    return true;
  };

  return {
    create,
    list,
    findById,
    update,
    remove,
  };
};

export default subjectRepository;
