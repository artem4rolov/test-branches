import React from "react";
import classNames from "classnames";
import axios from "axios";

import Badge from '../Badge';

import removeSvg from '../../assets/img/remove.svg'

import './List.scss'

const List = ({items, isRemovable, onClick, onRemove}) => {
  // console.log(items, isRemovable);
  // при нажатии на крестик выскакивает alert
  const removeList = (item) => {
    if (window.confirm('Вы действительно хотите удалить список?')) {
      // сначала удаляем список из нашей базы данных, передаем id этого списка дел
      axios.delete(`http://localhost:3001/lists/${item.id}`)
        // затем идем в компонент App и дописываем функцию удаления списка из state, чтобы перерисовать компонент
        .then(() => {
          onRemove(item.id);
        })
    }
  }

  return (
    <>
      <ul onClick={onClick} className="list">
        {
          items.map((item, index) => {

            return (
              <li key={index} className={classNames(item.className, {'active': item.active})}>
                <i>
                  {(item.icon) ? item.icon : <Badge color={item.color.name} />}
                </i>
                <span>{item.name}</span>
                {isRemovable && 
                // если есть пропс onRemovable, рисуем крестик напротив каждого списка
                <img 
                  // обработчик удаления списка
                  onClick={() => removeList(item)} 
                  
                  className="list__remove-icon" 
                  src={removeSvg} 
                  alt='remove icon' 
                />}
              </li>
            )
          })
        }
          
        </ul>
    </>
  )
}

export default List;