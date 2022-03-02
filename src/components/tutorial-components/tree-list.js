import React from 'react';
import TreeListComponent from './tree-list-component';

function TreeList(props) {
  const treeList = props.trees.map((tree) => {
    return <TreeListComponent key={tree.id} title={tree.title} />;
  });

  return (
    <div id="tree-list" className="vertical-container container">
      {console.log(props.trees)}
      {treeList}
    </div>
  );
}

export default TreeList;
