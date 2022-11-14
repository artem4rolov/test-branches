import React, {useRef, useState} from "react";
import List from "../List";
import Badge from "../Badge";

import closeSvg from '../../assets/img/close.svg';

import './AddList.scss';

const AddList = ({colors, onAdd}) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0].id);
  const [inputValue, setInputValue] = useState('');

  const closeModal = () => {
    setVisiblePopup(false);
    setInputValue('');
    setSelectedColor(colors[0].id);
  }

  const addList = () => {
    if (!inputValue) {
      alert('Введите название списка!');
      return;
    }

    const color = colors.filter(color => color.id === selectedColor)[0].name;

    onAdd({
      "id": Math.floor(Math.random()*100 + 1),
      "name": inputValue,
      // сразу передаем цвет кружочка для нового названия списка дел
      color,
    });
    closeModal();
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
          onClick={closeModal} 
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
        <button onClick={addList} className="button">Добавить</button>
      </div>}
    </div>
  )
}

export default AddList;