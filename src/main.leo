// The 'uniswap' program.


program uniswap_v5.aleo {
    // On-chain storage of an `account_a` map, with `address` as the key,
    // and `u64` as the value.
    mapping account_a: address => u64;

    record tokenA {
        // The tokenA owner.
        owner: address,
        // The tokenA symbol.
        symbol: field,
        // The tokenA amount.
        amount: u64,
    }

    /* Mint */

    // The function `mint_public` issues the specified tokenA amount for the tokenA receiver publicly on the network.
    transition mint_public_a(public receiver: address, public amount: u64) {
        // Mint the tokenAs publicly by invoking the computation on-chain.
        if self.caller != aleo1y3yp6kaq4tl04u06fy4k43kvcl4azlddy0fsamdj6smsa6rnxg9sk09ltz as address {
            assert(amount<=1000u64);
        }
        return then finalize(receiver, amount);
    }

    finalize mint_public_a(public receiver: address, public amount: u64) {
        // Increments `account_a[receiver]` by `amount`.
        // If `account_a[receiver]` does not exist, it will be created.
        // If `account_a[receiver] + amount` overflows, `mint_public` is reverted.
        let current_amount: u64 = Mapping::get_or_use(account_a, receiver, 0u64);
        Mapping::set(account_a, receiver, current_amount + amount);
    }

    // The function `mint_private` initializes a new record with the specified amount of tokenAs for the receiver.
    transition mint_private_a(receiver: address, amount: u64) -> tokenA {
        if self.caller != aleo1y3yp6kaq4tl04u06fy4k43kvcl4azlddy0fsamdj6smsa6rnxg9sk09ltz as address {
            assert(amount<=1000u64);
        }
        return tokenA {
            owner: receiver,
            symbol: 128021892001345field,
            amount: amount,
        };
    }

    /* Transfer */
    transition transfer_public_a(public receiver: address, public amount: u64) {
        // Transfer the tokenAs publicly, by invoking the computation on-chain.
        return then finalize(self.caller, receiver, amount);
    }

    finalize transfer_public_a(public sender: address, public receiver: address, public amount: u64) {
        // Decrements `account_a[sender]` by `amount`.
        // If `account_a[sender]` does not exist, it will be created.
        // If `account_a[sender] - amount` underflows, `transfer_public` is reverted.
        let sender_amount: u64 = Mapping::get_or_use(account_a, sender, 0u64);
        Mapping::set(account_a, sender, sender_amount - amount);
        // Increments `account_a[receiver]` by `amount`.
        // If `account_a[receiver]` does not exist, it will be created.
        // If `account_a[receiver] + amount` overflows, `transfer_public` is reverted.
        let receiver_amount: u64 = Mapping::get_or_use(account_a, receiver, 0u64);
        Mapping::set(account_a, receiver, receiver_amount + amount);
    }

    // The function `transfer_private` sends the specified tokenA amount to the tokenA receiver from the specified tokenA record.
    transition transfer_private_a(sender: tokenA, receiver: address, amount: u64) -> (tokenA, tokenA) {
        // Checks the given tokenA record has sufficient balance.
        // This `sub` operation is safe, and the proof will fail if an overflow occurs.
        // `difference` holds the change amount to be returned to sender.
        let difference: u64 = sender.amount - amount;

        // Produce a tokenA record with the change amount for the sender.
        let remaining: tokenA = tokenA {
            owner: sender.owner,
            symbol: 128021892001345field,
            amount: difference,
        };

        // Produce a tokenA record for the specified receiver.
        let transferred: tokenA = tokenA {
            owner: receiver,
            symbol: 128021892001345field,
            amount: amount,
        };

        // Output the sender's change record and the receiver's record.
        return (remaining, transferred);
    }

    // The function `transfer_private_to_public` turns a specified tokenA amount from a tokenA record into public tokenAs for the specified receiver.
    // This function preserves privacy for the sender's record, however it publicly reveals the tokenA receiver and the tokenA amount.
    transition transfer_private_to_public_a(sender: tokenA, public receiver: address, public amount: u64) -> tokenA {
        // Checks the given tokenA record has a sufficient tokenA amount.
        // This `sub` operation is safe, and the proof will fail if an underflow occurs.
        // `difference` holds the change amount for the caller.
        let difference: u64 = sender.amount - amount;

        // Produces a tokenA record with the change amount for the caller.
        let remaining: tokenA = tokenA {
            owner: sender.owner,
            symbol: 128021892001345field,
            amount: difference,
        };

        // Output the sender's change record.
        // Increment the tokenA amount publicly for the tokenA receiver.
        return remaining then finalize(receiver, amount);
    }

    finalize transfer_private_to_public_a(public receiver: address, public amount: u64) {
        // Increments `account_a[receiver]` by `amount`.
        // If `account_a[receiver]` does not exist, it will be created.
        // If `account_a[receiver] + amount` overflows, `transfer_private_to_public` is reverted.
        let current_amount: u64 = Mapping::get_or_use(account_a, receiver, 0u64);
        Mapping::set(account_a, receiver, current_amount + amount);
    }

    // The function `transfer_public_to_private` turns a specified tokenA amount from `account_a` into a tokenA record for the specified receiver.
    // This function preserves privacy for the receiver's record, however it publicly reveals the caller and the specified tokenA amount.
    transition transfer_public_to_private_a(public receiver: address, public amount: u64) -> tokenA {
        // Produces a tokenA record for the tokenA receiver.
        let transferred: tokenA = tokenA {
            owner: receiver,
            symbol: 128021892001345field,
            amount: amount,
        };

        // Output the receiver's record.
        // Decrement the tokenA amount of the caller publicly.
        return transferred then finalize(self.caller, amount);
    }

    finalize transfer_public_to_private_a(public sender: address, public amount: u64) {
        // Decrements `account_a[sender]` by `amount`.
        // If `account_a[sender]` does not exist, it will be created.
        // If `account_a[sender] - amount` underflows, `transfer_public_to_private` is reverted.
        let current_amount: u64 = Mapping::get_or_use(account_a, sender, 0u64);
        Mapping::set(account_a, sender, current_amount - amount);
    }

    // On-chain storage of an `account_b` map, with `address` as the key,
    // and `u64` as the value.
    mapping account_b: address => u64;

    record tokenB {
        // The tokenB owner.
        owner: address,
        // The tokenB symbol.
        symbol: field,
        // The tokenB amount.
        amount: u64,
    }

    /* Mint */

    // The function `mint_public` issues the specified tokenB amount for the tokenB receiver publicly on the network.
    transition mint_public_b(public receiver: address, public amount: u64) {
        // Mint the tokenBs publicly by invoking the computation on-chain.
        if self.caller != aleo1y3yp6kaq4tl04u06fy4k43kvcl4azlddy0fsamdj6smsa6rnxg9sk09ltz as address {
            assert(amount<=1000u64);
        }
        return then finalize(receiver, amount);
    }

    finalize mint_public_b(public receiver: address, public amount: u64) {
        // Increments `account_b[receiver]` by `amount`.
        // If `account_b[receiver]` does not exist, it will be created.
        // If `account_b[receiver] + amount` overflows, `mint_public` is reverted.
        let current_amount: u64 = Mapping::get_or_use(account_b, receiver, 0u64);
        Mapping::set(account_b, receiver, current_amount + amount);
    }

    // The function `mint_private` initializes a new record with the specified amount of tokenBs for the receiver.
    transition mint_private_b(receiver: address, amount: u64) -> tokenB {
        if self.caller != aleo1y3yp6kaq4tl04u06fy4k43kvcl4azlddy0fsamdj6smsa6rnxg9sk09ltz as address {
            assert(amount<=1000u64);
        }
        return tokenB {
            owner: receiver,
            symbol: 128021892001346field,
            amount: amount,
        };
    }

    /* Transfer */
    transition transfer_public_b(public receiver: address, public amount: u64) {
        // Transfer the tokenBs publicly, by invoking the computation on-chain.
        return then finalize(self.caller, receiver, amount);
    }

    finalize transfer_public_b(public sender: address, public receiver: address, public amount: u64) {
        // Decrements `account_b[sender]` by `amount`.
        // If `account_b[sender]` does not exist, it will be created.
        // If `account_b[sender] - amount` underflows, `transfer_public` is reverted.
        let sender_amount: u64 = Mapping::get_or_use(account_b, sender, 0u64);
        Mapping::set(account_b, sender, sender_amount - amount);
        // Increments `account_b[receiver]` by `amount`.
        // If `account_b[receiver]` does not exist, it will be created.
        // If `account_b[receiver] + amount` overflows, `transfer_public` is reverted.
        let receiver_amount: u64 = Mapping::get_or_use(account_b, receiver, 0u64);
        Mapping::set(account_b, receiver, receiver_amount + amount);
    }

    // The function `transfer_private` sends the specified tokenB amount to the tokenB receiver from the specified tokenB record.
    transition transfer_private_b(sender: tokenB, receiver: address, amount: u64) -> (tokenB, tokenB) {
        // Checks the given tokenB record has sufficient balance.
        // This `sub` operation is safe, and the proof will fail if an overflow occurs.
        // `difference` holds the change amount to be returned to sender.
        let difference: u64 = sender.amount - amount;

        // Produce a tokenB record with the change amount for the sender.
        let remaining: tokenB = tokenB {
            owner: sender.owner,
            symbol: 128021892001346field,
            amount: difference,
        };

        // Produce a tokenB record for the specified receiver.
        let transferred: tokenB = tokenB {
            owner: receiver,
            symbol: 128021892001346field,
            amount: amount,
        };

        // Output the sender's change record and the receiver's record.
        return (remaining, transferred);
    }

    // The function `transfer_private_to_public` turns a specified tokenB amount from a tokenB record into public tokenBs for the specified receiver.
    // This function preserves privacy for the sender's record, however it publicly reveals the tokenB receiver and the tokenB amount.
    transition transfer_private_to_public_b(sender: tokenB, public receiver: address, public amount: u64) -> tokenB {
        // Checks the given tokenB record has a sufficient tokenB amount.
        // This `sub` operation is safe, and the proof will fail if an underflow occurs.
        // `difference` holds the change amount for the caller.
        let difference: u64 = sender.amount - amount;

        // Produces a tokenB record with the change amount for the caller.
        let remaining: tokenB = tokenB {
            owner: sender.owner,
            symbol: 128021892001346field,
            amount: difference,
        };

        // Output the sender's change record.
        // Increment the tokenB amount publicly for the tokenB receiver.
        return remaining then finalize(receiver, amount);
    }

    finalize transfer_private_to_public_b(public receiver: address, public amount: u64) {
        // Increments `account_b[receiver]` by `amount`.
        // If `account_b[receiver]` does not exist, it will be created.
        // If `account_b[receiver] + amount` overflows, `transfer_private_to_public` is reverted.
        let current_amount: u64 = Mapping::get_or_use(account_b, receiver, 0u64);
        Mapping::set(account_b, receiver, current_amount + amount);
    }

    // The function `transfer_public_to_private` turns a specified tokenB amount from `account_b` into a tokenB record for the specified receiver.
    // This function preserves privacy for the receiver's record, however it publicly reveals the caller and the specified tokenB amount.
    transition transfer_public_to_private_b(public receiver: address, public amount: u64) -> tokenB {
        // Produces a tokenB record for the tokenB receiver.
        let transferred: tokenB = tokenB {
            owner: receiver,
            symbol: 128021892001346field,
            amount: amount,
        };

        // Output the receiver's record.
        // Decrement the tokenB amount of the caller publicly.
        return transferred then finalize(self.caller, amount);
    }

    finalize transfer_public_to_private_b(public sender: address, public amount: u64) {
        // Decrements `account_b[sender]` by `amount`.
        // If `account_b[sender]` does not exist, it will be created.
        // If `account_b[sender] - amount` underflows, `transfer_public_to_private` is reverted.
        let current_amount: u64 = Mapping::get_or_use(account_b, sender, 0u64);
        Mapping::set(account_b, sender, current_amount - amount);
    }


    struct Config {
        total_supply: u64, // lp
        k_last: u64,   //now not use
        lock: bool,    // todo
        minimum_liquidity: u64,
        reserve_a: u64,
        reserve_b: u64,
    }

    // Mapping of transaction pairs config
    mapping config: field => Config;

    // Mapping of address to number of lp
    mapping account: address => u64;

    record LiquidityPool{
        owner: address,
        symbol: field,
        amount: u64,
    }

    transition mint_private(token_a: tokenA, amount_a: u64, token_b: tokenB, amount_b: u64) -> (tokenA, tokenB, LiquidityPool){
        assert(token_a.amount - amount_a>=0u64);
        assert(token_b.amount - amount_b>=0u64);

        let difference_a: u64 = token_a.amount - amount_a;
        let remaining_a: tokenA = tokenA {
            owner: token_a.owner,
            symbol: 128021892001345field,
            amount: difference_a,
        };
        let difference_b: u64 = token_b.amount - amount_b;
        let remaining_b: tokenB = tokenB {
            owner: token_b.owner,
            symbol: 128021892001346field,
            amount: difference_b,
        };

        //TODO Cross border risk
        let lp_amount: u64 = square_root(amount_a * amount_b);

        let lp: LiquidityPool = LiquidityPool {
            owner: self.caller,
            symbol: 27760field,
            amount: lp_amount
        };

        return (remaining_a, remaining_b, lp) then finalize(self.caller, lp_amount, amount_a, amount_b);
    }

    finalize mint_private(owner: address, lp_amount: u64, amount_a: u64, amount_b: u64){
        //TODO token_a & token_b hash as key
        let current_config: Config = Mapping::get_or_use(config, 1field,
            Config {
                total_supply: 0u64,
                k_last: 0u64,
                lock: false,
                minimum_liquidity: 1000u64,
                reserve_a: 1u64,
                reserve_b: 1u64,
            }
        );

        let liquidity_a: u64 = amount_a.mul_wrapped(current_config.total_supply).div_wrapped(current_config.reserve_a);
        let liquidity_b: u64 = amount_b.mul_wrapped(current_config.total_supply).div_wrapped(current_config.reserve_b);
        let liquidity: u64 = 0u64;
        if (liquidity_a > liquidity_b){
            liquidity = liquidity_b;
        }else{
            liquidity = liquidity_a;
        }

        let bfirst: bool = current_config.total_supply == 0u64;
        let new_total_supply:u64 = 0u64;
        let new_k_last:u64 = 0u64;
        let new_lock:bool = false;
        let new_minimum_liquidity:u64 = 1000u64;
        let new_reserve_a:u64 = 1u64;
        let new_reserve_b:u64 = 1u64;

        if bfirst{
        assert(lp_amount >= new_minimum_liquidity);
        }

        if bfirst {
            new_total_supply =  lp_amount;
        } else {
            new_total_supply = current_config.total_supply + liquidity;
        }

        if bfirst {
            new_k_last = 0u64;
        } else {
            new_k_last = amount_a * amount_b;
        }

        if bfirst {
            new_lock = false;
        } else {
            new_lock = current_config.lock;
        }

        if bfirst {
            new_reserve_a = amount_a;
        } else {
            new_reserve_a = current_config.reserve_a + amount_a;
        }

        if bfirst {
            new_reserve_b = amount_b;
        } else {
            new_reserve_b = current_config.reserve_b+ amount_b;
        }

        let new_config: Config = Config {
            total_supply: new_total_supply,
            k_last: new_k_last,
            lock: new_lock,
            minimum_liquidity: new_minimum_liquidity,
            reserve_a: new_reserve_a,
            reserve_b: new_reserve_b
        };
        Mapping::set(config, 1field, new_config);
    }

    transition mint_private_to_public(public lp: LiquidityPool, public amount: u64) -> (LiquidityPool){
        assert(lp.amount - amount>=0u64);

        let difference: u64 = lp.amount - amount;
        let remaining: LiquidityPool = LiquidityPool {
            owner: lp.owner,
            symbol: 27760field,
            amount: difference,
        };

        return remaining then finalize(self.caller, amount);
    }

    finalize mint_private_to_public(public receiver: address, public amount: u64) {
        let current_amount: u64 = Mapping::get_or_use(account, receiver, 0u64);
        Mapping::set(account, receiver, current_amount + amount);
    }


    transition mint_public(public token_a: tokenA, public amount_a: u64, public token_b: tokenB, public amount_b: u64) -> (tokenA, tokenB){
        assert(token_a.amount - amount_a>=0u64);
        assert(token_b.amount - amount_b>=0u64);

        let difference_a: u64 = token_a.amount - amount_a;
        let remaining_a: tokenA = tokenA {
            owner: token_a.owner,
            symbol: 128021892001345field,
            amount: difference_a,
        };
        let difference_b: u64 = token_b.amount - amount_b;
        let remaining_b: tokenB = tokenB {
            owner: token_b.owner,
            symbol: 128021892001346field,
            amount: difference_b,
        };

        //TODO Cross border risk
        let lp_amount: u64 = square_root(amount_a * amount_b);

        return (remaining_a, remaining_b) then finalize(self.caller, lp_amount, amount_a, amount_b);
    }

    finalize mint_public(owner: address, lp_amount: u64, amount_a: u64, amount_b: u64){
        //TODO token_a & token_b hash as key
        let current_config: Config = Mapping::get_or_use(config, 1field,
            Config {
                total_supply: 0u64,
                k_last: 0u64,
                lock: false,
                minimum_liquidity: 1000u64,
                reserve_a: 1u64,
                reserve_b: 1u64,
            }
        );

        let liquidity_a: u64 = amount_a.mul_wrapped(current_config.total_supply).div_wrapped(current_config.reserve_a);
        let liquidity_b: u64 = amount_b.mul_wrapped(current_config.total_supply).div_wrapped(current_config.reserve_b);
        let liquidity: u64 = 0u64;
        if (liquidity_a > liquidity_b){
            liquidity = liquidity_b;
        }else{
            liquidity = liquidity_a;
        }

        let bfirst: bool = current_config.total_supply == 0u64;
        let new_account_value:u64 = Mapping::get_or_use(account, owner, 0u64);
        let new_total_supply:u64 = 0u64;
        let new_k_last:u64 = 0u64;
        let new_lock:bool = false;
        let new_minimum_liquidity:u64 = 1000u64;
        let new_reserve_a:u64 = 1u64;
        let new_reserve_b:u64 = 1u64;

        if bfirst {
            new_account_value =  lp_amount - new_minimum_liquidity;
        } else {
            new_account_value = new_account_value + liquidity;
        }
        Mapping::set(account, owner, new_account_value);
        

        if bfirst {
            new_total_supply =  lp_amount;
        } else {
            new_total_supply = current_config.total_supply + liquidity;
        }

        if bfirst {
            new_k_last = 0u64;
        } else {
            new_k_last = amount_a * amount_b;
        }

        if bfirst {
            new_lock = false;
        } else {
            new_lock = current_config.lock;
        }

        if bfirst {
            new_reserve_a = amount_a;
        } else {
            new_reserve_a = current_config.reserve_a+ amount_a;
        }

        if bfirst {
            new_reserve_b = amount_b;
        } else {
            new_reserve_b = current_config.reserve_b+ amount_b;
        }

        let new_config: Config = Config {
            total_supply: new_total_supply,
            k_last: new_k_last,
            lock: new_lock,
            minimum_liquidity: new_minimum_liquidity,
            reserve_a: new_reserve_a,
            reserve_b: new_reserve_b
        };
        Mapping::set(config, 1field, new_config);
    }

    transition burn_public(public to: address, public amount_a: u64, public amount_b: u64) -> (tokenA, tokenB){
        let a: tokenA = tokenA {
            owner: to,
            symbol: 128021892001345field,
            amount: amount_a,
        };
        let b: tokenB = tokenB {
            owner: to,
            symbol: 128021892001346field,
            amount: amount_b,
        };
        let lp_amount: u64 = square_root(amount_a * amount_b);

        return (a, b) then finalize(self.caller, amount_a, amount_b, lp_amount);
    }

    finalize burn_public(addr: address, amount_a: u64, amount_b: u64, lp_amount: u64){
        let current_config: Config = Mapping::get_or_use(config, 1field,
            Config {
                total_supply: 0u64,
                k_last: 0u64,
                lock: false,
                minimum_liquidity: 1000u64,
                reserve_a: 1u64,
                reserve_b: 1u64,
            }
        );
        assert(current_config.reserve_a >= amount_a);
        assert(current_config.reserve_b >= amount_b);
        let account_liquidity: u64 = Mapping::get_or_use(account, addr, 0u64);
        let a: u64 = account_liquidity.mul(current_config.reserve_a) / current_config.total_supply;
        let b: u64 = account_liquidity.mul(current_config.reserve_b) / current_config.total_supply;
        assert(a >= amount_a);
        assert(b >= amount_b);
        assert(account_liquidity >= lp_amount);
        let new_total_supply: u64 = current_config.total_supply - lp_amount;
        Mapping::set(account, addr, account_liquidity - lp_amount);
        Mapping::set(config, 1field, Config {
             total_supply: new_total_supply,
             k_last: current_config.k_last,
             lock: current_config.lock,
             minimum_liquidity: current_config.minimum_liquidity,
             reserve_a: current_config.reserve_a - amount_a,
             reserve_b: current_config.reserve_b - amount_b,
         });
    }

    transition swap_a_to_b_private(to: address, token_a: tokenA, amount_a: u64, amount_b: u64) -> (tokenA, tokenB){
        assert(token_a.amount - amount_a>=0u64);
        let difference_a: u64 = token_a.amount - amount_a;
        let remaining_a: tokenA = tokenA {
            owner: token_a.owner,
            symbol: 128021892001345field,
            amount: difference_a,
        };

        let b: tokenB = tokenB {
            owner: to,
            symbol: 128021892001346field,
            amount: amount_b,
        };

        return (remaining_a, b) then finalize(amount_a, amount_b);
    }

    finalize swap_a_to_b_private(amount_a: u64, amount_b: u64){
        let current_config: Config = Mapping::get_or_use(config, 1field,
            Config {
                total_supply: 0u64,
                k_last: 0u64,
                lock: false,
                minimum_liquidity: 1000u64,
                reserve_a: 1u64,
                reserve_b: 1u64,
            }
        );
        assert(current_config.reserve_b >= amount_b);
        let balance_a: u64 = current_config.reserve_a + amount_a;
        let balance_b: u64 = current_config.reserve_b - amount_b;
        let balance_a_adjusted: u64 = balance_a.mul(1000u64).sub(amount_a.mul(3u64));
        let balance_b_adjusted: u64 = balance_b.mul(1000u64).sub(amount_b.mul(3u64));
        assert(balance_a_adjusted.mul(balance_b_adjusted)>= current_config.reserve_a.mul(current_config.reserve_b).mul(1000000u64));
        Mapping::set(config, 1field, Config {
             total_supply: current_config.total_supply,
             k_last: current_config.k_last,
             lock: current_config.lock,
             minimum_liquidity: current_config.minimum_liquidity,
             reserve_a: balance_a,
             reserve_b: balance_b,
         });
    }

    transition swap_a_to_b_public(public to: address, public amount_a: u64,public amount_b: u64){

        return then finalize(self.caller, to, amount_a, amount_b);
    }

    finalize swap_a_to_b_public(from: address, to: address, amount_a: u64, amount_b: u64){
        let from_token_a_amount:u64 = Mapping::get_or_use(account_a, from, 0u64);
        assert(from_token_a_amount >= amount_a);
        Mapping::set(account_a, from, from_token_a_amount - amount_a);

        let to_token_b_amount:u64 = Mapping::get_or_use(account_b, to, 0u64);
        Mapping::set(account_b, to, to_token_b_amount + amount_b);


        let current_config: Config = Mapping::get_or_use(config, 1field,
            Config {
                total_supply: 0u64,
                k_last: 0u64,
                lock: false,
                minimum_liquidity: 1000u64,
                reserve_a: 1u64,
                reserve_b: 1u64,
            }
        );
        assert(current_config.reserve_b >= amount_b);
        let balance_a: u64 = current_config.reserve_a + amount_a;
        let balance_b: u64 = current_config.reserve_b - amount_b;
        let balance_a_adjusted: u64 = balance_a.mul(1000u64).sub(amount_a.mul(3u64));
        let balance_b_adjusted: u64 = balance_b.mul(1000u64).sub(amount_b.mul(3u64));
        assert(balance_a_adjusted.mul(balance_b_adjusted)>= current_config.reserve_a.mul(current_config.reserve_b).mul(1000000u64));
        Mapping::set(config, 1field, Config {
             total_supply: current_config.total_supply,
             k_last: current_config.k_last,
             lock: current_config.lock,
             minimum_liquidity: current_config.minimum_liquidity,
             reserve_a: balance_a,
             reserve_b: balance_b,
         });
    }


    transition swap_b_to_a_private(to: address, token_b: tokenB, amount_b: u64, amount_a: u64) -> (tokenB, tokenA){
        assert(token_b.amount - amount_b>=0u64);
        let difference_b: u64 = token_b.amount - amount_b;
        let remaining_b: tokenB = tokenB {
            owner: token_b.owner,
            symbol: 128021892001346field,
            amount: difference_b,
        };

        let a: tokenA = tokenA {
            owner: to,
            symbol: 128021892001345field,
            amount: amount_a,
        };

        return (remaining_b, a) then finalize(self.caller, amount_b, amount_a);
    }

    finalize swap_b_to_a_private(addr: address, amount_b: u64, amount_a: u64){
        let current_config: Config = Mapping::get_or_use(config, 1field,
            Config {
                total_supply: 0u64,
                k_last: 0u64,
                lock: false,
                minimum_liquidity: 1000u64,
                reserve_a: 1u64,
                reserve_b: 1u64,
            }
        );
        assert(current_config.reserve_a >= amount_a);
        let balance_a: u64 = current_config.reserve_a - amount_a;
        let balance_b: u64 = current_config.reserve_b + amount_b;
        let balance_a_adjusted: u64 = balance_a.mul(1000u64).sub(amount_a.mul(3u64));
        let balance_b_adjusted: u64 = balance_b.mul(1000u64).sub(amount_b.mul(3u64));
        assert(balance_a_adjusted.mul(balance_b_adjusted)>= current_config.reserve_a.mul(current_config.reserve_b).mul(1000000u64));
        Mapping::set(config, 1field, Config {
             total_supply: current_config.total_supply,
             k_last: current_config.k_last,
             lock: current_config.lock,
             minimum_liquidity: current_config.minimum_liquidity,
             reserve_a: balance_a,
             reserve_b: balance_b,
         });
    }

    transition swap_b_to_a_public(public to: address, public amount_b: u64, public amount_a: u64){
        return then finalize(self.caller, to, amount_b, amount_a);
    }

    finalize swap_b_to_a_public(from: address, to: address, amount_b: u64, amount_a: u64){
        let from_token_b_amount:u64 = Mapping::get_or_use(account_b, from, 0u64);
        assert(from_token_b_amount >= amount_b);
        Mapping::set(account_b, from, from_token_b_amount - amount_b);
        let to_token_a_amount:u64 = Mapping::get_or_use(account_a, to, 0u64);
        Mapping::set(account_a, to, to_token_a_amount + amount_a);

        let current_config: Config = Mapping::get_or_use(config, 1field,
            Config {
                total_supply: 0u64,
                k_last: 0u64,
                lock: false,
                minimum_liquidity: 1000u64,
                reserve_a: 1u64,
                reserve_b: 1u64,
            }
        );
        assert(current_config.reserve_a >= amount_a);
        let balance_a: u64 = current_config.reserve_a - amount_a;
        let balance_b: u64 = current_config.reserve_b + amount_b;
        let balance_a_adjusted: u64 = balance_a.mul(1000u64).sub(amount_a.mul(3u64));
        let balance_b_adjusted: u64 = balance_b.mul(1000u64).sub(amount_b.mul(3u64));
        assert(balance_a_adjusted.mul(balance_b_adjusted)>= current_config.reserve_a.mul(current_config.reserve_b).mul(1000000u64));
        Mapping::set(config, 1field, Config {
             total_supply: current_config.total_supply,
             k_last: current_config.k_last,
             lock: current_config.lock,
             minimum_liquidity: current_config.minimum_liquidity,
             reserve_a: balance_a,
             reserve_b: balance_b,
         });
    }

    function square_root(x: u64) -> u64 {
        let a: u64 = 0u64;
        let b: u64 = x;
        let r: u64 = 0u64;

        for i:u64 in 0u64..38u64 {
            let mid:u64 = a + (b.sub_wrapped(a)) / 2u64;
            let t_a:u64 = a;
            let t_b:u64 = b;
            let t_r:u64 = r;
            
            let blte:bool = (mid.mul_wrapped(mid)) <= x;

            if blte {
                t_a = mid + 1u64;
            }

            if blte{
                
            } else {
                t_b = mid - 1u64;
            }

            if blte {
                t_r = mid;
            }

            if a <= b {
                a = t_a;
            }

            if a <= b {
                b = t_b;
            }

            if a <= b {
                r = t_r;
            }
        }
        return r;
    }

}
