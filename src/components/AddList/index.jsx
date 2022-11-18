import React, {useState, useEffect} from "react";
import axios from "axios";

import List from "../List";
import Badge from "../Badge";

import closeSvg from '../../assets/img/close.svg';

import './AddList.scss';

const AddList = ({colors, onAdd}) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors])

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    setSelectedColor(colors[0].id);
  }

  const addList = () => {
    if (!inputValue) {
      alert('Введите название списка!');
      return;
    }

    // оповещяем пользователя о том, что происходит загрузка
    setIsLoading(true);

    // постим в нашу базу данных новый список дел (в таблицу lists), id автоматически задается json-server'ом
    
    axios
      .post('http://localhost:3001/lists', {
        name: inputValue,
        // сразу передаем цвет кружочка для нового названия списка дел
        colorId: selectedColor,
      })
      .then(({data}) => {
        // создаем имя для выбранного цвета, чтобы использовать его в классах компонента Badge, также в компоненте List
        const color = colors.filter(color => color.id === selectedColor)[0].name;
        // всё, что мы получили от ответа при POST в таблицу lists, нужно добавить это свойство color, чтобы отрисовать кружок в списках дел
        const listObj = {...data, color: {name: color}};
        // функция onAdd в компоненте App
        onAdd(listObj);
        onClose();
      })
      .catch(() => {
        alert('Ошибка при добавлении списка!')
      })
      // неважно, успешно выполнился запрос или нет - загрузка завершена в любом случае
      .finally(() => {
        setIsLoading(false);
      })

  }

  // console.log(inputValue)

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(!visiblePopup)}
        items={[
          {
            className: "list__add-button",
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: "Добавить список",
          },
        ]}
      />
      {/* ниже обычное JS условие true && true && false && true (крайний true не выведется, поскольку есть false перед ним и JS в операторе && не остановится до тех пор, пока не будет первый false) */}
      {visiblePopup && 
      <div className="add-list__popup">
        <img 
          onClick={onClose} 
          src={closeSvg} 
          alt="close button" 
          className="add-list__popup-close-btn" 
        />
        <input 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} 
          className="field" 
          type="text" 
          placeholder="Название списка"
        />
        <div className="add-list__popup-colors">
        
          {colors.map(color => {
            return (
              <Badge 
                onClick={() => setSelectedColor(color.id)}
                key={color.id} 
                color={color.name} 
                // делаем кружок активным при клике
                className={selectedColor === color.id && 'active'}
              />
                
            )
          })}
        
        </div>
        <button 
          onClick={addList} 
          className="button"
        >
          {isLoading ? 'Добавление...' : 'Добавить'}
        </button>
      </div>}
    </div>
  )
}

export default AddList;