'use client';

import React, { useState, useEffect } from 'react';
import { Box } from '../generated/graphql';
import { useRootBoxes, useRemoveBox } from '../hooks/useBoxes';
import { useApolloClient } from '@apollo/client';
import { GetChildBoxesDocument } from '../generated/graphql';
import { Card } from './ui/card';
import LoadingSpinner from './LoadingSpinner';
import { BoxActionsMenu } from './BoxActionsMenu';
import { Package, Package2, ShoppingCart } from 'lucide-react';
import { useBreadcrumbs } from '../contexts/BreadcrumbsContext';

interface BoxNode extends Omit<Box, 'childBoxesCount' | 'inventoryItems'> {
  children?: BoxNode[];
  isExpanded?: boolean;
  level?: number;
  childBoxesCount?: number;
  inventoryItems?: Array<{
    id: number;
    quantity: number;
    product: {
      id: number;
      name: string;
    };
  }>;
}

interface WarehouseVisualizationProps {
  className?: string;
}

export const WarehouseVisualization: React.FC<WarehouseVisualizationProps> = ({
  className = '',
}) => {
  const [boxTree, setBoxTree] = useState<BoxNode[]>([]);
  const [expandedBoxes, setExpandedBoxes] = useState<Set<number>>(new Set());
  const [loadingBoxes, setLoadingBoxes] = useState<Set<number>>(new Set());
  const [currentPath, setCurrentPath] = useState<BoxNode[]>([]);
  const { setBreadcrumbs } = useBreadcrumbs();

  const {
    data: rootBoxesData,
    loading: rootLoading,
    error: rootError,
  } = useRootBoxes();
  const apolloClient = useApolloClient();
  const { removeBox } = useRemoveBox();

  useEffect(() => {
    if (rootBoxesData?.rootBoxes) {
      const rootBoxesWithLevel = rootBoxesData.rootBoxes.map((box: Box) => ({
        ...box,
        level: 0,
        isExpanded: false,
        childBoxesCount: box.childBoxesCount || 0,
        inventoryItems: box.inventoryItems || [],
      }));
      setBoxTree(rootBoxesWithLevel);
      setCurrentPath([]);
    }
  }, [rootBoxesData]);

  // Update breadcrumbs when currentPath changes
  useEffect(() => {
    const breadcrumbItems = [
      { label: 'Warehouse', href: '/warehouse', isActive: false },
      ...currentPath.map((box, index) => ({
        label: box.name || `Box ${box.id}`,
        href: undefined,
        isActive: index === currentPath.length - 1,
      })),
    ];
    setBreadcrumbs(breadcrumbItems);
  }, [currentPath, setBreadcrumbs]);

  const handleDeleteBox = async (boxId: number) => {
    try {
      await removeBox(boxId);
      setBoxTree(prev => {
        const removeBoxFromTree = (boxes: BoxNode[]): BoxNode[] => {
          return boxes.filter(box => {
            if (box.id === boxId) {
              return false;
            }
            if (box.children) {
              return {
                ...box,
                children: removeBoxFromTree(box.children),
              };
            }
            return true;
          });
        };
        return removeBoxFromTree(prev);
      });
    } catch (error: unknown) {
      console.error('Error deleting box:', error);

      // Check if it's a GraphQL error about child boxes
      if (
        error &&
        typeof error === 'object' &&
        'graphQLErrors' in error &&
        Array.isArray((error as { graphQLErrors: unknown[] }).graphQLErrors) &&
        (
          error as { graphQLErrors: Array<{ message?: string }> }
        ).graphQLErrors[0]?.message?.includes('child boxes')
      ) {
        alert(
          'Cannot delete this box because it contains child boxes. Please delete or move the child boxes first.'
        );
      } else {
        alert('Failed to delete box. Please try again.');
      }
    }
  };

  const handleEditBox = (boxId: number) => {
    console.log('Edit box:', boxId);
    // TODO: Implement edit box functionality
  };

  const handleCopyBox = (boxId: number) => {
    console.log('Copy box:', boxId);
    // TODO: Implement copy box functionality
  };

  const handleMoveBox = (boxId: number) => {
    console.log('Move box:', boxId);
    // TODO: Implement move box functionality
  };

  // const handleBreadcrumbClick = (boxId: number) => {
  //   // Find the box in the current path and navigate to it
  //   const boxIndex = currentPath.findIndex(box => box.id === boxId);
  //   if (boxIndex >= 0) {
  //     // Navigate to this box level
  //     setCurrentPath(prev => prev.slice(0, boxIndex + 1));

  //     // Update expanded boxes to show only up to this level
  //     const newExpandedBoxes = new Set<number>();
  //     for (let i = 0; i <= boxIndex; i++) {
  //       newExpandedBoxes.add(currentPath[i].id);
  //     }
  //     setExpandedBoxes(newExpandedBoxes);
  //   }
  // };

  const loadNestedBoxes = async (parentBoxId: number, parentBox: BoxNode) => {
    if ((parentBox.childBoxesCount || 0) === 0) {
      return;
    }

    if (expandedBoxes.has(parentBoxId)) {
      // Collapse the box - go back to parent level
      setExpandedBoxes(prev => {
        const newSet = new Set(prev);
        newSet.delete(parentBoxId);
        return newSet;
      });

      // Update current path - remove this box and all its children
      setCurrentPath(prev => {
        const parentIndex = prev.findIndex(box => box.id === parentBoxId);
        if (parentIndex >= 0) {
          return prev.slice(0, parentIndex);
        }
        return prev;
      });
      return;
    }

    setLoadingBoxes(prev => new Set(prev).add(parentBoxId));

    try {
      const { data: childBoxesData, error } = await apolloClient.query({
        query: GetChildBoxesDocument,
        variables: { parentBoxId },
        fetchPolicy: 'network-only',
      });

      if (error) {
        console.error('GraphQL error:', error);
      } else if (childBoxesData?.childBoxes) {
        setBoxTree(prev => {
          const updateBoxTree = (boxes: BoxNode[]): BoxNode[] => {
            return boxes.map(box => {
              if (box.id === parentBoxId) {
                return {
                  ...box,
                  children: childBoxesData.childBoxes.map((child: Box) => ({
                    ...child,
                    level: (box.level || 0) + 1,
                    isExpanded: false,
                    childBoxesCount: child.childBoxesCount || 0,
                    inventoryItems: child.inventoryItems || [],
                  })),
                  isExpanded: true,
                };
              }
              if (box.children) {
                return {
                  ...box,
                  children: updateBoxTree(box.children),
                };
              }
              return box;
            });
          };
          return updateBoxTree(prev);
        });
      }

      setExpandedBoxes(prev => new Set(prev).add(parentBoxId));

      setCurrentPath(prev => [...prev, parentBox]);
    } catch (error) {
      console.error('Error loading nested boxes:', error);
    } finally {
      setLoadingBoxes(prev => {
        const newSet = new Set(prev);
        newSet.delete(parentBoxId);
        return newSet;
      });
    }
  };

  const renderBox = (box: BoxNode) => {
    const isExpanded = expandedBoxes.has(box.id);
    const isLoading = loadingBoxes.has(box.id);
    const hasChildren = (box.childBoxesCount || 0) > 0;

    return (
      <div
        key={box.id}
        className="relative"
        style={{
          marginLeft: `${(box.level || 0) * 20}px`,
        }}
      >
        <Card
          className={`
            p-4 mb-2 cursor-pointer transition-all duration-200 hover:shadow-md
            bg-white border-gray-200
            ${isLoading ? 'opacity-50' : ''}
          `}
          onClick={() => {
            loadNestedBoxes(box.id, box);
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {hasChildren ? (
                <Package2 className="h-5 w-5 text-blue-600" />
              ) : (
                <Package className="h-5 w-5 text-gray-600" />
              )}
              <div>
                <h3 className="font-medium text-gray-900">
                  <span className="text-gray-500 font-mono text-sm mr-2">
                    #{box.id}
                  </span>
                  {box.name}
                </h3>
                {box.description && (
                  <p className="text-sm text-gray-500 mb-1">
                    {box.description}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isLoading && <LoadingSpinner size="sm" />}
              {hasChildren && (
                <div className="text-xs text-blue-600 font-medium">
                  {box.childBoxesCount || 0} sub-box
                  {(box.childBoxesCount || 0) !== 1 ? 'es' : ''}
                </div>
              )}
              <BoxActionsMenu
                boxId={box.id}
                boxName={box.name || undefined}
                childBoxesCount={box.childBoxesCount || 0}
                onEdit={handleEditBox}
                onCopy={handleCopyBox}
                onMove={handleMoveBox}
                onDelete={handleDeleteBox}
              />
            </div>
          </div>
        </Card>

        {isExpanded && box.inventoryItems && box.inventoryItems.length > 0 && (
          <div className="ml-4">
            {box.inventoryItems.map(item => (
              <div
                key={item.id}
                style={{ marginLeft: (box.level || 0) * 20 + 20 }}
              >
                <Card className="p-4 mb-2 bg-white border-green-200 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <ShoppingCart className="h-5 w-5 text-green-600" />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Product ID: {item.product.id}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-700">
                          x{item.quantity}
                        </div>
                        <div className="text-xs text-gray-400">quantity</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}

        {isExpanded && box.children && (
          <div className="ml-4">
            {box.children.map(child => renderBox(child))}
          </div>
        )}
      </div>
    );
  };

  const renderCurrentView = () => {
    return (
      <div>
        {rootLoading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : rootError ? (
          <div className="text-center py-8 text-red-600">
            Error loading boxes: {rootError.message}
          </div>
        ) : (
          <div className="space-y-2">{boxTree.map(box => renderBox(box))}</div>
        )}
      </div>
    );
  };

  return (
    <div className={`warehouse-visualization ${className}`}>
      {renderCurrentView()}
    </div>
  );
};
