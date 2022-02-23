import React from 'react';
import TreeListComponent from './tree-list-component';

function TreeList(props) {
  const treeList = props.trees.map((tree) => {
    return <TreeListComponent key={tree} title={tree.title} />;
  });

  return (
    <div id="tree-list" className="vertical-container container">
      {treeList}
    </div>
  );
}

/* const TreeList = (props) => {
  return (
    <div id="tree-list" className="vertical-container container">
      <TreeListComponent />
      <TreeListComponent />
      <TreeListComponent />
      <TreeListComponent />
      <TreeListComponent />
    </div>
  );
};
 */
export default TreeList;
