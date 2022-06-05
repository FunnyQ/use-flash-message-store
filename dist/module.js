import {defineStore as $hgUW1$defineStore} from "pinia";


const $88cdab1f4656fa48$var$MessageTypeMap = {
    warning: "warn",
    danger: "error"
};
const $88cdab1f4656fa48$var$PositionMap = {
    top: "top-center",
    bottom: "center"
};
const $88cdab1f4656fa48$var$convertSeverity = (messageType)=>{
    // @ts-ignore will return original value if type not in the map.
    return $88cdab1f4656fa48$var$MessageTypeMap[messageType] || messageType;
};
const $88cdab1f4656fa48$var$convertGroup = (position)=>{
    // @ts-ignore will return original value if type not in the map.
    return $88cdab1f4656fa48$var$PositionMap[position] || position;
};
const $88cdab1f4656fa48$export$7dab0b7d393bdd66 = (args)=>{
    const converted = {
        severity: $88cdab1f4656fa48$var$convertSeverity(args.type),
        detail: args.message,
        group: $88cdab1f4656fa48$var$convertGroup(args.position)
    };
    delete args.position;
    delete args.type;
    delete args.message;
    return {
        ...converted,
        ...args
    };
};


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
const $149c1bd638913645$var$convertFlashMessageArguments = (store, flashMessage)=>{
    switch(store.uiFramework){
        case "buefy":
            return flashMessage;
        case "primevue":
            return (0, $88cdab1f4656fa48$export$7dab0b7d393bdd66)(flashMessage);
        default:
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


export {$149c1bd638913645$export$90826238043733b as useFlashMessageStore, $149c1bd638913645$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=module.js.map
