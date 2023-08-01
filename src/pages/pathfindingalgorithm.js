import React from 'react';
import PathfindingVisualizer from '../PathfindingVisualizer/PathfindingVisualizer';
import { Link } from 'gatsby';
import '../PathfindingVisualizer/PathfindingVisualizer.css';

const pathfindingalgorithm = () => (
  <div>
    <h1>Pathfinding Algorithm Visualizer Project</h1>
    <PathfindingVisualizer />
    <Link to="/pathfindingVisualizer">Go to Pathfinding Visualizer</Link>
  </div>
);

export default pathfindingalgorithm;
