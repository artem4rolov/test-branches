import React, {useState} from 'react';
import axios from 'axios';

import addSvg from '../../assets/img/add.svg';

import './Tasks.scss';


const AddTaskForm = ({list, onAddTask}) => {

  const [visibleForm, setVisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState('');

  // тоглим значение visibleForm для открытия / закрытия формы
  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm);
    // очищаем инпут при нажатии на кнопки, вне зависимости от того открыта форма или нет
    setInputValue('');
  }

  const addTask = () => {

    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false
    };

    setIsSending(true);

    // обращаемся к нашим спискам дел (таблица tasks в БД), постим туда наш объект с новой задачей
    axios
      .post(`http://localhost:3001/tasks`, obj)
      // сервер автоматически задает id каждому новому элементу
      .then(({data}) => {
        onAddTask(list.id, data);
        toggleFormVisible();
        setIsSending(false);
      })
      // .catch(() => {
      //   alert('Ошибка при добавлении задачи!');
      // })
      // .finaly(() => {
      //   setIsSending(false);
      // })
  }

  return (
    <>
      {/* кнопка для добавления задачи в список */}
      <div className='tasks__form'>

        {!visibleForm ? 
          // если visibleForm = false, отображаем надпись "новая задача"
          <div onClick={toggleFormVisible} className='tasks__form-new'>
            <img src={addSvg} alt="Add icon" />
            <span>Новая задача</span>
          </div>
          
          :
          // если visibleForm = true, отображаем форму добавления новой задачи
          <div className='tasks__form-block'>
            <input  
              value={inputValue}
              className="field" 
              type="text" 
              placeholder="Текст задачи"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button disabled={isSending} onClick={addTask} className="button">{ isSending ? 'Добавление...' : 'Добавить задачу'}</button>
            <button onClick={toggleFormVisible} className="button button--grey">Отмена</button>
          </div> 
        }
      </div>
    </>
  );
}

export default AddTaskForm;
