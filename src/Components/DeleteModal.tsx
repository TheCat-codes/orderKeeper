import { deleteTask } from "../Actions/tasksActions"
import { useTaskStore } from "../stores/tasksStore"

interface Props {
  idToDelete: number | null,
  setDeleteState: (value:boolean) => void
}

export function Modal ({idToDelete, setDeleteState}:Props) {
  const deleteTaskInStore = useTaskStore(state => state.deleteTaskInStore)
  
  const handleDelete = () => {
    if(idToDelete === null) return
    deleteTaskInStore(idToDelete)
    deleteTask({id:idToDelete})
    setDeleteState(false)
  }

  return (
    <>
    <div className="bg">
      <div className="modal" id="exampleModal" role="dialog" >
          <div className="modal-content">
            <button type="button" onClick={() => setDeleteState(false)}>
              <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="modal-body">
              Are you sure you have completed this task?
            </div>
            <div className="modal-footer">
              <button className="cancel-delete" type="button" onClick={() => setDeleteState(false)}>Close</button>
              <button className="confirm-delete" type="button" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}