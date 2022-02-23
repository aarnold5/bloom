/* eslint-disable react/function-component-definition */
import React from 'react';

const TreeListComponent = (props) => {
  return (
    <button type="button" className="tree-list-component home-page-button container">
      {props.title}
    </button>
  );
};

export default TreeListComponent;
