import { defineStore } from 'pinia';
const DEFAULT_MESSAGE_FORMAT = {
    type: 'success',
    message: '',
    position: 'top'
};
// helpers
/**
 * set callback function
 */
const showFlashMessageWith = (callback, patcher) => {
    patcher((state) => {
        state.showFlashMessageFunction = callback;
    });
};
/**
 * display messages in View, with function that provided from vue component.
 */
const showAllMessages = (store) => {
    store.all.forEach((flashMessage) => {
        // @ts-ignore
        store.showFlashMessageFunction(flashMessage);
    });
    store.clear();
};
// store definition
export const useFlashMessageStore = defineStore('[odd] flash-message-store', {
    state: () => {
        return {
            queue: [],
            showFlashMessageFunction: undefined
        };
    },
    getters: {
        /**
         * list all flash messages in an array
         * @returns {FlashMessage[]}
         */
        all(state) {
            return state.queue;
        }
    },
    actions: {
        /**
         * initializing flash message store. if any change happen to `queue` and include new messages, `__showAllMessages`
         * will been called for display messages in View.
         * @param {(flashMessage: FlashMessage) => any} callback provide a callback function to show flashMessages in View.
         */
        init(callback) {
            showFlashMessageWith(callback, this.$patch);
            if (!this.showFlashMessageFunction)
                throw new Error('Should dispatch `init` action first.');
            this.$subscribe(() => {
                if (this.queue.length <= 0)
                    return;
                showAllMessages(this);
            });
            showAllMessages(this);
        },
        /**
         * add a message into flash message queue
         * @param {FlashMessage} flashMessage an flashMessage object
         */
        add(flashMessage) {
            this.queue.push({ ...DEFAULT_MESSAGE_FORMAT, ...flashMessage });
        },
        /**
         * reset queue as flash message array
         * @param {FlashMessage[]} flashMessages
         */
        set(flashMessages) {
            this.queue = flashMessages.map((flashMessage) => {
                return { ...DEFAULT_MESSAGE_FORMAT, ...flashMessage };
            });
        },
        /**
         * remove all messages
         */
        clear() {
            this.queue = [];
        }
    }
});
export default useFlashMessageStore;
//# sourceMappingURL=use-flash-message-store.js.map