export interface ConnectData {
    address: string;
}

export interface AccountData {
    address: string;
    balance: number;
}

export interface DecryptRecordData {
    address: string,
    dyRecord: string
    record: string
}

export interface RecordData {
    owner: string;
    microcredits: string;
    _nonce: string;
}

export interface Transfer {
    to: string;
    amount: string;
}

export interface Sign {
    message: string;
}

export interface QueryRecords {
    program: string;
}

export interface Execute {
    programID: string;
    functionName: string;
    inputs: string;
}

export interface MapConfig {
    total_supply: string, // lp 流通性系数
    k_last: string, //
    lock: boolean, //
    minimum_liquidity: string, // 最小 流通性系数
    reserve_a: string, // tokenA数量
    reserve_b: string // tokenB数量
}

export interface Records {
    identifier: string
    functionName: string
    address: string,
    programID: string,
    record: string
}

export interface MintPublicParams {
    tokenARecord: string
    tokenBRecord: string
    tokenA: string,
    tokenB: string
}

export interface TokenType {
    id: number
    icon: string
    tokenKey: string
    publicTokenKey: string
    tokenValue: string,
}

export interface BlockieProps {
    seed: string;
    size?: number | undefined;
    scale?: number | undefined;
    color?: string | undefined;
    bgColor?: string | undefined;
    spotColor?: string | undefined;
    className?: string | undefined;
}