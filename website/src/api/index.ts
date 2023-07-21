import {
    AccountData,
    ConnectData,
    DecryptRecordData,
    Execute,
    MapConfig, MintPublicParams,
    QueryRecords, Records,
    Sign,
    Transfer
} from "../model";
import request from "./request";
import {MAPPING_CONFIG, MAPPING_CONFIG_KEY, MINT_PUBLIC, PROGRAM_LATEST} from "../constants";

/**
 * 连接钱包 返回 账户
 * @constructor
 */
export async function connectWalletPlugin(): Promise<ConnectData> {
    console.log('准备链接钱包授权');
    // @ts-ignore
    let account = await window.wallet.features['standard:connect'].connect()
    return account
}

/**
 * 钱包是否连接
 */
export function walletConnected() {
    // @ts-ignore
    let connected = window.wallet.connected
    return connected
}

export function walletAccount(): Promise<AccountData> {
    // @ts-ignore
    let accounts = window.wallet.accounts
    return accounts
}

/**
 * 解密record 返回 解密后的数据
 * @param record
 */
export async function decryptRecord(record: string): Promise<DecryptRecordData[]> {
    try {
        let records = [] as string[]
        records.unshift(record)
        // @ts-ignore
        let recordData = await window.wallet.features['standard:decrypt'].decrypt(records);
        console.log(recordData);
        return recordData.result
    } catch (e) {
        return [] as DecryptRecordData[]
    }
}

export async function transfer(params: Transfer): Promise<any> {
    try {
        // @ts-ignore
        let transferRes = await window.wallet.features['standard:transfer'].transfer(params);
        return transferRes;
    } catch (e) {
        return "";
    }
};

export async function sign(params: Sign): Promise<any> {
    try {
        // @ts-ignore
        let signResult = await window.wallet.features['standard:sign'].sign(params);
        console.log(signResult);
        return JSON.parse(signResult);
    } catch (e) {
        return "";
    }
}

export async function queryRecords(params: QueryRecords): Promise<Records[]> {
    try {
        // @ts-ignore
        let signResult = await window.wallet.features['standard:records'].records(params);
        return await signResult.result;
    } catch (e) {
        return [];
    }
}

export async function execute(params: Execute): Promise<any> {
    try {
        // @ts-ignore
        let executeRes = await window.wallet.features['standard:execute'].execute(params);
        console.log(executeRes);
        return JSON.parse(executeRes);
    } catch (e) {
    }
}

// 取消授权
export async function cancelPre(): Promise<any> {
    try {
        // @ts-ignore
        let result = await window.wallet.features['standard:cancelPre'].cancelPre();
        console.log(result);
        return result;
    } catch (e) {
    }
}

// 断开连接
export async function walletDisConnect() {
    console.log('准备取消链接');
    // @ts-ignore
    window.wallet.features['standard:disConnect'].disConnect();
}

/**
 * 查询地址有没有添加过流动性
 * @param address
 */
export async function getAccountMappingValue(address: string) {
    const url = `https://vm.aleo.org/api/testnet3/program/${PROGRAM_LATEST}/mapping/account/${address}`;
    const resp = await request.get(url);
    return resp.json();
}

/**
 * 查询configMapping
 */
export async function getConfigMappingValueFromV1(): Promise<MapConfig> {
    try {
        const config = await getMappingValue(PROGRAM_LATEST, MAPPING_CONFIG, MAPPING_CONFIG_KEY)
        // 将字符串中的类型标识符 'u64' 替换为空字符串 ''
        const cleanedStr = config.replace(/u64/g, '');
        // 将字符串中的属性名加上双引号，变成标准的 JSON 格式
        const jsonStr = cleanedStr.replace(/(\w+)\s*:/g, '"$1":');
        // 将 JSON 格式的字符串转换为 JavaScript 对象
        const token = JSON.parse(jsonStr, (key, value) => {
            if (typeof value === 'string' && !isNaN(Number(value))) {
                return parseInt(value);
            }
            return value;
        });
        return token;
    } catch (e) {
        return {} as MapConfig
    }
}

export async function getPublicToken(accountName:string,address: string) {
    const url = `https://vm.aleo.org/api/testnet3/program/${PROGRAM_LATEST}/mapping/${accountName}/${address}`;
    const resp = await request.get(url);
    return resp.json();
}


export async function getMappingValue(programName: string, mapName: string, mapKey: string) {
    const url = `https://vm.aleo.org/api/testnet3/program/${programName}/mapping/${mapName}/${mapKey}`;
    const resp = await request.get(url);
    return resp.json();
}

/**
 * add
 */
export async function mintPublic(param: MintPublicParams) {
    let data = {
        programID: PROGRAM_LATEST,
        functionName: MINT_PUBLIC,
        inputs: `${param.tokenARecord}&&${param.tokenA}u64&&${param.tokenBRecord}&&${param.tokenB}u64`
    }
    return await execute(data)
}