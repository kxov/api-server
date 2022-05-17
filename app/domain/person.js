'use strict';

function Person(name, birth) {
  this.name = name;
  this.birth = birth;
}

Person.prototype.age = function () {
  const difference = new Date() - new Date(this.birth);
  return Math.floor(difference / 31536000000);
};

Person.prototype.toJSON = function () {
  return { name: this.name, age: this.age() };
};

Person.from = function (obj) {
  const { name, birth } = obj;
  return new Person(name, birth);
};

module.exports = { Person };
