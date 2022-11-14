import React from "react";
import classNames from "classnames";
import Badge from '../Badge';

import removeSvg from '../../assets/img/remove.svg'

import './List.scss'

const List = ({items, isRemovable, onClick, onRemove}) => {
  // console.log(items, isRemovable);
  const removeList = (item) => {
    if (window.confirm('Вы действительно хотите удалить список?')) {
      onRemove(item);
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
                  {(item.icon) ? item.icon : <Badge color={item.color} />}
                </i>
                <span>{item.name}</span>
                {isRemovable && 
                <img 
                  // удаляем список
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