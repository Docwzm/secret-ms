import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Provider } from 'react-redux'
import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import state from './redux'
import reducer from './redux/reducer'

let store = createStore(reducer,state,applyMiddleware(thunk))

store.subscribe(() => {
    console.log(store.getState());
})

ReactDOM.render(<Provider store={store}>
    <LocaleProvider locale={zhCN}><App /></LocaleProvider>
</Provider>, document.getElementById('root'));


