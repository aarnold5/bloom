/* eslint-disable react/function-component-definition */
import React from 'react';

const TreeListComponent = (props) => {
  if (props.tree.id !== props.currTreeId) {
    return (
      <button type="button" key={props.tree.id} id={props.tree.id} className="tree-list-component home-page-button container non-chosen-button" onClick={props.onSelectDifferentTree}>
        {props.tree.name}
      </button>
    );
  }
  return ( // renders all other buttons as a disabled button
    <button type="button" key={props.tree.id} id={props.tree.id} style={{ overflowWrap: false }} className="tree-list-component home-page-button container" onClick={props.onSelectDifferentTree}>
      {props.tree.name}
    </button>
  );
};

export default TreeListComponent;
