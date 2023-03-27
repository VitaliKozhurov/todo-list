import React from 'react';

type PropsType = {
   track1: string,
   track2?: string | number, // Если пропсы могут не прийти
   tasks: Array<TaskType>, // Уточняем что конкретно мы будем передавать в массиве
}

type TaskType = {
   id: number,
   title: string,
   isDone: boolean
}

export const TodoList = (props: PropsType) => {
   return (
      <div>
         <h3>{props.track1}</h3>
         <h3>{props.track2}</h3>
         <div>
            <input />
            <button>+</button>
         </div>
         <ul>
            {props.tasks.map(el => (
               <li key={el.id}>
                  <input
                     type={"checkbox"}
                     checked={el.isDone}
                  >
                  </input>
                  <span>
                     {el.title}
                  </span>
               </li>
            ))}
         </ul>
         <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
         </div>
      </div>
   )
}
