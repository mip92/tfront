'use client';

import React from 'react';
import { WarehouseVisualization } from '../../components/WarehouseVisualization';

export const WarehouseClient: React.FC = () => {
  return (
    <div id="main-content" className="container mx-auto px-6 py-6">
      <WarehouseVisualization />
    </div>
  );
};
