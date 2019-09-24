const fs = require('fs');

const command = process.argv[2];
const title = process.argv[3];
const content = process.argv[4];

switch (command) {
  case 'list':
    list((error, notes) => {
      if (error) {
        return console.error(error.message);
      }
      notes.forEach((note, index) => {
        console.log(`${index + 1}. ${note.title}`);
      });
    });
    break;

  case 'view':
    view(title, (error, note) => {
      if (error) {
        return console.error(error.message);
      }

      console.log(`# ${note.title}\r\n\r\n---\r\n\r\n${note.content}`)
    });
    
    break;

  case 'create':
    create(title, content, error => {
      if (error) {
        return console.error(error.message);
      }

      console.log('Note is created');
    });
    break;

  case 'remove':
    remove(title, error => {
      if (error) {
        return console.error(error.message);
      }

      console.log('Note is deleted');
    });
    break;

  default:
   console.log('unknown command');
}

function list(done) {
  getDataFromFile(done);
}

function view(title, done) {
  getDataFromFile((error, notes) => {
    if (error) {
      return done(error)
    }

    const note = notes.find(note => note.title === title);
    if (!note) {
      return done(new Error('Note is not found'))
    }
    done(null, note);
  })
}

function create(title, content, done) {
  getDataFromFile((error, notes) => {
    if (error) {
      return done(error)
    }

    notes.push({title, content});

    saveDataInFile(notes, done)
  })
}

function remove(title, done) {
  getDataFromFile((error, notes) => {
    if (error) {
      return done(error)
    }

    notes = notes.filter(note => note.title !== title);

    saveDataInFile(notes, done);

  })
}

function getDataFromFile(done) {
  fs.readFile('notes.json', (error, data) => {
    if (error) {
      if (error.code === 'ENOENT') { // file notes.json dosn't exist yet
        return done(null, []);
      } else {
        return done(error)
      }
    }

    try {
      const notes = JSON.parse(data);
      done(null, notes);
    } catch (error) {
      done(new Error('something wrong with json file'))
    }
  })
}

function saveDataInFile(notes, done) {
  try {
    const json = JSON.stringify(notes);
    fs.writeFile('notes.json', json, error => {
      if (error) {
        return done(error)
      }

      done();
    })
  } catch (error) {
    done(error)
  }
}
