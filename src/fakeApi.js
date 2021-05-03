import contacts from "./db.json";

let count = 0;
const fakeApiRequest = {
  findMatchPhrase(phrase, delay) {
    console.log("phrase", phrase, count++);
    const found = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(phrase.toLowerCase())
    );
    return this.fakeResponse(found, 100);
  },

  fakeResponse(data, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data);
      }, delay);
    });
  }
};

export default fakeApiRequest;
