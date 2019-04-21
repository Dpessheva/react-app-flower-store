import {FETCH_STATS_SUCCESS, REGISTER_SUCCESS, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT} from '../actions/actionTypes'

function statsReducer (state = {usersCount: 0, productsCount: 0}, action) {
  switch (action.type) {
    case FETCH_STATS_SUCCESS:
      return {
        usersCount: action.data.users,
        productsCount: action.data.productsCount
      }
    case REGISTER_SUCCESS:
      return {
        usersCount: state.usersCount + 1,
        productsCount: state.productsCount
      }
    case CREATE_PRODUCT_SUCCESS:
      return {
        usersCount: state.usersCount,
        productsCount: state.productsCount + 1
      }
    case DELETE_PRODUCT:
      return {
        usersCount: state.usersCount,
        productsCount: state.productsCount - 1
      }
    default:
      return state
  }
}

export default statsReducer