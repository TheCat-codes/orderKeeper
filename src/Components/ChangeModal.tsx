import { checkTask } from "../Actions/tasksActions"
import { useTaskStore } from "../stores/tasksStore"

interface Props {
  idToCheck: number | null,
  setCheckState: (value:boolean) => void
}

export function ChangeModal ({idToCheck, setCheckState}:Props) {
  const checkTaskInStore = useTaskStore(state => state.checkTaskInStore)
  
  const handleCheck = () => {
    if(idToCheck === null) return
    checkTaskInStore(idToCheck)
    checkTask({id:idToCheck})
    setCheckState(false)
  }

  return (
    <>
      <div className="bg">
        <div className="modal" id="exampleModal" role="dialog" >
          <div className="modal-content">
          <button type="button" onClick={() => setCheckState(false)}>
            <svg width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="modal-body">
            Congratulations! Have you complete this Task?
          </div>
          <div className="modal-footer">
            <button className="close-change" type="button" onClick={() => setCheckState(false)}>Close</button>
            <button className="confirm-change" type="button" onClick={handleCheck}>Complete</button>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}