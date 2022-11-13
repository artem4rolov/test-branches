import React, {useState} from "react";
import List from "../List";
import Badge from "../Badge";

import closeSvg from '../../assets/img/close.svg';

import './AddList.scss';

const AddList = ({colors}) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0].id);

  // console.log(selectedColor)

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
          onClick={() => setVisiblePopup(false)} 
          src={closeSvg} 
          alt="close button" 
          className="add-list__popup-close-btn" 
        />
        <input className="field" type="text" placeholder="Название списка" />
        <div className="add-list__popup-colors">
        
          {colors.map(color => {
            return (
              <Badge 
                onClick={() => setSelectedColor(color.id)}
                key={color.id} 
                color={color.name} 
                className={selectedColor === color.id && 'active'}
                />
                
            )
          })}
        
        </div>
        <button className="button">Добавить</button>
      </div>}
    </div>
  )
}

export default AddList;