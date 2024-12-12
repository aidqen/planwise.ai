export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export const SET_YEAR = 'SET_YEAR'
export const SET_TASK_MODAL = 'SET_TASK_MODAL'

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  taskModalOpen: false,
  year: null,
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case TOGGLE_SIDEBAR:
      return { ...state, isSidebarOpen: !state.isSidebarOpen }
    case SET_YEAR:
      return { ...state, year: action.year }
    case SET_TASK_MODAL:
      return { ...state, taskModalOpen: action.taskModalOpen }
    default:
      return state
  }
}
