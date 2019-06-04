/**
 * 菜单组件
 */
import React, { Component } from 'react';
import { Input, Icon, Select } from 'antd';
import '../assets/styles/SearchSelect.scss'
const Option = Select.Option;

class SearchSelect extends Component {

    state = {
        crfPatientList: [],//搜索框搜索数据列表
        searchFlag: true,//搜索列表数据flag
        iconSearchFlag: true,
    }

    //搜索框拉下列表搜索数据标红
    filterSearchValue = (str) => {
        if (str) {
            let index = str.toString().indexOf(this.state.searchValue);
            if (index >= 0) {
                let newStr = <span>{str.toString().slice(0, index)}<b style={{ color: 'red', fontStyle: 'normal' }}>{str.toString().slice(index, this.state.searchValue.length)}</b>{str.toString().slice(index + this.state.searchValue.length)}</span>
                return newStr;
            }
        }
        return str
    }

    //搜索框聚焦事件
    searchFocus = (e) => {
        e.stopPropagation();
        if (e.target.value) {
            this.setState({
                iconSearchFlag: false,
                searchFlag: true
            })
        }
    }

    searchBlur = (e) => {
        clearTimeout(this.blurtimer)
        this.blurtimer = setTimeout(() => {
            this.setState({
                searchFlag: false,
                iconSearchFlag: true
            })
        }, 100)
    }

    // 选择搜索框下拉列表选项
    handleSearchChange = (mobile) => {
        this.props.onSelect(mobile)

    }
    // /搜索框change
    onSearch = (value) => {
        this.setState({
            searchValue: value
        })
        if (!this.state.searchFlag) {
            this.setState({
                searchFlag: true
            })
        }
        clearTimeout(this.timer)
        if (!value) {
            this.setState({
                searchFlag: false
            })
        } else {
            this.timer = setTimeout(() => {
                this.props.onChange(value)
            }, 200)
        }
    }

    render() {
        return <div className="search-select-wrap">
            <Icon type="search" className="search-icon"></Icon>
            <Select
                className="search-select"
                style={this.props.style}
                showSearch
                allowClear={true}
                placeholder="患者姓名/手机号/编号"
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.onSearch}
                onSelect={this.handleSearchChange}
            >
                {
                    this.props.options.map((item, index) => <Option className="search-select-drowWrap" key={item.id} value={item.mobile}>
                        <span className="name">{this.filterSearchValue(item.realName)}</span>
                        <span className="mobile">{this.filterSearchValue(item.mobile)}</span>
                        <span className="num">{this.filterSearchValue(item.patientNo)}</span>
                        <Icon type="right" />
                    </Option>)
                }
            </Select>
        </div>
    }
}

export default SearchSelect
