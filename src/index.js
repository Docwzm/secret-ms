import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Provider } from 'react-redux'
import store from './redux/store'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

ReactDOM.render(<Provider store={store}>
    <LocaleProvider locale={zhCN}><App /></LocaleProvider>
</Provider>, document.getElementById('root'));


