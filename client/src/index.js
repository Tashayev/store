import React, {createContext} from 'react';//16п.
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import DeviceStore from "./store/DeviceStore";//19п.
//Теперь нужно это состояние опрокинуть на компоненты
export const Context = createContext(null)
//В типичном приложении React данные передаются сверху вниз (от родителя к дочернему элементу) через свойства,
// но такое использование может быть громоздким для определенных типов свойств (например, предпочтения локали,
// темы пользовательского интерфейса), которые требуются для многих компонентов в приложении.
// Context предоставляет способ обмена такими значениями между компонентами без необходимости явно передавать свойство
// через каждый уровень дерева.
// Provider - позволяет дочерним компонентам, использующим этот контекст, подписаться на его изменения.
// Компонент Provider принимает проп value, который будет передан во все компоненты, использующие этот контекст
// и являющиеся потомками этого компонента Provider.
console.log(process.env.REACT_APP_API_URL)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(

  <Context.Provider value={{
      user: new UserStore(),
      device: new DeviceStore(),//19п.
  }}>
    <App />
  </Context.Provider>,

    //В пропс value можно передавать данные. В нашем случае объект, который создан в UserStore.js
);


