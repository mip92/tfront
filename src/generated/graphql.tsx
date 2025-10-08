import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  access_token: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
  user: UserAuth;
};

export type Box = {
  __typename?: 'Box';
  boxTypeId?: Maybe<Scalars['Int']['output']>;
  childBoxes: Array<Box>;
  childBoxesCount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  inventoryItems: Array<InventoryItem>;
  name?: Maybe<Scalars['String']['output']>;
  parentBox?: Maybe<Box>;
  parentBoxId?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type BoxInput = {
  boxTypeId?: InputMaybe<Scalars['Int']['input']>;
  description: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isActive?: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  parentBoxId?: InputMaybe<Scalars['Int']['input']>;
  quantity?: Scalars['Int']['input'];
};

export type BoxType = {
  __typename?: 'BoxType';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type BoxTypeInput = {
  name: Scalars['String']['input'];
  quantity?: Scalars['Int']['input'];
  type: Scalars['String']['input'];
};

/** Поле для сортировки типов коробок */
export enum BoxTypeSortField {
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  Name = 'NAME',
  Quantity = 'QUANTITY',
  Type = 'TYPE',
  UpdatedAt = 'UPDATED_AT'
}

export type BoxTypeUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type BoxTypesQueryDto = {
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<BoxTypeSortField>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type BoxUpdateInput = {
  boxTypeId?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentBoxId?: InputMaybe<Scalars['Int']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type BoxWithBoxType = {
  __typename?: 'BoxWithBoxType';
  boxType?: Maybe<BoxType>;
  boxTypeId?: Maybe<Scalars['Int']['output']>;
  childBoxes: Array<Box>;
  childBoxesCount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  inventoryItems: Array<InventoryItem>;
  name?: Maybe<Scalars['String']['output']>;
  parentBox?: Maybe<Box>;
  parentBoxId?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Brand = {
  __typename?: 'Brand';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type BrandInput = {
  name: Scalars['String']['input'];
};

/** Поле для сортировки брендов */
export enum BrandSortField {
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  Name = 'NAME',
  UpdatedAt = 'UPDATED_AT'
}

export type BrandUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type BrandsQueryDto = {
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<BrandSortField>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type File = {
  __typename?: 'File';
  filename: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  order: Scalars['Int']['output'];
  productId?: Maybe<Scalars['Int']['output']>;
  s3Key: Scalars['String']['output'];
  type: FileType;
  url?: Maybe<Scalars['String']['output']>;
};

/** File type enum */
export enum FileType {
  Gallery = 'GALLERY',
  Main = 'MAIN',
  Thumbnail = 'THUMBNAIL'
}

export type ForgotPasswordInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type GoBackStepInput = {
  userId: Scalars['Float']['input'];
};

export type InventoryItem = {
  __typename?: 'InventoryItem';
  boxId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  date?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  product: Product;
  productId: Scalars['Int']['output'];
  purchasePrice: Scalars['Int']['output'];
  quantity: Scalars['Int']['output'];
  status?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type LoginInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  assignRole: User;
  assignRoleToUser: Role;
  createBox: Box;
  createBoxType: BoxType;
  createBrand: Brand;
  createProduct: ProductWithBrand;
  createRole: Role;
  createUser: User;
  deleteBoxType: BoxType;
  deleteBrand: Brand;
  deleteProduct: ProductWithBrand;
  deleteRole: Role;
  deleteUser: User;
  forgotPassword: MessageResponse;
  goBackStep: MessageResponse;
  login: AuthResponse;
  logout: Scalars['String']['output'];
  refreshToken: AuthResponse;
  removeBox: Box;
  removeRole: User;
  removeRoleFromUser: Role;
  resendCode: ResendCodeResponse;
  setPassword: SetPasswordResponse;
  setPersonalInfo: SetPersonalInfoResponse;
  startRegistration: StartRegistrationResponse;
  updateBox: Box;
  updateBoxType: BoxType;
  updateBrand: Brand;
  updateProduct: ProductWithBrand;
  updateRole: Role;
  updateUser: User;
  verifyCode: VerifyCodeResponse;
};


export type MutationAssignRoleArgs = {
  roleId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationAssignRoleToUserArgs = {
  roleId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationCreateBoxArgs = {
  input: BoxInput;
};


export type MutationCreateBoxTypeArgs = {
  input: BoxTypeInput;
};


export type MutationCreateBrandArgs = {
  input: BrandInput;
};


export type MutationCreateProductArgs = {
  input: ProductInput;
};


export type MutationCreateRoleArgs = {
  data: RoleInput;
};


export type MutationCreateUserArgs = {
  data: UserInput;
};


export type MutationDeleteBoxTypeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteBrandArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type MutationGoBackStepArgs = {
  input: GoBackStepInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRemoveBoxArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveRoleArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationRemoveRoleFromUserArgs = {
  roleId: Scalars['Int']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationResendCodeArgs = {
  input: ResendCodeInput;
};


export type MutationSetPasswordArgs = {
  input: SetPasswordInput;
};


export type MutationSetPersonalInfoArgs = {
  input: SetPersonalInfoInput;
};


export type MutationStartRegistrationArgs = {
  input: StartRegistrationInput;
};


export type MutationUpdateBoxArgs = {
  id: Scalars['Int']['input'];
  input: BoxUpdateInput;
};


export type MutationUpdateBoxTypeArgs = {
  id: Scalars['Int']['input'];
  input: BoxTypeUpdateInput;
};


export type MutationUpdateBrandArgs = {
  id: Scalars['Int']['input'];
  input: BrandUpdateInput;
};


export type MutationUpdateProductArgs = {
  id: Scalars['Int']['input'];
  input: ProductUpdateInput;
};


export type MutationUpdateRoleArgs = {
  data: RoleUpdateInput;
  id: Scalars['Int']['input'];
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  id: Scalars['Int']['input'];
};


export type MutationVerifyCodeArgs = {
  input: VerifyCodeInput;
};

export type PaginatedBoxTypesResponse = {
  __typename?: 'PaginatedBoxTypesResponse';
  rows: Array<BoxType>;
  total: Scalars['Float']['output'];
};

export type PaginatedBrandsResponse = {
  __typename?: 'PaginatedBrandsResponse';
  rows: Array<Brand>;
  total: Scalars['Int']['output'];
};

export type PaginatedProductsResponse = {
  __typename?: 'PaginatedProductsResponse';
  rows: Array<ProductGetAll>;
  total: Scalars['Int']['output'];
};

export type Product = {
  __typename?: 'Product';
  brandId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  type: ProductType;
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductGetAll = {
  __typename?: 'ProductGetAll';
  brand: Brand;
  brandId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  mainFile?: Maybe<File>;
  name: Scalars['String']['output'];
  type: ProductType;
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductInput = {
  brandId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  type: ProductType;
};

/** Поле для сортировки продуктов */
export enum ProductSortField {
  CreatedAt = 'CREATED_AT',
  Id = 'ID',
  Name = 'NAME',
  Type = 'TYPE',
  UpdatedAt = 'UPDATED_AT'
}

/** Тип продукта */
export enum ProductType {
  Cartridge = 'CARTRIDGE',
  Gel = 'GEL',
  Paint = 'PAINT',
  Transfer = 'TRANSFER'
}

export type ProductUpdateInput = {
  brandId?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ProductType>;
};

export type ProductWithBrand = {
  __typename?: 'ProductWithBrand';
  brand: Brand;
  brandId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  files?: Maybe<Array<File>>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  type: ProductType;
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductsQueryDto = {
  brandId?: InputMaybe<Scalars['Int']['input']>;
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ProductSortField>;
  sortOrder?: InputMaybe<SortOrder>;
  take?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<ProductType>;
};

export type Query = {
  __typename?: 'Query';
  boxType: BoxType;
  boxTypesWithPagination: PaginatedBoxTypesResponse;
  brand: Brand;
  brandsWithPagination: PaginatedBrandsResponse;
  childBoxes: Array<Box>;
  getOneBox: BoxWithBoxType;
  getProfile: UserAuth;
  product: ProductWithBrand;
  productsWithPagination: PaginatedProductsResponse;
  role?: Maybe<Role>;
  roleByName?: Maybe<Role>;
  roles?: Maybe<Array<Role>>;
  rootBoxes: Array<Box>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryBoxTypeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryBoxTypesWithPaginationArgs = {
  query: BoxTypesQueryDto;
};


export type QueryBrandArgs = {
  id: Scalars['Int']['input'];
};


export type QueryBrandsWithPaginationArgs = {
  query: BrandsQueryDto;
};


export type QueryChildBoxesArgs = {
  parentBoxId: Scalars['Int']['input'];
};


export type QueryGetOneBoxArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductsWithPaginationArgs = {
  query: ProductsQueryDto;
};


export type QueryRoleArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRoleByNameArgs = {
  name: RoleType;
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type ResendCodeInput = {
  userId: Scalars['Float']['input'];
};

export type ResendCodeResponse = {
  __typename?: 'ResendCodeResponse';
  canResendAt: Scalars['DateTime']['output'];
  message: Scalars['String']['output'];
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type RoleBasic = {
  __typename?: 'RoleBasic';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type RoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

/** Тип роли */
export enum RoleType {
  Admin = 'ADMIN',
  User = 'USER'
}

export type RoleUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type SetPasswordInput = {
  confirmPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SetPasswordResponse = {
  __typename?: 'SetPasswordResponse';
  access_token: Scalars['String']['output'];
  message: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
  step: Scalars['Float']['output'];
  user: UserAuth;
};

export type SetPersonalInfoInput = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
};

export type SetPersonalInfoResponse = {
  __typename?: 'SetPersonalInfoResponse';
  completed: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  step: Scalars['Float']['output'];
};

/** Порядок сортировки */
export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StartRegistrationInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type StartRegistrationResponse = {
  __typename?: 'StartRegistrationResponse';
  message: Scalars['String']['output'];
  method: Scalars['String']['output'];
  step: Scalars['Float']['output'];
  userId: Scalars['Float']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  role?: Maybe<RoleBasic>;
  roleId?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserAuth = {
  __typename?: 'UserAuth';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  role?: Maybe<RoleBasic>;
};

export type UserBasic = {
  __typename?: 'UserBasic';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  roleId?: InputMaybe<Scalars['Int']['input']>;
};

export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  roleId?: InputMaybe<Scalars['Int']['input']>;
};

export type VerifyCodeInput = {
  code: Scalars['String']['input'];
  userId: Scalars['Float']['input'];
};

export type VerifyCodeResponse = {
  __typename?: 'VerifyCodeResponse';
  message: Scalars['String']['output'];
  step: Scalars['Float']['output'];
  temp_token: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', access_token: string, refresh_token: string, user: { __typename?: 'UserAuth', id: number, email?: string | null, firstName?: string | null, lastName?: string | null, role?: { __typename?: 'RoleBasic', id: number, name: string } | null } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'AuthResponse', access_token: string, refresh_token: string } };

export type ForgotPasswordMutationVariables = Exact<{
  input: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'MessageResponse', message: string } };

export type StartRegistrationMutationVariables = Exact<{
  input: StartRegistrationInput;
}>;


export type StartRegistrationMutation = { __typename?: 'Mutation', startRegistration: { __typename?: 'StartRegistrationResponse', message: string, step: number, method: string, userId: number } };

export type VerifyCodeMutationVariables = Exact<{
  input: VerifyCodeInput;
}>;


export type VerifyCodeMutation = { __typename?: 'Mutation', verifyCode: { __typename?: 'VerifyCodeResponse', message: string, step: number, verified: boolean, temp_token: string } };

export type SetPasswordMutationVariables = Exact<{
  input: SetPasswordInput;
}>;


export type SetPasswordMutation = { __typename?: 'Mutation', setPassword: { __typename?: 'SetPasswordResponse', message: string, step: number, access_token: string, refresh_token: string, user: { __typename?: 'UserAuth', id: number, email?: string | null, phone?: string | null, firstName?: string | null, lastName?: string | null, role?: { __typename?: 'RoleBasic', id: number, name: string } | null } } };

export type SetPersonalInfoMutationVariables = Exact<{
  input: SetPersonalInfoInput;
}>;


export type SetPersonalInfoMutation = { __typename?: 'Mutation', setPersonalInfo: { __typename?: 'SetPersonalInfoResponse', message: string, step: number, completed: boolean } };

export type ResendCodeMutationVariables = Exact<{
  input: ResendCodeInput;
}>;


export type ResendCodeMutation = { __typename?: 'Mutation', resendCode: { __typename?: 'ResendCodeResponse', message: string } };

export type GoBackStepMutationVariables = Exact<{
  input: GoBackStepInput;
}>;


export type GoBackStepMutation = { __typename?: 'Mutation', goBackStep: { __typename?: 'MessageResponse', message: string } };

export type CreateBoxMutationVariables = Exact<{
  input: BoxInput;
}>;


export type CreateBoxMutation = { __typename?: 'Mutation', createBox: { __typename?: 'Box', id: number, name?: string | null, description?: string | null, parentBoxId?: number | null, boxTypeId?: number | null, createdAt: string, updatedAt: string } };

export type UpdateBoxMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: BoxUpdateInput;
}>;


export type UpdateBoxMutation = { __typename?: 'Mutation', updateBox: { __typename?: 'Box', id: number, name?: string | null, description?: string | null, parentBoxId?: number | null, boxTypeId?: number | null, createdAt: string, updatedAt: string } };

export type RemoveBoxMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RemoveBoxMutation = { __typename?: 'Mutation', removeBox: { __typename?: 'Box', id: number, name?: string | null, description?: string | null, parentBoxId?: number | null, boxTypeId?: number | null, createdAt: string, updatedAt: string } };

export type GetBoxTypeQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetBoxTypeQuery = { __typename?: 'Query', boxType: { __typename?: 'BoxType', id: number, name: string, quantity: number, type: string, createdAt: string, updatedAt: string } };

export type GetBoxTypesQueryVariables = Exact<{
  query: BoxTypesQueryDto;
}>;


export type GetBoxTypesQuery = { __typename?: 'Query', boxTypesWithPagination: { __typename?: 'PaginatedBoxTypesResponse', total: number, rows: Array<{ __typename?: 'BoxType', id: number, name: string, quantity: number, type: string, createdAt: string, updatedAt: string }> } };

export type GetRootBoxesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRootBoxesQuery = { __typename?: 'Query', rootBoxes: Array<{ __typename?: 'Box', id: number, name?: string | null, description?: string | null, parentBoxId?: number | null, boxTypeId?: number | null, createdAt: string, updatedAt: string, childBoxesCount: number, inventoryItems: Array<{ __typename?: 'InventoryItem', id: number, quantity: number, product: { __typename?: 'Product', id: number, name: string } }> }> };

export type GetChildBoxesQueryVariables = Exact<{
  parentBoxId: Scalars['Int']['input'];
}>;


export type GetChildBoxesQuery = { __typename?: 'Query', childBoxes: Array<{ __typename?: 'Box', id: number, name?: string | null, description?: string | null, parentBoxId?: number | null, boxTypeId?: number | null, createdAt: string, updatedAt: string, childBoxesCount: number, inventoryItems: Array<{ __typename?: 'InventoryItem', id: number, quantity: number, product: { __typename?: 'Product', id: number, name: string } }> }> };

export type GetBrandQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetBrandQuery = { __typename?: 'Query', brand: { __typename?: 'Brand', id: number, name: string, createdAt: string, updatedAt: string } };

export type GetBrandsQueryVariables = Exact<{
  query: BrandsQueryDto;
}>;


export type GetBrandsQuery = { __typename?: 'Query', brandsWithPagination: { __typename?: 'PaginatedBrandsResponse', total: number, rows: Array<{ __typename?: 'Brand', id: number, name: string, createdAt: string, updatedAt: string }> } };

export type GetProductQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', product: { __typename?: 'ProductWithBrand', id: number, name: string, brandId: number, createdAt: string, type: ProductType, updatedAt: string, brand: { __typename?: 'Brand', id: number, name: string } } };

export type GetProductsWithPaginationQueryVariables = Exact<{
  query: ProductsQueryDto;
}>;


export type GetProductsWithPaginationQuery = { __typename?: 'Query', productsWithPagination: { __typename?: 'PaginatedProductsResponse', total: number, rows: Array<{ __typename?: 'ProductGetAll', id: number, name: string, brandId: number, createdAt: string, type: ProductType, updatedAt: string, brand: { __typename?: 'Brand', id: number, name: string }, mainFile?: { __typename?: 'File', id: number, filename: string, s3Key: string, type: FileType, url?: string | null } | null }> } };

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', getProfile: { __typename?: 'UserAuth', id: number, email?: string | null, phone?: string | null, firstName?: string | null, lastName?: string | null, role?: { __typename?: 'RoleBasic', id: number, name: string } | null } };


export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    access_token
    refresh_token
    user {
      id
      email
      firstName
      lastName
      role {
        id
        name
      }
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation RefreshToken {
  refreshToken {
    access_token
    refresh_token
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($input: ForgotPasswordInput!) {
  forgotPassword(input: $input) {
    message
  }
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const StartRegistrationDocument = gql`
    mutation StartRegistration($input: StartRegistrationInput!) {
  startRegistration(input: $input) {
    message
    step
    method
    userId
  }
}
    `;
export type StartRegistrationMutationFn = Apollo.MutationFunction<StartRegistrationMutation, StartRegistrationMutationVariables>;

/**
 * __useStartRegistrationMutation__
 *
 * To run a mutation, you first call `useStartRegistrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startRegistrationMutation, { data, loading, error }] = useStartRegistrationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStartRegistrationMutation(baseOptions?: Apollo.MutationHookOptions<StartRegistrationMutation, StartRegistrationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartRegistrationMutation, StartRegistrationMutationVariables>(StartRegistrationDocument, options);
      }
export type StartRegistrationMutationHookResult = ReturnType<typeof useStartRegistrationMutation>;
export type StartRegistrationMutationResult = Apollo.MutationResult<StartRegistrationMutation>;
export type StartRegistrationMutationOptions = Apollo.BaseMutationOptions<StartRegistrationMutation, StartRegistrationMutationVariables>;
export const VerifyCodeDocument = gql`
    mutation VerifyCode($input: VerifyCodeInput!) {
  verifyCode(input: $input) {
    message
    step
    verified
    temp_token
  }
}
    `;
export type VerifyCodeMutationFn = Apollo.MutationFunction<VerifyCodeMutation, VerifyCodeMutationVariables>;

/**
 * __useVerifyCodeMutation__
 *
 * To run a mutation, you first call `useVerifyCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyCodeMutation, { data, loading, error }] = useVerifyCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyCodeMutation(baseOptions?: Apollo.MutationHookOptions<VerifyCodeMutation, VerifyCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyCodeMutation, VerifyCodeMutationVariables>(VerifyCodeDocument, options);
      }
export type VerifyCodeMutationHookResult = ReturnType<typeof useVerifyCodeMutation>;
export type VerifyCodeMutationResult = Apollo.MutationResult<VerifyCodeMutation>;
export type VerifyCodeMutationOptions = Apollo.BaseMutationOptions<VerifyCodeMutation, VerifyCodeMutationVariables>;
export const SetPasswordDocument = gql`
    mutation SetPassword($input: SetPasswordInput!) {
  setPassword(input: $input) {
    message
    step
    access_token
    refresh_token
    user {
      id
      email
      phone
      firstName
      lastName
      role {
        id
        name
      }
    }
  }
}
    `;
export type SetPasswordMutationFn = Apollo.MutationFunction<SetPasswordMutation, SetPasswordMutationVariables>;

/**
 * __useSetPasswordMutation__
 *
 * To run a mutation, you first call `useSetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPasswordMutation, { data, loading, error }] = useSetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<SetPasswordMutation, SetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetPasswordMutation, SetPasswordMutationVariables>(SetPasswordDocument, options);
      }
export type SetPasswordMutationHookResult = ReturnType<typeof useSetPasswordMutation>;
export type SetPasswordMutationResult = Apollo.MutationResult<SetPasswordMutation>;
export type SetPasswordMutationOptions = Apollo.BaseMutationOptions<SetPasswordMutation, SetPasswordMutationVariables>;
export const SetPersonalInfoDocument = gql`
    mutation SetPersonalInfo($input: SetPersonalInfoInput!) {
  setPersonalInfo(input: $input) {
    message
    step
    completed
  }
}
    `;
export type SetPersonalInfoMutationFn = Apollo.MutationFunction<SetPersonalInfoMutation, SetPersonalInfoMutationVariables>;

/**
 * __useSetPersonalInfoMutation__
 *
 * To run a mutation, you first call `useSetPersonalInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPersonalInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPersonalInfoMutation, { data, loading, error }] = useSetPersonalInfoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetPersonalInfoMutation(baseOptions?: Apollo.MutationHookOptions<SetPersonalInfoMutation, SetPersonalInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetPersonalInfoMutation, SetPersonalInfoMutationVariables>(SetPersonalInfoDocument, options);
      }
export type SetPersonalInfoMutationHookResult = ReturnType<typeof useSetPersonalInfoMutation>;
export type SetPersonalInfoMutationResult = Apollo.MutationResult<SetPersonalInfoMutation>;
export type SetPersonalInfoMutationOptions = Apollo.BaseMutationOptions<SetPersonalInfoMutation, SetPersonalInfoMutationVariables>;
export const ResendCodeDocument = gql`
    mutation ResendCode($input: ResendCodeInput!) {
  resendCode(input: $input) {
    message
  }
}
    `;
export type ResendCodeMutationFn = Apollo.MutationFunction<ResendCodeMutation, ResendCodeMutationVariables>;

/**
 * __useResendCodeMutation__
 *
 * To run a mutation, you first call `useResendCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendCodeMutation, { data, loading, error }] = useResendCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResendCodeMutation(baseOptions?: Apollo.MutationHookOptions<ResendCodeMutation, ResendCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResendCodeMutation, ResendCodeMutationVariables>(ResendCodeDocument, options);
      }
export type ResendCodeMutationHookResult = ReturnType<typeof useResendCodeMutation>;
export type ResendCodeMutationResult = Apollo.MutationResult<ResendCodeMutation>;
export type ResendCodeMutationOptions = Apollo.BaseMutationOptions<ResendCodeMutation, ResendCodeMutationVariables>;
export const GoBackStepDocument = gql`
    mutation GoBackStep($input: GoBackStepInput!) {
  goBackStep(input: $input) {
    message
  }
}
    `;
export type GoBackStepMutationFn = Apollo.MutationFunction<GoBackStepMutation, GoBackStepMutationVariables>;

/**
 * __useGoBackStepMutation__
 *
 * To run a mutation, you first call `useGoBackStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGoBackStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [goBackStepMutation, { data, loading, error }] = useGoBackStepMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGoBackStepMutation(baseOptions?: Apollo.MutationHookOptions<GoBackStepMutation, GoBackStepMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GoBackStepMutation, GoBackStepMutationVariables>(GoBackStepDocument, options);
      }
export type GoBackStepMutationHookResult = ReturnType<typeof useGoBackStepMutation>;
export type GoBackStepMutationResult = Apollo.MutationResult<GoBackStepMutation>;
export type GoBackStepMutationOptions = Apollo.BaseMutationOptions<GoBackStepMutation, GoBackStepMutationVariables>;
export const CreateBoxDocument = gql`
    mutation CreateBox($input: BoxInput!) {
  createBox(input: $input) {
    id
    name
    description
    parentBoxId
    boxTypeId
    createdAt
    updatedAt
  }
}
    `;
export type CreateBoxMutationFn = Apollo.MutationFunction<CreateBoxMutation, CreateBoxMutationVariables>;

/**
 * __useCreateBoxMutation__
 *
 * To run a mutation, you first call `useCreateBoxMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoxMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoxMutation, { data, loading, error }] = useCreateBoxMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBoxMutation(baseOptions?: Apollo.MutationHookOptions<CreateBoxMutation, CreateBoxMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBoxMutation, CreateBoxMutationVariables>(CreateBoxDocument, options);
      }
export type CreateBoxMutationHookResult = ReturnType<typeof useCreateBoxMutation>;
export type CreateBoxMutationResult = Apollo.MutationResult<CreateBoxMutation>;
export type CreateBoxMutationOptions = Apollo.BaseMutationOptions<CreateBoxMutation, CreateBoxMutationVariables>;
export const UpdateBoxDocument = gql`
    mutation UpdateBox($id: Int!, $input: BoxUpdateInput!) {
  updateBox(id: $id, input: $input) {
    id
    name
    description
    parentBoxId
    boxTypeId
    createdAt
    updatedAt
  }
}
    `;
export type UpdateBoxMutationFn = Apollo.MutationFunction<UpdateBoxMutation, UpdateBoxMutationVariables>;

/**
 * __useUpdateBoxMutation__
 *
 * To run a mutation, you first call `useUpdateBoxMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBoxMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBoxMutation, { data, loading, error }] = useUpdateBoxMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBoxMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBoxMutation, UpdateBoxMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBoxMutation, UpdateBoxMutationVariables>(UpdateBoxDocument, options);
      }
export type UpdateBoxMutationHookResult = ReturnType<typeof useUpdateBoxMutation>;
export type UpdateBoxMutationResult = Apollo.MutationResult<UpdateBoxMutation>;
export type UpdateBoxMutationOptions = Apollo.BaseMutationOptions<UpdateBoxMutation, UpdateBoxMutationVariables>;
export const RemoveBoxDocument = gql`
    mutation RemoveBox($id: Int!) {
  removeBox(id: $id) {
    id
    name
    description
    parentBoxId
    boxTypeId
    createdAt
    updatedAt
  }
}
    `;
export type RemoveBoxMutationFn = Apollo.MutationFunction<RemoveBoxMutation, RemoveBoxMutationVariables>;

/**
 * __useRemoveBoxMutation__
 *
 * To run a mutation, you first call `useRemoveBoxMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveBoxMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeBoxMutation, { data, loading, error }] = useRemoveBoxMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveBoxMutation(baseOptions?: Apollo.MutationHookOptions<RemoveBoxMutation, RemoveBoxMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveBoxMutation, RemoveBoxMutationVariables>(RemoveBoxDocument, options);
      }
export type RemoveBoxMutationHookResult = ReturnType<typeof useRemoveBoxMutation>;
export type RemoveBoxMutationResult = Apollo.MutationResult<RemoveBoxMutation>;
export type RemoveBoxMutationOptions = Apollo.BaseMutationOptions<RemoveBoxMutation, RemoveBoxMutationVariables>;
export const GetBoxTypeDocument = gql`
    query GetBoxType($id: Int!) {
  boxType(id: $id) {
    id
    name
    quantity
    type
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetBoxTypeQuery__
 *
 * To run a query within a React component, call `useGetBoxTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoxTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoxTypeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBoxTypeQuery(baseOptions: Apollo.QueryHookOptions<GetBoxTypeQuery, GetBoxTypeQueryVariables> & ({ variables: GetBoxTypeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBoxTypeQuery, GetBoxTypeQueryVariables>(GetBoxTypeDocument, options);
      }
export function useGetBoxTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoxTypeQuery, GetBoxTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBoxTypeQuery, GetBoxTypeQueryVariables>(GetBoxTypeDocument, options);
        }
export function useGetBoxTypeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBoxTypeQuery, GetBoxTypeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBoxTypeQuery, GetBoxTypeQueryVariables>(GetBoxTypeDocument, options);
        }
export type GetBoxTypeQueryHookResult = ReturnType<typeof useGetBoxTypeQuery>;
export type GetBoxTypeLazyQueryHookResult = ReturnType<typeof useGetBoxTypeLazyQuery>;
export type GetBoxTypeSuspenseQueryHookResult = ReturnType<typeof useGetBoxTypeSuspenseQuery>;
export type GetBoxTypeQueryResult = Apollo.QueryResult<GetBoxTypeQuery, GetBoxTypeQueryVariables>;
export const GetBoxTypesDocument = gql`
    query GetBoxTypes($query: BoxTypesQueryDto!) {
  boxTypesWithPagination(query: $query) {
    rows {
      id
      name
      quantity
      type
      createdAt
      updatedAt
    }
    total
  }
}
    `;

/**
 * __useGetBoxTypesQuery__
 *
 * To run a query within a React component, call `useGetBoxTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoxTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoxTypesQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetBoxTypesQuery(baseOptions: Apollo.QueryHookOptions<GetBoxTypesQuery, GetBoxTypesQueryVariables> & ({ variables: GetBoxTypesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBoxTypesQuery, GetBoxTypesQueryVariables>(GetBoxTypesDocument, options);
      }
export function useGetBoxTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoxTypesQuery, GetBoxTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBoxTypesQuery, GetBoxTypesQueryVariables>(GetBoxTypesDocument, options);
        }
export function useGetBoxTypesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBoxTypesQuery, GetBoxTypesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBoxTypesQuery, GetBoxTypesQueryVariables>(GetBoxTypesDocument, options);
        }
export type GetBoxTypesQueryHookResult = ReturnType<typeof useGetBoxTypesQuery>;
export type GetBoxTypesLazyQueryHookResult = ReturnType<typeof useGetBoxTypesLazyQuery>;
export type GetBoxTypesSuspenseQueryHookResult = ReturnType<typeof useGetBoxTypesSuspenseQuery>;
export type GetBoxTypesQueryResult = Apollo.QueryResult<GetBoxTypesQuery, GetBoxTypesQueryVariables>;
export const GetRootBoxesDocument = gql`
    query GetRootBoxes {
  rootBoxes {
    id
    name
    description
    parentBoxId
    boxTypeId
    createdAt
    updatedAt
    childBoxesCount
    inventoryItems {
      id
      quantity
      product {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetRootBoxesQuery__
 *
 * To run a query within a React component, call `useGetRootBoxesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRootBoxesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRootBoxesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRootBoxesQuery(baseOptions?: Apollo.QueryHookOptions<GetRootBoxesQuery, GetRootBoxesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRootBoxesQuery, GetRootBoxesQueryVariables>(GetRootBoxesDocument, options);
      }
export function useGetRootBoxesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRootBoxesQuery, GetRootBoxesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRootBoxesQuery, GetRootBoxesQueryVariables>(GetRootBoxesDocument, options);
        }
export function useGetRootBoxesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRootBoxesQuery, GetRootBoxesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRootBoxesQuery, GetRootBoxesQueryVariables>(GetRootBoxesDocument, options);
        }
export type GetRootBoxesQueryHookResult = ReturnType<typeof useGetRootBoxesQuery>;
export type GetRootBoxesLazyQueryHookResult = ReturnType<typeof useGetRootBoxesLazyQuery>;
export type GetRootBoxesSuspenseQueryHookResult = ReturnType<typeof useGetRootBoxesSuspenseQuery>;
export type GetRootBoxesQueryResult = Apollo.QueryResult<GetRootBoxesQuery, GetRootBoxesQueryVariables>;
export const GetChildBoxesDocument = gql`
    query GetChildBoxes($parentBoxId: Int!) {
  childBoxes(parentBoxId: $parentBoxId) {
    id
    name
    description
    parentBoxId
    boxTypeId
    createdAt
    updatedAt
    childBoxesCount
    inventoryItems {
      id
      quantity
      product {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetChildBoxesQuery__
 *
 * To run a query within a React component, call `useGetChildBoxesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChildBoxesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChildBoxesQuery({
 *   variables: {
 *      parentBoxId: // value for 'parentBoxId'
 *   },
 * });
 */
export function useGetChildBoxesQuery(baseOptions: Apollo.QueryHookOptions<GetChildBoxesQuery, GetChildBoxesQueryVariables> & ({ variables: GetChildBoxesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChildBoxesQuery, GetChildBoxesQueryVariables>(GetChildBoxesDocument, options);
      }
export function useGetChildBoxesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChildBoxesQuery, GetChildBoxesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChildBoxesQuery, GetChildBoxesQueryVariables>(GetChildBoxesDocument, options);
        }
export function useGetChildBoxesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetChildBoxesQuery, GetChildBoxesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChildBoxesQuery, GetChildBoxesQueryVariables>(GetChildBoxesDocument, options);
        }
export type GetChildBoxesQueryHookResult = ReturnType<typeof useGetChildBoxesQuery>;
export type GetChildBoxesLazyQueryHookResult = ReturnType<typeof useGetChildBoxesLazyQuery>;
export type GetChildBoxesSuspenseQueryHookResult = ReturnType<typeof useGetChildBoxesSuspenseQuery>;
export type GetChildBoxesQueryResult = Apollo.QueryResult<GetChildBoxesQuery, GetChildBoxesQueryVariables>;
export const GetBrandDocument = gql`
    query GetBrand($id: Int!) {
  brand(id: $id) {
    id
    name
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetBrandQuery__
 *
 * To run a query within a React component, call `useGetBrandQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBrandQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBrandQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBrandQuery(baseOptions: Apollo.QueryHookOptions<GetBrandQuery, GetBrandQueryVariables> & ({ variables: GetBrandQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBrandQuery, GetBrandQueryVariables>(GetBrandDocument, options);
      }
export function useGetBrandLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBrandQuery, GetBrandQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBrandQuery, GetBrandQueryVariables>(GetBrandDocument, options);
        }
export function useGetBrandSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBrandQuery, GetBrandQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBrandQuery, GetBrandQueryVariables>(GetBrandDocument, options);
        }
export type GetBrandQueryHookResult = ReturnType<typeof useGetBrandQuery>;
export type GetBrandLazyQueryHookResult = ReturnType<typeof useGetBrandLazyQuery>;
export type GetBrandSuspenseQueryHookResult = ReturnType<typeof useGetBrandSuspenseQuery>;
export type GetBrandQueryResult = Apollo.QueryResult<GetBrandQuery, GetBrandQueryVariables>;
export const GetBrandsDocument = gql`
    query GetBrands($query: BrandsQueryDto!) {
  brandsWithPagination(query: $query) {
    rows {
      id
      name
      createdAt
      updatedAt
    }
    total
  }
}
    `;

/**
 * __useGetBrandsQuery__
 *
 * To run a query within a React component, call `useGetBrandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBrandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBrandsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetBrandsQuery(baseOptions: Apollo.QueryHookOptions<GetBrandsQuery, GetBrandsQueryVariables> & ({ variables: GetBrandsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBrandsQuery, GetBrandsQueryVariables>(GetBrandsDocument, options);
      }
export function useGetBrandsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBrandsQuery, GetBrandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBrandsQuery, GetBrandsQueryVariables>(GetBrandsDocument, options);
        }
export function useGetBrandsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBrandsQuery, GetBrandsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBrandsQuery, GetBrandsQueryVariables>(GetBrandsDocument, options);
        }
export type GetBrandsQueryHookResult = ReturnType<typeof useGetBrandsQuery>;
export type GetBrandsLazyQueryHookResult = ReturnType<typeof useGetBrandsLazyQuery>;
export type GetBrandsSuspenseQueryHookResult = ReturnType<typeof useGetBrandsSuspenseQuery>;
export type GetBrandsQueryResult = Apollo.QueryResult<GetBrandsQuery, GetBrandsQueryVariables>;
export const GetProductDocument = gql`
    query GetProduct($id: Int!) {
  product(id: $id) {
    id
    name
    brandId
    createdAt
    type
    updatedAt
    brand {
      id
      name
    }
  }
}
    `;

/**
 * __useGetProductQuery__
 *
 * To run a query within a React component, call `useGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProductQuery(baseOptions: Apollo.QueryHookOptions<GetProductQuery, GetProductQueryVariables> & ({ variables: GetProductQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
      }
export function useGetProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
        }
export function useGetProductSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductQuery, GetProductQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductQuery, GetProductQueryVariables>(GetProductDocument, options);
        }
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>;
export type GetProductLazyQueryHookResult = ReturnType<typeof useGetProductLazyQuery>;
export type GetProductSuspenseQueryHookResult = ReturnType<typeof useGetProductSuspenseQuery>;
export type GetProductQueryResult = Apollo.QueryResult<GetProductQuery, GetProductQueryVariables>;
export const GetProductsWithPaginationDocument = gql`
    query GetProductsWithPagination($query: ProductsQueryDto!) {
  productsWithPagination(query: $query) {
    rows {
      id
      name
      brand {
        id
        name
      }
      mainFile {
        id
        filename
        s3Key
        type
        url
      }
      brandId
      createdAt
      type
      updatedAt
    }
    total
  }
}
    `;

/**
 * __useGetProductsWithPaginationQuery__
 *
 * To run a query within a React component, call `useGetProductsWithPaginationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsWithPaginationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsWithPaginationQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useGetProductsWithPaginationQuery(baseOptions: Apollo.QueryHookOptions<GetProductsWithPaginationQuery, GetProductsWithPaginationQueryVariables> & ({ variables: GetProductsWithPaginationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsWithPaginationQuery, GetProductsWithPaginationQueryVariables>(GetProductsWithPaginationDocument, options);
      }
export function useGetProductsWithPaginationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsWithPaginationQuery, GetProductsWithPaginationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsWithPaginationQuery, GetProductsWithPaginationQueryVariables>(GetProductsWithPaginationDocument, options);
        }
export function useGetProductsWithPaginationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProductsWithPaginationQuery, GetProductsWithPaginationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductsWithPaginationQuery, GetProductsWithPaginationQueryVariables>(GetProductsWithPaginationDocument, options);
        }
export type GetProductsWithPaginationQueryHookResult = ReturnType<typeof useGetProductsWithPaginationQuery>;
export type GetProductsWithPaginationLazyQueryHookResult = ReturnType<typeof useGetProductsWithPaginationLazyQuery>;
export type GetProductsWithPaginationSuspenseQueryHookResult = ReturnType<typeof useGetProductsWithPaginationSuspenseQuery>;
export type GetProductsWithPaginationQueryResult = Apollo.QueryResult<GetProductsWithPaginationQuery, GetProductsWithPaginationQueryVariables>;
export const GetProfileDocument = gql`
    query GetProfile {
  getProfile {
    id
    email
    phone
    firstName
    lastName
    role {
      id
      name
    }
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export function useGetProfileSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileSuspenseQueryHookResult = ReturnType<typeof useGetProfileSuspenseQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;