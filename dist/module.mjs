import {defineStore as $hgUW1$defineStore} from "pinia";


const $88cdab1f4656fa48$var$convertRequiredKeys = [
    "type",
    "message",
    "position"
];
const $88cdab1f4656fa48$var$messageTypeMap = {
    warning: "warn",
    danger: "error"
};
const $88cdab1f4656fa48$var$positionMap = {
    top: "top-center",
    bottom: "bottom-center"
};
const $88cdab1f4656fa48$var$convertSeverity = (messageType)=>{
    return $88cdab1f4656fa48$var$messageTypeMap[messageType] || messageType;
};
const $88cdab1f4656fa48$var$convertGroup = (position)=>{
    return $88cdab1f4656fa48$var$positionMap[position] || position;
};
const $88cdab1f4656fa48$export$7dab0b7d393bdd66 = (originalArguments)=>{
    let args = {
        ...originalArguments
    };
    const converted = {
        severity: $88cdab1f4656fa48$var$convertSeverity(args.type),
        detail: args.message,
        group: $88cdab1f4656fa48$var$convertGroup(args.position)
    };
    // remove converted keys
    Object.keys(args).filter((key)=>!$88cdab1f4656fa48$var$convertRequiredKeys.includes(key)).forEach((key)=>delete args[key]);
    return {
        ...converted,
        ...args
    };
};


const $149c1bd638913645$export$78e8c44f99db902d = {
    type: "success",
    message: "",
    position: "top"
};
const $149c1bd638913645$var$mergeWithDefaultMessage = (flashMessage)=>{
    return {
        ...$149c1bd638913645$export$78e8c44f99db902d,
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
const $149c1bd638913645$var$convertFlashMessageArguments = (store, flashMessage)=>{
    switch(store.uiFramework){
        case "buefy":
            return flashMessage;
        case "primevue":
            return (0, $88cdab1f4656fa48$export$7dab0b7d393bdd66)(flashMessage);
        default:
            console.info(`[odd][useFlashMessage] There is no adapter for UI Framework '${store.uiFramework}'. We'll use original argument format,`);
            return flashMessage;
    }
};
/**
 * display messages in View, with function that provided from vue component.
 */ const $149c1bd638913645$var$showAllMessages = (store)=>{
    store.all.forEach((flashMessage)=>{
        if (!!store.showFlashMessageFunction) {
            store.showFlashMessageFunction($149c1bd638913645$var$convertFlashMessageArguments(store, flashMessage));
            store.clear();
        } else console.error("[FlashMessageStore] please define `showFlashMessageFunction` use `init` action first.");
    });
};
const $149c1bd638913645$export$90826238043733b = (0, $hgUW1$defineStore)("[odd] flash-message-store", {
    state: ()=>{
        return {
            queue: [],
            showFlashMessageFunction: undefined,
            uiFramework: "buefy"
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
     */ init (uiFrameworkName, callback) {
            uiFrameworkName && this.$patch((state)=>state.uiFramework = uiFrameworkName);
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


export {$149c1bd638913645$export$78e8c44f99db902d as DEFAULT_MESSAGE, $149c1bd638913645$export$90826238043733b as useFlashMessageStore, $149c1bd638913645$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=module.mjs.map
