import React from 'react';

import editSvg from '../../assets/img/edit.svg'

import './Tasks.scss'

const Tasks = ({list}) => {
  return (
    <div className="tasks">
      <h2 className="tasks__title">
        {list.name}
      <img src={editSvg} alt="Edit icon" />  
      </h2>

      <div className='tasks__items'>

        {
          list.tasks.map((task, index) => {
            return (
              <div key={index} className='tasks__items-row'>
                {/* создаем галочу задачи и всю анимацию в scss */}
                <div className='checkbox'>
                  {/* делаем каждый инпут и label уникальными, чтобы можно было их отмечать как выполненные (иначе отмечается только первый инпут) */}
                  <input id={`task-${task.id}`} type="checkbox" />
                  <label htmlFor={`task-${task.id}`}>
                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </label>
                </div>
                
                <input onChange={() => console.log(1)} value={task.text} />
            </div>
            )
          })
        }

        
      </div>
    </div>
  );
}

export default Tasks;
