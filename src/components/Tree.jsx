import React, { Component } from 'react';
import { Tree } from 'antd';

const TreeNode = Tree.TreeNode;

class TreeItem extends Component{
    onSelect(selectedKeys, info){
        //返回节点属性
        let nodeInfo = info.selectedNodes[0].props || null
        let {onSelect} = this.props
        return onSelect ? onSelect(nodeInfo) : null
    }
    onCheck(selectedKeys, info){
        let nodeInfo = info.checkedNodes;
        let checkedIds = nodeInfo.map(item=>{
            return item.props.id
        })
        let halfChecked = info.halfCheckedKeys || [];
        checkedIds = checkedIds.concat(halfChecked)
        checkedIds = checkedIds.map(item =>{
            return parseInt(item)
        })
        
        let {onCheck} = this.props
        return onCheck ? onCheck(nodeInfo,checkedIds) : null
    }
    render(){
        const {children} = this.props
        const createItem = (node,i)=>{
            if(node.children){
                return(
                    <TreeNode title={node.name} name={node.name} key={node.id} text={node.text} parentId={node.parentId} id={node.id} menu={node.menu} sort={node.sort}>
                        {node.children.map(createItem)}
                    </TreeNode>
                )
            }else{
                return (
                    <TreeNode title={node.name} name={node.name} key={node.id} text={node.text} parentId={node.parentId} id={node.id} menu={node.menu} sort={node.sort}/>
                )
            }
        }

        let Item = null
        if(children){
            Item = children.map(createItem)
        }
        return(
            <Tree
                showLine={this.props.showLine}
                checkable={this.props.checkable}
                onSelect={this.onSelect.bind(this)}
                onCheck={this.onCheck.bind(this)}
                checkedKeys={this.props.checkedKeys}
            >
                {Item}
            </Tree>
        )
    }
}

export default TreeItem