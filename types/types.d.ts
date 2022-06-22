export const DEFAULT_MESSAGE: FlashMessage;
export const useFlashMessageStore: import("pinia").StoreDefinition<"[odd] flash-message-store", RootState, {
    /**
     * list all flash messages in an array
     */
    all(state: {
        queue: {
            type: MessageType;
            message: string;
            position: Position;
        }[];
        showFlashMessageFunction?: Function | undefined;
        uiFramework: string;
    } & import("pinia").PiniaCustomStateProperties<RootState>): FlashMessage[];
}, {
    /**
     * initializing flash message store. if any change happen to `queue` and include new messages, `showAllMessages`
     * will been called for display messages in View.
     */
    init(uiFrameworkName: 'buefy' | 'primevue' | undefined, callback: (flashMessage: FlashMessage) => any): void;
    /**
     * add a message into flash message queue
     */
    add(flashMessage: FlashMessageArgument): void;
    /**
     * assign flash message array into queue directly.
     */
    set(flashMessages: FlashMessageArgument[]): void;
    /**
     * remove all messages
     */
    clear(): void;
}>;
export default useFlashMessageStore;

//# sourceMappingURL=types.d.ts.map
