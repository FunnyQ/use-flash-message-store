import { FlashMessage, FlashMessageArgument, RootState } from '../types';
export declare const useFlashMessageStore: import("pinia").StoreDefinition<"[odd] flash-message-store", RootState, {
    /**
     * list all flash messages in an array
     * @returns {FlashMessage[]}
     */
    all(state: {
        queue: {
            type: import("../types").MessageType;
            message: string;
            position: import("../types").Position;
        }[];
        showFlashMessageFunction?: Function | undefined;
    } & {}): FlashMessage[];
}, {
    /**
     * initializing flash message store. if any change happen to `queue` and include new messages, `__showAllMessages`
     * will been called for display messages in View.
     * @param {(flashMessage: FlashMessage) => any} callback provide a callback function to show flashMessages in View.
     */
    init(callback: (flashMessage: FlashMessage) => any): void;
    /**
     * add a message into flash message queue
     * @param {FlashMessage} flashMessage an flashMessage object
     */
    add(flashMessage: FlashMessageArgument): void;
    /**
     * reset queue as flash message array
     * @param {FlashMessage[]} flashMessages
     */
    set(flashMessages: FlashMessageArgument[]): void;
    /**
     * remove all messages
     */
    clear(): void;
}>;
export default useFlashMessageStore;
//# sourceMappingURL=use-flash-message-store.d.ts.map