import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {LocaleProvider} from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN';

ReactDOM.render(<LocaleProvider locale={zhCN}><App /></LocaleProvider>, document.getElementById('root'));


