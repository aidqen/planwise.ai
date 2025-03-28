export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR'
export const SET_YEAR = 'SET_YEAR'
export const SET_TASK_MODAL = 'SET_TASK_MODAL'
export const TOGGLE_SCHEDULE_SIDEBAR = 'TOGGLE_SCHEDULE_SIDEBAR'

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
  isScheduleSidebarOpen: false,
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
    case TOGGLE_SCHEDULE_SIDEBAR:
      return { ...state, isScheduleSidebarOpen: action.isOpen !== undefined ? action.isOpen : !state.isScheduleSidebarOpen }
    case SET_YEAR:
      return { ...state, year: action.year }
    case SET_TASK_MODAL:
      return { ...state, taskModalOpen: action.taskModalOpen }
    case CLOSE_SIDEBAR:
      return { ...state, isSidebarOpen: false }
    default:
      return state
  }
}
