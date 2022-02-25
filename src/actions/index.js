// keys for actiontypes
export const ActionTypes = {
  FETCH_TREES: 'FETCH_TREES',
  FETCH_TREE: 'FETCH_TREE',
  UPDATE_TREE: 'UPDATE_TREE',
  CREATE_NODE: 'CREATE_NODE',
  // PRUNE: 'PRUNE',
};

export function fetchTrees() {/* axios get */}

export function fetchTree(id) {/* axios get */}

export function createTree(tree, history) {/* axios post */}

export function updateTree(tree) {/* axios put */}

// export function prune(id, history) {/* axios delete */}
