/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable class-methods-use-this */
import React from "react";
import Xarrow, { useXarrow, Xwrapper } from 'react-xarrows';
import Draggable from "react-draggable";
import TreeNode from "./tree-node";


const TreeNode2 = ({id}) => {
    const updateXarrow = useXarrow();
    return (
        <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
            <span id={id} className="dot"><img src={'/Users/clairecollins/Desktop/CS/bloom/src/favicon.png'} draggable="false" alt="temp" className="round-img" /></span>
        </Draggable>
    );
  };

class Tree extends React.Component {
    constructor(props) {
        super(props);
      }
      
      getEdges(tree, l, t, i, pref){
        const inputstyle = {position: 'absolute',
            top: t,
            left: l,
        };
        if(tree){
            if (pref){
                console.log("pref works");
                if(tree.root.rec){
                    return <div><div style={inputstyle}><TreeNode2 id={tree.root.name}/></div> <Xarrow start={pref} end={tree.root.name} zIndex={3} showHead={false} dashness={true} color={'gray'}/> {this.getEdges(tree.left, l-i, t+150,i/2, tree.root.name)} {this.getEdges(tree.right, l+i,t+150,i/2,tree.root.name)}</div>;
                }
                else {
                    return  <div><div style={inputstyle}><TreeNode2 id={tree.root.name}/></div> <Xarrow start={pref} end={tree.root.name} zIndex={3} showHead={false} color={'#637B47'}/> {this.getEdges(tree.left, l-i, t+150,i/2, tree.root.name)} {this.getEdges(tree.right, l+i,t+150,i/2,tree.root.name)}</div>;
                }
            }
            else{
                return  <div><div style={inputstyle}><TreeNode2 id={tree.root.name}/></div> {this.getEdges(tree.left, l-i, t+150,i/2,tree.root.name)} {this.getEdges(tree.right, l+i,t+150,i/2,tree.root.name)}</div>;
            }
        }
        else{
            return ;
        }
      }

    render() {
        var t ={
            root:{
                name:'a',
                rec:false,
            },
            left:{
                root:{
                    name:'b'},
                        left:{root:{
                        name:'d',
                        rec:false,},
                        left:null,
                        right:null,               
                        },
                    right:{root:{
                        name:'e',
                        rec:true,},
                        left:null,
                        right:null,               
                    },               
                },
            right:{
                root:{
                    name:'c'},
                        left:{root:{
                        name:'f',
                        rec:false,},
                        left:null,
                        right:null,               
                        },
                    right:{root:{
                        name:'g',
                        rec:false,},
                        left:null,
                        right:null,               
                    },               
                },
            };
        var w = window.innerWidth;
        var h = window.innerHeight;
        return(
            <div style={{display: 'flex', justifyContent: 'space-evenly', width: '100%'}}>
            <Xwrapper>
            {this.getEdges(t,w/2,100,w/4, null)}
            </Xwrapper>
            </div>
        );
    }
}

export default Tree;
