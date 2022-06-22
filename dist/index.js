var $8zHUo$pinia = require("pinia");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "DEFAULT_MESSAGE", () => $882b6d93070905b3$export$78e8c44f99db902d);
$parcel$export(module.exports, "useFlashMessageStore", () => $882b6d93070905b3$export$90826238043733b);
$parcel$export(module.exports, "default", () => $882b6d93070905b3$export$2e2bcd8739ae039);

const $c6799648f0060b13$var$convertRequiredKeys = [
    "type",
    "message",
    "position"
];
const $c6799648f0060b13$var$messageTypeMap = {
    warning: "warn",
    danger: "error"
};
const $c6799648f0060b13$var$positionMap = {
    top: "top-center",
    bottom: "bottom-center"
};
const $c6799648f0060b13$var$convertSeverity = (messageType)=>{
    return $c6799648f0060b13$var$messageTypeMap[messageType] || messageType;
};
const $c6799648f0060b13$var$convertGroup = (position)=>{
    return $c6799648f0060b13$var$positionMap[position] || position;
};
const $c6799648f0060b13$export$7dab0b7d393bdd66 = (originalArguments)=>{
    let args = {
        ...originalArguments
    };
    const converted = {
        severity: $c6799648f0060b13$var$convertSeverity(args.type),
        detail: args.message,
        group: $c6799648f0060b13$var$convertGroup(args.position)
    };
    // remove converted keys
    Object.keys(args).filter((key)=>!$c6799648f0060b13$var$convertRequiredKeys.includes(key)).forEach((key)=>delete args[key]);
    return {
        ...converted,
        ...args
    };
};


const $882b6d93070905b3$export$78e8c44f99db902d = {
    type: "success",
    message: "",
    position: "top"
};
const $882b6d93070905b3$var$mergeWithDefaultMessage = (flashMessage)=>{
    return {
        ...$882b6d93070905b3$export$78e8c44f99db902d,
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
const $882b6d93070905b3$var$convertFlashMessageArguments = (store, flashMessage)=>{
    switch(store.uiFramework){
        case "buefy":
            return flashMessage;
        case "primevue":
            return (0, $c6799648f0060b13$export$7dab0b7d393bdd66)(flashMessage);
        default:
            console.info(`[odd][useFlashMessage] There is no adapter for UI Framework '${store.uiFramework}'. We'll use original argument format,`);
            return flashMessage;
    }
};
/**
 * display messages in View, with function that provided from vue component.
 */ const $882b6d93070905b3$var$showAllMessages = (store)=>{
    store.all.forEach((flashMessage)=>{
        if (!!store.showFlashMessageFunction) {
            store.showFlashMessageFunction($882b6d93070905b3$var$convertFlashMessageArguments(store, flashMessage));
            store.clear();
        } else console.error("[FlashMessageStore] please define `showFlashMessageFunction` use `init` action first.");
    });
};
const $882b6d93070905b3$export$90826238043733b = (0, $8zHUo$pinia.defineStore)("[odd] flash-message-store", {
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
