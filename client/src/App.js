import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./companents/AppRouter";
import NavBar from "./companents/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";

// 5п. Импорт реакта. App.js является основным компонентом приложения

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)//51п. useState - будет правдой, до тех пор пока загрузка не завершиться
    useEffect(()=>{//51п. Оно принимает 1 параметром функцию, 2 массив зависимости. Если массив пустой оно отработает 1 раз
        setTimeout(()=>{//51п. В данном случае имитация задержки
            check().then(data=>{
                user.setUser(true)
                user.setIsAuth(true)
            }).finally(()=> setLoading(false))
        }, 1000)
    }, [])
    if(loading){
        return <Spinner animation={"grow"}/>
    }
      return (//10п. React Router хранит интерфейс приложения синхронизированным с URL на браузере.
      // Он разрешает вам определять динамичные URL, но соответствующие философии (Одностраничное приложение) у
      // React Router предоставляет вам 2 компонента это <BrowserRouter> & <HashRouter>.
      // <BrowserRouter> более широко используется, он использует History API имеющийся в HTML5 для мониторинга истории
      // вашего роутера.
      //21п. Добавляем навбар здесь чтобы отражался везде.
    <BrowserRouter>
        <NavBar />
        <AppRouter />
      {/* WORKING 5п. Проверка сервера*/}
    </BrowserRouter>
  );
})

export default App;
