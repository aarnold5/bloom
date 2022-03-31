import axios from 'axios';
/* eslint-disable import/prefer-default-export */

export const bloomSearch = (term) => {
  const fields = {
    query: term,
  };
  return new Promise((resolve, reject) => {
    axios.post('https://us-central1-bloom-838b5.cloudfunctions.net/songnamequerier', fields, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        resolve(response.data.results);
      })
      .catch((error) => {
        console.log(`api error: ${error}`);
        reject(error);
      });
  });
};
