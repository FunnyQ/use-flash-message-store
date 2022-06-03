var $8zHUo$pinia = require("pinia");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "useFlashMessageStore", () => $882b6d93070905b3$export$90826238043733b);
$parcel$export(module.exports, "default", () => $882b6d93070905b3$export$2e2bcd8739ae039);

const $882b6d93070905b3$var$DEFAULT_MESSAGE = {
    type: "success",
    message: "",
    position: "top"
};
const $882b6d93070905b3$var$mergeWithDefaultMessage = (flashMessage)=>{
    return {
        ...$882b6d93070905b3$var$DEFAULT_MESSAGE,
        ...flashMessage
    };
};
/**
 * set callback function
 */ const $882b6d93070905b3$var$showFlashMessageWith = (callback, patcher)=>{
    patcher((state)=>{
        state.showFlashMessageFunction = callback;
    });
};
/**
 * display messages in View, with function that provided from vue component.
 */ const $882b6d93070905b3$var$showAllMessages = (store)=>{
    store.all.forEach((flashMessage)=>{
        // @ts-ignore
        store.showFlashMessageFunction(flashMessage);
    });
    store.clear();
};
const $882b6d93070905b3$export$90826238043733b = (0, $8zHUo$pinia.defineStore)("[odd] flash-message-store", {
    state: ()=>{
        return {
            queue: [],
            showFlashMessageFunction: undefined
        };
    },
    getters: {
        /**
     * list all flash messages in an array
     * @returns {FlashMessage[]}
     */ all (state) {
            return state.queue;
        }
    },
    actions: {
        /**
     * initializing flash message store. if any change happen to `queue` and include new messages, `showAllMessages`
     * will been called for display messages in View.
     */ init (callback) {
            $882b6d93070905b3$var$showFlashMessageWith(callback, this.$patch);
            this.$subscribe(()=>{
                if (this.queue.length <= 0) return;
                $882b6d93070905b3$var$showAllMessages(this);
            });
            $882b6d93070905b3$var$showAllMessages(this);
        },
        /**
     * add a message into flash message queue
     */ add (flashMessage) {
            this.queue.push($882b6d93070905b3$var$mergeWithDefaultMessage(flashMessage));
        },
        /**
     * assign flash message array into queue directly.
     */ set (flashMessages) {
            this.queue = flashMessages.map((flashMessage)=>{
                return $882b6d93070905b3$var$mergeWithDefaultMessage(flashMessage);
            });
        },
        /**
     * remove all messages
     */ clear () {
            this.queue = [];
        }
    }
});
var $882b6d93070905b3$export$2e2bcd8739ae039 = $882b6d93070905b3$export$90826238043733b;


//# sourceMappingURL=index.js.map
