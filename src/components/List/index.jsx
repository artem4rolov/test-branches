import React from "react";
import classNames from "classnames";
import axios from "axios";

import Badge from '../Badge';

import removeSvg from '../../assets/img/remove.svg'

import './List.scss'

const List = ({items, isRemovable, onClick, onRemove, onClickItem, activeItem}) => {
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
              <li 
                key={index} 
                // ставим className active тому элементу, id которого совпадает с id item, на каждой итерации перебора items.map
                // но для начала проверяем, есть ли вообще activeItem (изначально в state App.js передается null)
                className={classNames(item.className, {'active': item.active ? 
                item.active : activeItem && activeItem.id === item.id})}
                // передаем item, на который кликнули в компонент App.js
                onClick={() => onClickItem(item)}
              >
                <i>
                  {(item.icon) ? item.icon : <Badge color={item.color.name} />}
                </i>
                
                <span>
                  {item.name}
                  {/* для вывода количества дел в списке для начала проверяем, есть ли вообще дела в списке, и что количество этих дел > 0 */}
                  {item.tasks && ` (${item.tasks.length})`}</span>
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