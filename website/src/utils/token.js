export class Token{
    constructor(total_supply, k_last, lock, minimum_liquidity, reserve_a, reserve_b) {
        this.total_supply = total_supply;
        this.k_last = k_last;
        this.lock = lock;
        this.minimum_liquidity = minimum_liquidity;
        this.reserve_a = reserve_a;
        this.reserve_b = reserve_b;
    }
}