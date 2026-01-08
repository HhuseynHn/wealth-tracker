import type { SubscriptionState, PlanType, ProFeatures } from '../types/subscription';
export declare const loadUserSubscription: import("@reduxjs/toolkit").ActionCreatorWithPayload<string | null, "subscription/loadUserSubscription">, upgradePlan: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    plan: PlanType;
    userId: string | null;
}, "subscription/upgradePlan">, startTrial: import("@reduxjs/toolkit").ActionCreatorWithPayload<string | null, "subscription/startTrial">, cancelSubscription: import("@reduxjs/toolkit").ActionCreatorWithPayload<string | null, "subscription/cancelSubscription">, checkSubscriptionStatus: import("@reduxjs/toolkit").ActionCreatorWithPayload<string | null, "subscription/checkSubscriptionStatus">, renewSubscription: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    plan: PlanType;
    userId: string | null;
}, "subscription/renewSubscription">;
declare const _default: import("redux").Reducer<SubscriptionState>;
export default _default;
export declare const selectIsProUser: (state: {
    subscription: SubscriptionState;
}) => boolean;
export declare const selectCanUseFeature: (state: {
    subscription: SubscriptionState;
}, feature: keyof ProFeatures) => boolean;
//# sourceMappingURL=subscriptionSlice.d.ts.map