import { useTaskStore } from "../stores/tasksStore"
import { uncheckTask } from "../Actions/tasksActions"

interface Props {
  idToUncheck: number | null,
  setUncheckState: (value:boolean) => void
}

export function UnchangeModal ({idToUncheck, setUncheckState}:Props) {
  const uncheckTaskInStore = useTaskStore(state => state.uncheckTaskInStore)
  
  const handleUncheck = () => {
    if(idToUncheck === null) return
    uncheckTaskInStore(idToUncheck)
    uncheckTask({ id: idToUncheck })
    setUncheckState(false)
  }

  return (
    <>
      <div className="bg">
        <div className="modal" id="exampleModal" role="dialog" >
          <div className="modal-content">
          <button type="button" onClick={() => setUncheckState(false)}>
            <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="modal-body">
            Oh! you have Incomplete this Task?
          </div>
          <div className="modal-footer">
            <button className="close-change" type="button" onClick={() => setUncheckState(false)}>Close</button>
            <button className="confirm-change" type="button" onClick={handleUncheck}>Incomplete</button>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}