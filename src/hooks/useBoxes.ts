import { useQuery, useMutation } from '@apollo/client';
import {
  GetRootBoxesDocument,
  GetChildBoxesDocument,
  CreateBoxDocument,
  UpdateBoxDocument,
  RemoveBoxDocument,
  BoxInput,
  BoxUpdateInput,
} from '../generated/graphql';

// Hook for getting paginated boxes - will be implemented when backend supports it
// export const useBoxes = (query: BoxesQueryDto) => {
//   return useQuery(GetBoxesDocument, {
//     variables: { query },
//     errorPolicy: 'all',
//   });
// };

// Hook for getting root boxes (boxes without parent)
export const useRootBoxes = () => {
  return useQuery(GetRootBoxesDocument, {
    errorPolicy: 'all',
  });
};

// Hook for getting child boxes (children of a specific box)
export const useChildBoxes = (parentBoxId: number) => {
  return useQuery(GetChildBoxesDocument, {
    variables: { parentBoxId },
    errorPolicy: 'all',
    skip: !parentBoxId,
  });
};

// Hook for getting box hierarchy - will be implemented when backend supports it
// export const useBoxHierarchy = (boxId: number) => {
//   return useQuery(GetBoxHierarchyDocument, {
//     variables: { boxId },
//     errorPolicy: 'all',
//     skip: !boxId,
//   });
// };

// Hook for getting a single box with full details - will be implemented when backend supports it
// export const useBox = (id: number) => {
//   return useQuery(GetOneBoxDocument, {
//     variables: { id },
//     errorPolicy: 'all',
//     skip: !id,
//   });
// };

// Hook for creating a box
export const useCreateBox = () => {
  const [createBox, { loading, error }] = useMutation(CreateBoxDocument, {
    refetchQueries: [GetRootBoxesDocument],
    errorPolicy: 'all',
  });

  const createBoxHandler = async (input: BoxInput) => {
    try {
      const result = await createBox({
        variables: { input },
      });
      return result.data?.createBox;
    } catch (err) {
      console.error('Error creating box:', err);
      throw err;
    }
  };

  return {
    createBox: createBoxHandler,
    loading,
    error,
  };
};

// Hook for updating a box
export const useUpdateBox = () => {
  const [updateBox, { loading, error }] = useMutation(UpdateBoxDocument, {
    refetchQueries: [GetRootBoxesDocument],
    errorPolicy: 'all',
  });

  const updateBoxHandler = async (id: number, input: BoxUpdateInput) => {
    try {
      const result = await updateBox({
        variables: { id, input },
      });
      return result.data?.updateBox;
    } catch (err) {
      console.error('Error updating box:', err);
      throw err;
    }
  };

  return {
    updateBox: updateBoxHandler,
    loading,
    error,
  };
};

// Hook for removing a box
export const useRemoveBox = () => {
  const [removeBox, { loading, error }] = useMutation(RemoveBoxDocument, {
    refetchQueries: [GetRootBoxesDocument],
    errorPolicy: 'all',
  });

  const removeBoxHandler = async (id: number) => {
    try {
      const result = await removeBox({
        variables: { id },
      });
      return result.data?.removeBox;
    } catch (err) {
      console.error('Error removing box:', err);
      throw err;
    }
  };

  return {
    removeBox: removeBoxHandler,
    loading,
    error,
  };
};
