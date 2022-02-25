import axios from 'axios';

const API_URL = ' https://us-central1-bloom-838b5.cloudfunctions.net/songnamequerier';


const bloomSearch = (term) => {
  const params = {
    part: 'snippet',
    'Content-Type': 'application/json',
    data: { 
        query: term
    }
  };

  return new Promise((resolve, reject) => {
    axios.get(API_URL, { params })
      .then(response => {
        resolve(response.data.results);
      })
      .catch(error => {
        console.log(`bloom api error: ${error}`);
        reject(error);
      });
  });
};

export default bloomSearch;