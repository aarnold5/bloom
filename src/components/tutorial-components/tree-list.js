import React from 'react';
import TreeListComponent from './tree-list-component';
import { fetchTrees } from '../../services/firestore';

function TreeList(props) {
  fetchTrees((trees) => {
    //set treelist and update it somehow
  });

  const treeList = props.trees.name.entrySeq().map(([id, tree]) => {
    return <TreeListComponent title={tree.title} />;
  });

  return (
    <div id="tree-list" className="vertical-container container">
      <p></p>
      {treeList}
    </div>
  );
}

export default TreeList;
