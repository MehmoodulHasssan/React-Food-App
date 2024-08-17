// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   selectedOrder: null,
//   approved: [],
//   declined: [],
//   pending: [],
//   orders: [],
// };
// export const itemsSlice = createSlice({
//   name: 'items',
//   initialState,
//   reducers: {
//     SetSelectedOrder(state, action) {
//       return (state.selectedOrder = action.payload);
//     },
//     filterApproved(state, action) {
//       return (state.approved = state.orders.filter(
//         (item) => item.status === 'pending'
//       ));
//     },
//     filterDeclined(state, action) {
//       return (state.declined = state.orders.filter(
//         (item) => item.status === 'pending'
//       ));
//     },
//     filterPending(state, action) {
//       return (state.pending = state.orders.filter(
//         (item) => item.status === 'pending'
//       ));
//     },
//   },
// });

// export const itemsActions = itemsSlice.actions;
// export default itemsSlice.reducer;
