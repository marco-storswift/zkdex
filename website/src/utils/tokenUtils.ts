const TokenUtils = {
    fromTransferTo(fromA: string, reserveA: string, reserveB: string) {
        if (fromA && reserveA && reserveB) {
            let rb = Number(reserveB)
            let ra = Number(reserveA)
            let fa = Number(fromA)
            let tb = (1000 * rb - (ra * rb * 1000000) / ((ra + fa) * 1000 - fa * 3)) / 1100
            return Math.floor(tb).toString()
        }
        return ""
    },
    toTransferFrom(toB: string, reserveA: string, reserveB: string) {
        if (toB && reserveA && reserveB) {
            let rb = Number(reserveB)
            let ra = Number(reserveA)
            let tb = Number(toB)
            let fa = ((ra * rb * 1000000) / (1000 * rb - 1100 * tb) - ra * 1000) / 997
            return Math.ceil(fa).toString()
        }
        return ""
    },
}
export default TokenUtils