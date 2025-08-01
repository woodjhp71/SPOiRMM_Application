import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Player {
  id: string;
  name: string;
  role: string;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface Tool {
  id: string;
  name: string;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface StarChartProps {
  width?: number;
  height?: number;
  className?: string;
}

const StarChart: React.FC<StarChartProps> = ({ 
  width = 600, 
  height = 400, 
  className = '' 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Mock data for the star chart
  const players: Player[] = [
    { id: '1', name: 'Jane Doe', role: 'Coordinator', x: 0.3, y: 0.3, size: 8, color: '#3B82F6' },
    { id: '2', name: 'John Smith', role: 'Sponsor', x: 0.7, y: 0.2, size: 10, color: '#10B981' },
    { id: '3', name: 'Sarah Wilson', role: 'Member', x: 0.2, y: 0.6, size: 6, color: '#F59E0B' },
    { id: '4', name: 'Mike Johnson', role: 'Member', x: 0.8, y: 0.7, size: 6, color: '#EF4444' },
    { id: '5', name: 'Lisa Chen', role: 'Member', x: 0.5, y: 0.8, size: 6, color: '#8B5CF6' }
  ];

  const tools: Tool[] = [
    { id: '1', name: 'Jurisdiction', x: 0.2, y: 0.2, size: 12, color: '#A855F7' },
    { id: '2', name: 'Market', x: 0.8, y: 0.3, size: 10, color: '#F97316' },
    { id: '3', name: 'Enterprise', x: 0.3, y: 0.7, size: 14, color: '#14B8A6' },
    { id: '4', name: 'Organisation', x: 0.7, y: 0.6, size: 11, color: '#60A5FA' },
    { id: '5', name: 'Agreements', x: 0.5, y: 0.4, size: 9, color: '#2563EB' },
    { id: '6', name: 'Resources', x: 0.9, y: 0.8, size: 8, color: '#D97706' }
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, 1])
      .range([0, chartWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, 1])
      .range([chartHeight, 0]);

    // Add background grid
    const gridSize = 0.2;
    for (let i = 0; i <= 5; i++) {
      const pos = i * gridSize;
      
      // Vertical lines
      g.append('line')
        .attr('x1', xScale(pos))
        .attr('y1', 0)
        .attr('x2', xScale(pos))
        .attr('y2', chartHeight)
        .attr('stroke', '#E5E7EB')
        .attr('stroke-width', 1)
        .attr('opacity', 0.5);

      // Horizontal lines
      g.append('line')
        .attr('x1', 0)
        .attr('y1', yScale(pos))
        .attr('x2', chartWidth)
        .attr('y2', yScale(pos))
        .attr('stroke', '#E5E7EB')
        .attr('stroke-width', 1)
        .attr('opacity', 0.5);
    }

    // Add tool nodes
    g.selectAll('.tool-node')
      .data(tools)
      .enter()
      .append('circle')
      .attr('class', 'tool-node')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', d => d.size)
      .attr('fill', d => d.color)
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 2)
      .attr('opacity', 0.8);

    // Add tool labels
    g.selectAll('.tool-label')
      .data(tools)
      .enter()
      .append('text')
      .attr('class', 'tool-label')
      .attr('x', d => xScale(d.x))
      .attr('y', d => yScale(d.y) + d.size + 15)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', '#374151')
      .text(d => d.name);

    // Add player nodes
    g.selectAll('.player-node')
      .data(players)
      .enter()
      .append('circle')
      .attr('class', 'player-node')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', d => d.size)
      .attr('fill', d => d.color)
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 2)
      .attr('opacity', 0.9);

    // Add player labels
    g.selectAll('.player-label')
      .data(players)
      .enter()
      .append('text')
      .attr('class', 'player-label')
      .attr('x', d => xScale(d.x))
      .attr('y', d => yScale(d.y) - d.size - 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', '9px')
      .attr('fill', '#374151')
      .attr('font-weight', '500')
      .text(d => d.name);

    // Add role labels
    g.selectAll('.role-label')
      .data(players)
      .enter()
      .append('text')
      .attr('class', 'role-label')
      .attr('x', d => xScale(d.x))
      .attr('y', d => yScale(d.y) - d.size - 18)
      .attr('text-anchor', 'middle')
      .attr('font-size', '8px')
      .attr('fill', '#6B7280')
      .text(d => d.role);

    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 120}, 20)`);

    // Tool legend
    legend.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', '12px')
      .attr('font-weight', '600')
      .attr('fill', '#374151')
      .text('Tools');

    legend.append('circle')
      .attr('cx', 0)
      .attr('cy', 15)
      .attr('r', 6)
      .attr('fill', '#A855F7');

    legend.append('text')
      .attr('x', 15)
      .attr('y', 20)
      .attr('font-size', '10px')
      .attr('fill', '#6B7280')
      .text('Tools');

    // Player legend
    legend.append('text')
      .attr('x', 0)
      .attr('y', 45)
      .attr('font-size', '12px')
      .attr('font-weight', '600')
      .attr('fill', '#374151')
      .text('Players');

    legend.append('circle')
      .attr('cx', 0)
      .attr('cy', 60)
      .attr('r', 6)
      .attr('fill', '#3B82F6');

    legend.append('text')
      .attr('x', 15)
      .attr('y', 65)
      .attr('font-size', '10px')
      .attr('fill', '#6B7280')
      .text('Players');

  }, [width, height]);

  return (
    <div className={`star-chart ${className}`}>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="w-full h-full"
      >
        {/* SVG content will be populated by D3.js */}
      </svg>
    </div>
  );
};

export default StarChart; 