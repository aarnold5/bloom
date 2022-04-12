import axios from 'axios';

// keys for actiontypes
export const ActionTypes = {
  FETCH_TREES: 'FETCH_TREES',
  FETCH_TREE: 'FETCH_TREE',
  UPDATE_TREE: 'UPDATE_TREE',
  CREATE_TREE: 'CREATE_TREE',
  // PRUNE: 'PRUNE',
};
const ROOT_URL = 'https://us-central1-bloom-838b5.cloudfunctions.net/songnamequerier';

export function fetchTrees(params) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/trees`, { params })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_TREES, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function fetchTree(id, params) { /* axios get */
  return (dispatch) => {
    axios.get(`${ROOT_URL}/trees/${id}`, { params })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_TREE, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function createTree(node, history) { /* axios post */
  // const fields = {
  //  title: '', content: '', coverUrl: '', tags: '',
  // };
  return (dispatch) => {
    axios.post(`${ROOT_URL}/trees`, node, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.CREATE_TREE, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

export function updateTree(tree) { /* axios put */
  return (dispatch) => {
    const { id } = tree;
    axios.put(`${ROOT_URL}/trees/${id}`, tree, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.FETCH_TREES, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.ERROR_SET, error });
      });
  };
}

// export function prune(id, history) {/* axios delete */}
