/* Refer to https://github.com/OleksiyRudenko/a-tiny-JS-world for the task details
   Complete the below for code reviewers' convenience:

   Code repository: _put repo URL here_
   Web app: _put project's github pages URL here_
   */

// ======== OBJECTS DEFINITIONS ========
function createInhab(nature, gender, name, says, legs, hands, friendlyTo) {
  return {
    nature: nature,
    gender: gender,
    name: name,
    says: says,
    legs: legs,
    hands: hands,
    friendlyTo: friendlyTo.join(' and ')
  }
};

const cat = createInhab('cat', 'female', 'Jessy', 'Wanna eat!', 4, 0, ['Justin']);
const dog = createInhab('dog', 'male', 'Kim', 'Awa-waw!', 4, 0, ['Justin', 'Kate']);
const woman = createInhab('woman', 'female', 'Kate', 'I need hugs!', 2, 2, ['Kim', 'Justin']);
const man = createInhab('man', 'male', 'Justin', 'I love comics.', 2, 2, ['Kim', 'Jessy', 'Kate']);

// ======== OUTPUT ========
function printInh(obj) {
  print(obj.name + ' is a ' + obj.nature + '. Sometime says: ' + obj.says + ' has ' + obj.legs + ' legs, ' + obj.hands + ' hands.' + ' Friendly with ' + obj.friendlyTo + '. ' + obj.gender + ', as you may guess.');
}

printInh(cat);
printInh(dog);
printInh(man);
printInh(woman);
