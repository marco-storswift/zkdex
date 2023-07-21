import {Records} from "../model";

const RecordUtils = {
    /**
     * 解析record金额
     * @param record
     */
    analyzeCredits(record: string) {
        let credits = 0;
        // 使用正则表达式提取键值对
        const regex = /(\w+):\s*([\w\.]+)/g;
        const matches = record.matchAll(regex);
        // 将键值对转换为对象
        const obj: Record<string, string> = {};
        for (const match of matches) {
            obj[match[1]] = match[2];
        }
        try {
            credits = this.stringToCredits(obj.amount);
        } catch (e) {
            // console.log(e);
        }
        return credits;
    },
    stringToCredits(value: string) {
        return Number(value.split("u")[0]);
    },
    /**
     * 根据金额和名称查询record
     * @param records
     * @param balance
     * @param tokenName
     */
    finRecordByName(records: Records[], balance: number, tokenName: string) {
        let find = {} as Records
        records && records.forEach((item) => {
            if (tokenName === item.identifier && !find.record) {
                let thisBalance = RecordUtils.analyzeCredits(item.record)
                if (thisBalance >= balance && !find.record) {
                    find = item
                }
            }
        })
        return find
    },
    /**
     * 计算token的金额
     */
    calculateTokenBalance(records: Records[], tokenName: string) {
        let balance = 0
        records && records.forEach((item) => {
            if (tokenName === item.identifier){
                let thisBalance = RecordUtils.analyzeCredits(item.record)
                balance += thisBalance
            }
        })
        return balance
    }
}

export default RecordUtils