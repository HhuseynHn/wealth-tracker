import { ProFeatures } from '../../types/subscription';
interface ProBadgeProps {
    feature?: keyof ProFeatures;
    showLock?: boolean;
    size?: 'sm' | 'md' | 'lg';
}
export declare const ProBadge: ({ feature, showLock, size }: ProBadgeProps) => import("react/jsx-runtime").JSX.Element | null;
interface FeatureGateProps {
    feature: keyof ProFeatures;
    children: React.ReactNode;
    fallback?: React.ReactNode;
}
export declare const FeatureGate: ({ feature, children, fallback }: FeatureGateProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ProBadge.d.ts.map