import { SET_TASK_MODAL, TOGGLE_SIDEBAR} from '../reducers/system.reducer'
import { store } from '../store'

export function toggleSidebar() {
    store.dispatch({ type: TOGGLE_SIDEBAR })
}

export function toggleTaskModal(boolean) {
    store.dispatch({ type: SET_TASK_MODAL, taskModalOpen: boolean })
}