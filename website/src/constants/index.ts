import {TokenType} from "../model";

export const MAPPING_CONFIG = "config"
export const MAPPING_CONFIG_KEY = "1field"

export const PROGRAM_LATEST = "uniswap_v5.aleo"

export const MINT_PUBLIC = "mint_public"
export const BURN_PUBLIC = "burn_public"

// TODO public 只用输入数字
export const SWAP_A_TO_B_PUBLIC = "swap_a_to_b_public"
export const SWAP_B_TO_A_PUBLIC = "swap_b_to_a_public"

// a-b
export const SWAP_A_TO_B_PRIVATE = "swap_a_to_b_private"

/**
 * b-a
 */
export const SWAP_B_TO_A_PRIVATE = "swap_b_to_a_private"

export const TOKENS = [
    {
        id: 1,
        icon: "0x0000000000220000000000000000000000000002",
        tokenKey: "mint_private_a",
        publicTokenKey: "mint_public_a",
        tokenValue: "tokenA",
    }, {
        id: 2,
        icon: "0x000000000000000000000011000000000000003",
        tokenKey: "mint_private_b",
        publicTokenKey: "mint_public_b",
        tokenValue: "tokenB",
    }
] as TokenType[]
