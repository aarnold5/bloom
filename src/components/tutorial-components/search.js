/* eslint-disable import/prefer-default-export */
import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const bloomSearch = (term) => {
  const fields = {
    query: term,
  };
  return new Promise((resolve, reject) => {
    axios.post('https://us-central1-bloom-838b5.cloudfunctions.net/songnamequerier', fields, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        // console.log(response.data.results);
        resolve(response.data.results);
      })
      .catch((error) => {
        console.log(`api error: ${error}`);
        reject(error);
      });
  });
};

/*
export const bloomSearch = (term) => {
  const fields = {
    query: term,
  };
  axios.post('https://us-central1-bloom-838b5.cloudfunctions.net/songnamequerier', fields, {
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      // console.log(response.data.results);
      return (response.data.results);
    })
    .catch((error) => {
      console.log(`api error: ${error}`);
      return (error);
    });
};
 */
