import XLSX from 'xlsx';

export default class Excel {
    constructor() {//constructor是一个构造方法，用来接收参数
       
    }

    importExcel(file,keysObj) {
        return new Promise((resolve,reject) => {
            if (!file) reject({msg:'file is null'});
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = function (e) {
                const data = this.result;
                const wb = XLSX.read(data, {
                    type: 'buffer'
                })
                const params = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                if(keysObj){
                    params.map(item => {
                        for(let x in item){
                            item[keysObj[x]] = item[x]
                            delete item[x]
                        }
                        return item;
                    })
                }
                resolve(params)
            }
        })
        
    }
    exportExcel(dataArr,keysObj,fileName) {
        console.log(this)
        const datas = dataArr;
        const wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };//这里的数据是用来定义导出的格式类型
        const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} };
        const data = datas.map((item,index) => {
            let _item = {}
            for(let x in keysObj){
                _item[x] = item[keysObj[x]]
            }
            return _item
        })
        wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data);//通过json_to_sheet转成单页(Sheet)数据
        this.saveAs(new Blob([this.s2ab(XLSX.write(wb, wopts))], { type: "application/octet-stream" }), (fileName?fileName:"demo") + '.' + (wopts.bookType == "biff2" ? "xls" : wopts.bookType));
    }

    // 导出excel
    saveAs(obj, fileName) {
        var tmpa = document.createElement("a");
        tmpa.download = fileName || "下载";
        tmpa.href = URL.createObjectURL(obj); //绑定a标签
        tmpa.click(); //模拟点击实现下载
        setTimeout(function () { //延时释放
            URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
        }, 100);
    }

    s2ab(s) {
        if (typeof ArrayBuffer !== 'undefined') {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        } else {
            var buf = new Array(s.length);
            for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
    }
}
