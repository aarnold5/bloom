import React from 'react';
import TreeListComponent from './tree-list-component';

function TreeList(props) {

  const treeList = props.trees.name.entrySeq().map(([id, tree]) => {
    return <TreeListComponent title={tree.title} />;
  });

  return (
    <div id="tree-list" className="vertical-container container">
      {treeList}
    </div>
  );
}

export default TreeList;
