import type { AuthState, LoginCredentials, User } from '../types';
interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}
interface ExtendedAuthState extends AuthState {
    registrationSuccess: boolean;
}
export declare const loginUser: import("@reduxjs/toolkit").AsyncThunk<User, LoginCredentials, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const registerUser: import("@reduxjs/toolkit").AsyncThunk<string, RegisterCredentials, {
    rejectValue: string;
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export declare const logout: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/logout">, clearError: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/clearError">, clearRegistrationSuccess: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/clearRegistrationSuccess">, setUser: import("@reduxjs/toolkit").ActionCreatorWithPayload<User, "auth/setUser">;
declare const _default: import("redux").Reducer<ExtendedAuthState>;
export default _default;
//# sourceMappingURL=authSlice.d.ts.map