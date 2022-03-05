import React from 'react';
import TreeListComponent from './tree-list-component';

function TreeList(props) {
  const treeList = props.trees.map((tree) => {
    return <TreeListComponent key={tree.id} title={tree.title} />;
  });

  return (
    <div id="tree-list" className="vertical-container container">
      {treeList}
    </div>
  );
}

export default TreeList;
