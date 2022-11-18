import React, { useState, useEffect } from "react";
import axios from "axios";
// импортируем компоненты из корневого indes.js в папке components
import { AddList, List, Tasks } from "./components";
import { act } from "@testing-library/react";

// import DB from "./assets/db.json";
// вместо fetch используем axios

// расширения файлов .js говорят о том, что в компоненте есть и вёрстка, и сложная логика
// расширения файлов .jsx говорят о том, что в компоненте есть только вёрстка
function App() {
  // создаем массив названий списков дел и его цвета (кружки)
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  // используя хук useEffct убеждаемся в том, что компонент точно зарендерен на страницу, и только после рендера мы вызываем GET запрос (по аналогии с жизненным циклом componentDidMount),
  //  указываем в конце пустой массив, чтобы запрос вызвался один раз (при первом монтировании компонента), или, напишем вместо пустого массива массив lists - например при изменении таблицы lists (как только добавили новый список дел - снова вызываем GET запрос)
  useEffect(() => {
    // через axios.get делаем GET запрос и получаем из response только объект data (данные), потому что fetch выводит все объекты (config, headers, request, status и тд.)
    // в строке прописываем логику ( lists?_expand=color ) - наша таблица lists (списки дел) должна получать по colorId (json ищет по ключу colors таблицу с цветами) цвет из таблицы colors
    // в строке прописываем логику ( &_embed=tasks ) - аша таблица tasks (дела) имеет listId, она обращается к конкретному списку дел (из таблицы lists)
    axios
      .get("http://localhost:3001/lists?_expand=color&_embed=tasks")
      .then(({ data }) => {
        setLists(data);
      });
    // по аналогии с lists получаем таблицу с цветами (colors)
    axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

  // функция добавления нового списка с задачами в state (в базу данных добавляется в компоненте List)
  const onAddList = (obj) => {
    // пихаем новый объект (название списка дел) из компонента AddList в наш state
    const newList = [...lists, obj];
    // меняем state
    setLists(newList);
  };

  // функция добавления задачи в конкретный список
  const onAddTask = (listId, taskObj) => {
    // пихаем новый объект (новая задача) из компонента addTaskForm в наш state
    const newList = lists.map((list) => {
      // если переданный id из addTaskForm совпадает с каким-либо id списка задач из БД таблицы lists
      if (list.id === listId) {
        // тогда берем весь список дел (tasks) в этом списке задач (list) и добавляем туда новую задачу (taskObj)
        list.tasks = [...list.tasks, taskObj];
      }
      return list;
    });
    // меняем state
    setLists(newList);
  };

  // функция изменения названия списка с задачами
  const onEditListTitle = (id, title) => {
    // пробегаем по нашей таблице lists
    const newList = lists.map((list) => {
      // если переданный id из Tasks совпадает с каким-либо id списка задач из БД таблицы lists
      if (list.id === id) {
        // меняем название списка задач
        list.name = title;
      }
      return list;
    });
    // меняем state
    setLists(newList);
  };

  return (
    <div className="todo">
      <div className="todo__sidebar">
        {/* Верхняя кнопка "Все задачи" */}
        <List
          items={[
            {
              active: true,
              icon: (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001V8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z"
                    fill="black"
                  />
                </svg>
              ),
              name: "Все задачи",
            },
          ]}
        />
        {/* Наши списки дел, проверяем есть ли они - рендерим, нет их - надпись "загрузка" */}
        {lists ? (
          <List
            items={lists}
            isRemovable
            onRemove={(id) => {
              const newLists = lists.filter((item) => item.id !== id);
              setLists(newLists);
            }}
            onClickItem={(item) => {
              setActiveItem(item);
            }}
            activeItem={activeItem}
          />
        ) : (
          "Загрузка..."
        )}

        {/* кнопка "добавить список" + модальное окно с цветами */}
        <AddList onAdd={onAddList} colors={colors} />
      </div>

      {/* наши дела в каждом списке дел */}
      <div className="todo__tasks">
        {/* компонент Tasks не будет рендериться до тех пор, пока в lists что-то не появится, поскольку изначально lists = null */}
        {lists && activeItem && (
          <Tasks
            // передаем активный список, на который кликнули
            list={activeItem}
            // передаем функцию из Tasks в App.js для смены названия списка дел
            onEditTitle={(id, title) => {
              onEditListTitle(id, title);
            }}
            onAddTask={onAddTask}
          />
        )}
      </div>
    </div>
  );
}

export default App;
