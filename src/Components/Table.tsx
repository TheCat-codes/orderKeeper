
import { useTaskStore } from '../stores/tasksStore.ts';
import type { Tasks } from '../stores/tasksStore.ts';
import dayjs from 'dayjs'
import { useState } from 'react';
import { Modal } from './DeleteModal.tsx';
import { ChangeModal } from './ChangeModal.tsx';
import { UnchangeModal } from './UnchangeModal.tsx';

export function TasksTable ({ tasks }: { tasks: Tasks[]}) {
  const loading = useTaskStore(state => state.loading)
  
  const [ deletestate, setDeleteState ] = useState<boolean>(false)
  const [ chevckState, setcheckState ] = useState<boolean>(false)
  const [ uncheckState, setUncheckState ] = useState<boolean>(false)
  const [ idToDelete, setIdToDelete ] = useState<number | null>(null)
  const [ idToCheck, setIdToCheck ] = useState<number | null>(null)
  const [ idToUncheck, setIdToUncheck ] = useState<number | null>(null)
  
  if(tasks.length === 0) return (<p>There arent tasks yet</p>)
  const getdate = (stringDate:Date) => {
    return dayjs(stringDate).format('DD-MM-YYYY')
  }

  return (
    <>
      {deletestate && <Modal setDeleteState={setDeleteState} idToDelete={idToDelete}/>}
      {chevckState && <ChangeModal setCheckState={setcheckState} idToCheck={idToCheck} />}
      {uncheckState && <UnchangeModal setUncheckState={setUncheckState} idToUncheck={idToUncheck} />}
      {loading && <p>Cargando...</p>}
      {tasks.length === 0 && <p>There arent tasks yet</p>}
      {!loading && tasks.length > 0 && (
        <table>
            <thead>
              <tr >
                <th align='center'>Task</th>
                <th>User</th>
                <th>Task State</th>
                <th>Limit Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((row) => {
                const isChecked = row.state === 'Completed'
                return (
                  <tr key={row.task_id} >
                    <td>
                      {row.text}
                    </td>
                    <td>{row.user_task}</td>
                    <td>{row.state}</td>
                    <td>{getdate(row.limit_date)}</td>
                    <td>
                      <div className="options">
                        <button onClick={() => {
                          setDeleteState(true)
                          setIdToDelete(row.task_id)
                        }}>
                        <svg  width={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="delete-svg">
                          <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                        </svg>
                        </button>
                        <button onClick={() => {
                          if(row.state === 'Completed') {
                            setUncheckState(true)
                            return setIdToUncheck(row.task_id)
                          }                            
                            setIdToCheck(row.task_id)
                            setcheckState(true)
                          }}>
                          <svg width={30} height={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={isChecked ? 'checked' : 'check'}>
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
        </table>
        )}
    </>  
  );
}

// <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 700, fontFamily:'montserrat' }} aria-label="customized table">
//             <TableHead>
//               <tr sx={{ fontFamily:'montserrat'}}>
//                 <td align='center'>Task</td>
//                 <td>User</td>
//                 <td>Task State</td>
//                 <td>Limit Date</td>
//                 <td>Actions</td>
//               </tr>
//             </TableHead>
//             <TableBody>
//               {tasks?.map((row) => {
//                 const isChecked = row.state === 'Completed'
//                 return (
//                   <tr key={row.task_id} >
//                     <td component="th" scope="row">
//                       {row.text}
//                     </td>
//                     <td>{row.user_task}</td>
//                     <td>{row.state}</td>
//                     <td>{getdate(row.limit_date)}</td>
//                     <td>
//                       <div className="options">
//                         <button onClick={() => {
//                           setDeleteState(true)
//                           setIdToDelete(row.task_id)
//                         }}>
//                         <svg  width={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="delete-svg">
//                           <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
//                         </svg>
//                         </button>
//                         <button onClick={() => {
//                           if(row.state === 'Completed') {
//                             setUncheckState(true)
//                             return setIdToUncheck(row.task_id)
//                           }                            
//                             setIdToCheck(row.task_id)
//                             setcheckState(true)
//                           }}>
//                           <svg width={30} height={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={isChecked ? 'checked' : 'check'}>
//                             <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
//                           </svg>
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 )
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>