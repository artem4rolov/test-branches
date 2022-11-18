import React from 'react';
import axios from 'axios';

import editSvg from '../../assets/img/edit.svg';
import AddTaskForm from './addTaskForm';

import './Tasks.scss';


const Tasks = ({list, onEditTitle, onAddTask}) => {

  // функция смены названия для списка дел
  const editTitle = () => {
    const newTitle = window.prompt('Введите название списка', list.name);
    if (newTitle) {
      // сначала меняем название списка дел в state компонента App
      onEditTitle(list.id, newTitle);
      // и одновременно делаем запрос к нашей БД для изменения совйства name конкретного списка в таблице lists
      axios
        .patch(`http://localhost:3001/lists/${list.id}`, {
          name: newTitle
        })
        // в случае ошибки обязательно оповещаем об этом пользователя
        .catch(() => {
          alert('Не удалось обновить название списка!')
        })
    }
  }

  return (
    <div className="tasks">
      
      <h2 className="tasks__title">
        {list.name}
      <img onClick={editTitle} src={editSvg} alt="Edit icon" />  
      </h2>

      <div className='tasks__items'>
        {/* проверяем, если нет дел в списке, пишем надпись "задачи отсутствуют" */}
        {!list.tasks.length && <h2>Задачи отсутствуют</h2>}
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
        <AddTaskForm list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
}

export default Tasks;
