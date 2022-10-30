import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AddDoctorAvailabilityInput = {
  dayOfWeek: Scalars['Float'];
  doctorId: Scalars['String'];
  endTimeUtc: Scalars['String'];
  startTimeUtc: Scalars['String'];
};

export type AddDoctorInput = {
  name: Scalars['String'];
};

export type AddItemInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type Appointment = {
  __typename?: 'Appointment';
  description: Scalars['String'];
  doctor: Doctor;
  durationMinutes: Scalars['Float'];
  id: Scalars['Float'];
  patientName: Scalars['String'];
  startTime: Scalars['DateTime'];
};

export type Availability = {
  __typename?: 'Availability';
  dayOfWeek: Scalars['Float'];
  doctor: Doctor;
  endTimeUtc: Scalars['String'];
  id: Scalars['Float'];
  startTimeUtc: Scalars['String'];
};

export type BookAppointmentInput = {
  description: Scalars['String'];
  patientName: Scalars['String'];
  slot: SlotInput;
};

export type Doctor = {
  __typename?: 'Doctor';
  appointments?: Maybe<Array<Appointment>>;
  availability?: Maybe<Array<Availability>>;
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type Item = {
  __typename?: 'Item';
  description?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addDoctor: Doctor;
  addDoctorAvailability: Availability;
  addItem: Item;
  bookAppointment: Appointment;
};


export type MutationAddDoctorArgs = {
  doctor: AddDoctorInput;
};


export type MutationAddDoctorAvailabilityArgs = {
  availability: AddDoctorAvailabilityInput;
};


export type MutationAddItemArgs = {
  item: AddItemInput;
};


export type MutationBookAppointmentArgs = {
  bookAppointmentInput: BookAppointmentInput;
};

export type Query = {
  __typename?: 'Query';
  appointments: Array<Appointment>;
  doctors: Array<Doctor>;
  items: Array<Item>;
  slots: Array<Slot>;
};


export type QuerySlotsArgs = {
  from: Scalars['DateTime'];
  to: Scalars['DateTime'];
};

export type Slot = {
  __typename?: 'Slot';
  doctorId: Scalars['Float'];
  end: Scalars['DateTime'];
  start: Scalars['DateTime'];
};

export type SlotInput = {
  doctorId: Scalars['Float'];
  end: Scalars['DateTime'];
  start: Scalars['DateTime'];
};

export type AppointmentMutationVariables = Exact<{
  bookAppointmentInput: BookAppointmentInput;
}>;


export type AppointmentMutation = { __typename?: 'Mutation', bookAppointment: { __typename?: 'Appointment', id: number, startTime: any, patientName: string, doctor: { __typename?: 'Doctor', id: number, name: string } } };

export type AddItemMutationVariables = Exact<{
  item: AddItemInput;
}>;


export type AddItemMutation = { __typename?: 'Mutation', addItem: { __typename?: 'Item', id: number, name: string, description?: string | null } };

export type DoctorsQueryVariables = Exact<{ [key: string]: never; }>;


export type DoctorsQuery = { __typename?: 'Query', doctors: Array<{ __typename?: 'Doctor', id: number, name: string }> };

export type ItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: number, name: string, description?: string | null }> };

export type SlotsQueryVariables = Exact<{
  to: Scalars['DateTime'];
  from: Scalars['DateTime'];
}>;


export type SlotsQuery = { __typename?: 'Query', slots: Array<{ __typename?: 'Slot', doctorId: number, start: any, end: any }> };


export const AppointmentDocument = gql`
    mutation appointment($bookAppointmentInput: BookAppointmentInput!) {
  bookAppointment(bookAppointmentInput: $bookAppointmentInput) {
    id
    startTime
    patientName
    doctor {
      id
      name
    }
  }
}
    `;
export type AppointmentMutationFn = Apollo.MutationFunction<AppointmentMutation, AppointmentMutationVariables>;

/**
 * __useAppointmentMutation__
 *
 * To run a mutation, you first call `useAppointmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAppointmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [appointmentMutation, { data, loading, error }] = useAppointmentMutation({
 *   variables: {
 *      bookAppointmentInput: // value for 'bookAppointmentInput'
 *   },
 * });
 */
export function useAppointmentMutation(baseOptions?: Apollo.MutationHookOptions<AppointmentMutation, AppointmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AppointmentMutation, AppointmentMutationVariables>(AppointmentDocument, options);
      }
export type AppointmentMutationHookResult = ReturnType<typeof useAppointmentMutation>;
export type AppointmentMutationResult = Apollo.MutationResult<AppointmentMutation>;
export type AppointmentMutationOptions = Apollo.BaseMutationOptions<AppointmentMutation, AppointmentMutationVariables>;
export const AddItemDocument = gql`
    mutation addItem($item: AddItemInput!) {
  addItem(item: $item) {
    id
    name
    description
  }
}
    `;
export type AddItemMutationFn = Apollo.MutationFunction<AddItemMutation, AddItemMutationVariables>;

/**
 * __useAddItemMutation__
 *
 * To run a mutation, you first call `useAddItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addItemMutation, { data, loading, error }] = useAddItemMutation({
 *   variables: {
 *      item: // value for 'item'
 *   },
 * });
 */
export function useAddItemMutation(baseOptions?: Apollo.MutationHookOptions<AddItemMutation, AddItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddItemMutation, AddItemMutationVariables>(AddItemDocument, options);
      }
export type AddItemMutationHookResult = ReturnType<typeof useAddItemMutation>;
export type AddItemMutationResult = Apollo.MutationResult<AddItemMutation>;
export type AddItemMutationOptions = Apollo.BaseMutationOptions<AddItemMutation, AddItemMutationVariables>;
export const DoctorsDocument = gql`
    query doctors {
  doctors {
    id
    name
  }
}
    `;

/**
 * __useDoctorsQuery__
 *
 * To run a query within a React component, call `useDoctorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDoctorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDoctorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDoctorsQuery(baseOptions?: Apollo.QueryHookOptions<DoctorsQuery, DoctorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DoctorsQuery, DoctorsQueryVariables>(DoctorsDocument, options);
      }
export function useDoctorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DoctorsQuery, DoctorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DoctorsQuery, DoctorsQueryVariables>(DoctorsDocument, options);
        }
export type DoctorsQueryHookResult = ReturnType<typeof useDoctorsQuery>;
export type DoctorsLazyQueryHookResult = ReturnType<typeof useDoctorsLazyQuery>;
export type DoctorsQueryResult = Apollo.QueryResult<DoctorsQuery, DoctorsQueryVariables>;
export const ItemsDocument = gql`
    query items {
  items {
    id
    name
    description
  }
}
    `;

/**
 * __useItemsQuery__
 *
 * To run a query within a React component, call `useItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useItemsQuery(baseOptions?: Apollo.QueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, options);
      }
export function useItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, options);
        }
export type ItemsQueryHookResult = ReturnType<typeof useItemsQuery>;
export type ItemsLazyQueryHookResult = ReturnType<typeof useItemsLazyQuery>;
export type ItemsQueryResult = Apollo.QueryResult<ItemsQuery, ItemsQueryVariables>;
export const SlotsDocument = gql`
    query slots($to: DateTime!, $from: DateTime!) {
  slots(to: $to, from: $from) {
    doctorId
    start
    end
  }
}
    `;

/**
 * __useSlotsQuery__
 *
 * To run a query within a React component, call `useSlotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSlotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSlotsQuery({
 *   variables: {
 *      to: // value for 'to'
 *      from: // value for 'from'
 *   },
 * });
 */
export function useSlotsQuery(baseOptions: Apollo.QueryHookOptions<SlotsQuery, SlotsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SlotsQuery, SlotsQueryVariables>(SlotsDocument, options);
      }
export function useSlotsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SlotsQuery, SlotsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SlotsQuery, SlotsQueryVariables>(SlotsDocument, options);
        }
export type SlotsQueryHookResult = ReturnType<typeof useSlotsQuery>;
export type SlotsLazyQueryHookResult = ReturnType<typeof useSlotsLazyQuery>;
export type SlotsQueryResult = Apollo.QueryResult<SlotsQuery, SlotsQueryVariables>;