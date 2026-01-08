import type { CryptoState, CryptoAsset, AddCryptoDTO, UpdateCryptoDTO } from '../types/crypto';
export declare const addCryptoAsset: import("@reduxjs/toolkit").ActionCreatorWithPayload<AddCryptoDTO, "crypto/addCryptoAsset">, updateCryptoAsset: import("@reduxjs/toolkit").ActionCreatorWithPayload<UpdateCryptoDTO, "crypto/updateCryptoAsset">, deleteCryptoAsset: import("@reduxjs/toolkit").ActionCreatorWithPayload<string, "crypto/deleteCryptoAsset">, setLoading: import("@reduxjs/toolkit").ActionCreatorWithPayload<boolean, "crypto/setLoading">, setError: import("@reduxjs/toolkit").ActionCreatorWithPayload<string | null, "crypto/setError">;
declare const _default: import("redux").Reducer<CryptoState>;
export default _default;
export declare const selectCryptoAssets: (state: {
    crypto: CryptoState;
}) => CryptoAsset[];
export declare const selectCryptoLoading: (state: {
    crypto: CryptoState;
}) => boolean;
//# sourceMappingURL=cryptoSlice.d.ts.map