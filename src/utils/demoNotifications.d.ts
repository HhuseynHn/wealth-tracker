export declare const addDemoNotifications: () => void;
export declare const triggerNotification: (type: "success" | "warning" | "error" | "info", category: "transaction" | "goal" | "crypto" | "system" | "budget", title: string, message: string, icon?: string) => void;
export declare const notificationTemplates: {
    transactionAdded: (type: "income" | "expense", amount: number) => {
        type: "success" | "info";
        category: "transaction";
        title: string;
        message: string;
        icon: string;
    };
    goalProgress: (goalName: string, percentage: number) => {
        type: "success" | "info";
        category: "goal";
        title: string;
        message: string;
        icon: string;
    };
    goalDeadline: (goalName: string, daysLeft: number) => {
        type: "warning" | "info";
        category: "goal";
        title: string;
        message: string;
        icon: string;
    };
    cryptoPriceChange: (symbol: string, change: number) => {
        type: "success" | "warning";
        category: "crypto";
        title: string;
        message: string;
        icon: string;
    };
    budgetAlert: (category: string, percentage: number) => {
        type: "warning" | "info";
        category: "budget";
        title: string;
        message: string;
        icon: string;
    };
    welcomeBack: (userName: string) => {
        type: "success";
        category: "system";
        title: string;
        message: string;
        icon: string;
    };
};
export declare const sendNotification: (template: keyof typeof notificationTemplates, ...args: any[]) => void;
//# sourceMappingURL=demoNotifications.d.ts.map