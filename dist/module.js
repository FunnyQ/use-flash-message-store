import {defineStore as $hgUW1$defineStore} from "pinia";


const $149c1bd638913645$var$DEFAULT_MESSAGE = {
    type: "success",
    message: "",
    position: "top"
};
const $149c1bd638913645$var$mergeWithDefaultMessage = (flashMessage)=>{
    return {
        ...$149c1bd638913645$var$DEFAULT_MESSAGE,
        ...flashMessage
    };
};
/**
 * set callback function
 */ const $149c1bd638913645$var$showFlashMessageWith = (callback, patcher)=>{
    patcher((state)=>{
        state.showFlashMessageFunction = callback;
    });
};
/**
 * display messages in View, with function that provided from vue component.
 */ const $149c1bd638913645$var$showAllMessages = (store)=>{
    store.all.forEach((flashMessage)=>{
        // @ts-ignore
        store.showFlashMessageFunction(flashMessage);
    });
    store.clear();
};
const $149c1bd638913645$export$90826238043733b = (0, $hgUW1$defineStore)("[odd] flash-message-store", {
    state: ()=>{
        return {
            queue: [],
            showFlashMessageFunction: undefined
        };
    },
    getters: {
        /**
     * list all flash messages in an array
     */ all (state) {
            return state.queue;
        }
    },
    actions: {
        /**
     * initializing flash message store. if any change happen to `queue` and include new messages, `showAllMessages`
     * will been called for display messages in View.
     */ init (callback) {
            $149c1bd638913645$var$showFlashMessageWith(callback, this.$patch);
            this.$subscribe(()=>{
                if (this.queue.length <= 0) return;
                $149c1bd638913645$var$showAllMessages(this);
            });
            $149c1bd638913645$var$showAllMessages(this);
        },
        /**
     * add a message into flash message queue
     */ add (flashMessage) {
            this.queue.push($149c1bd638913645$var$mergeWithDefaultMessage(flashMessage));
        },
        /**
     * assign flash message array into queue directly.
     */ set (flashMessages) {
            this.queue = flashMessages.map((flashMessage)=>{
                return $149c1bd638913645$var$mergeWithDefaultMessage(flashMessage);
            });
        },
        /**
     * remove all messages
     */ clear () {
            this.queue = [];
        }
    }
});
var $149c1bd638913645$export$2e2bcd8739ae039 = $149c1bd638913645$export$90826238043733b;


export {$149c1bd638913645$export$90826238043733b as useFlashMessageStore, $149c1bd638913645$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=module.js.map
