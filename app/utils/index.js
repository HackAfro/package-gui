import fs from 'fs';

const parsePackageFile = filePath =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          reject(err);
          throw new Error('That file does not exist');
        }
      }
      const parsedFile = JSON.parse(data);
      resolve(parsedFile);
    });
  });

export default parsePackageFile;
