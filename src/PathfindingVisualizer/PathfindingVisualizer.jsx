import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../PathfindingVisualizer/algorithms/dijkstra';
import './PathfindingVisualizer.css';

import '../PathfindingVisualizer/PathfindingVisualizer.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  generateRandomMaze() {
    const { grid } = this.state;
    const newGrid = grid.slice();
  
    for (let row = 0; row < newGrid.length; row++) {
      for (let col = 0; col < newGrid[row].length; col++) {
        if (Math.random() < 0.3) { // 30% chance of being a wall
          if (!(row === START_NODE_ROW && col === START_NODE_COL) && !(row === FINISH_NODE_ROW && col === FINISH_NODE_COL)) {
            newGrid[row][col].isWall = true;
          }
        }
      }
    }
  
    this.setState({ grid: newGrid });
  }

  

  visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  resetBoard() {
    const grid = getInitialGrid();
    this.setState({ grid });
  
    // Reset visual state of all nodes
    for (let row = 0; row < 18; row++) {
      for (let col = 0; col < 46; col++) {
        const nodeClassName = document.getElementById(`node-${row}-${col}`).className;
  
        if (nodeClassName === 'node node-visited' || nodeClassName === 'node node-shortest-path') {
          document.getElementById(`node-${row}-${col}`).className = 'node';
        }
      }
    }
    
    // Specifically set the start and finish nodes to their respective classes
    document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className = 'node node-start';
    document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className = 'node node-finish';
  }
  
  
  
  

  render() {
    const {grid, mouseIsPressed} = this.state;
  
    return (
      <>
        <button onClick={() => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>
        <button onClick={() => this.generateRandomMaze()}>
          Generate Random Maze
        </button>
        <button onClick={() => this.resetBoard()}>
          Reset Board
        </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 18; row++) {
    const currentRow = [];
    for (let col = 0; col < 46; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};