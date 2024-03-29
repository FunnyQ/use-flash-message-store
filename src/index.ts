import { defineStore } from 'pinia'
import { primevueAdapter } from './primevue_adapter'

export const DEFAULT_MESSAGE: FlashMessage = {
  type: 'success',
  message: '',
  position: 'top'
}

const mergeWithDefaultMessage = (
  flashMessage: FlashMessageArgument
): FlashMessage => {
  return { ...DEFAULT_MESSAGE, ...flashMessage }
}

/**
 * set callback function
 */
const showFlashMessageWith = (
  callback: (flashMessage: FlashMessage) => any,
  patcher: Function
): void => {
  patcher((state: RootState) => {
    state.showFlashMessageFunction = callback
  })
}

const convertFlashMessageArguments = (
  store: IFlashMessageStore,
  flashMessage: FlashMessage
) => {
  switch (store.uiFramework) {
    case 'buefy':
      return flashMessage
    case 'primevue':
      return primevueAdapter(flashMessage)
    default:
      console.info(
        `[odd][useFlashMessage] There is no adapter for UI Framework '${store.uiFramework}'. We'll use original argument format,`
      )
      return flashMessage
  }
}

/**
 * display messages in View, with function that provided from vue component.
 */
const showAllMessages = (store: IFlashMessageStore) => {
  store.all.forEach((flashMessage: FlashMessage) => {
    if (!!store.showFlashMessageFunction) {
      store.showFlashMessageFunction(
        convertFlashMessageArguments(store, flashMessage)
      )
      store.clear()
    } else {
      console.error(
        '[FlashMessageStore] please define `showFlashMessageFunction` use `init` action first.'
      )
    }
  })
}

// store definition
export const useFlashMessageStore = defineStore('[odd] flash-message-store', {
  state: (): RootState => {
    return {
      queue: [],
      showFlashMessageFunction: undefined,
      uiFramework: 'buefy'
    }
  },

  getters: {
    /**
     * list all flash messages in an array
     */
    all(state): FlashMessage[] {
      return state.queue
    }
  },

  actions: {
    /**
     * initializing flash message store. if any change happen to `queue` and include new messages, `showAllMessages`
     * will been called for display messages in View.
     */
    init(
      uiFrameworkName: 'buefy' | 'primevue' | undefined,
      callback: (flashMessage: FlashMessage) => any
    ) {
      uiFrameworkName &&
        this.$patch((state) => (state.uiFramework = uiFrameworkName))
      showFlashMessageWith(callback, this.$patch)

      this.$subscribe(() => {
        if (this.queue.length <= 0) return

        showAllMessages(this)
      })

      showAllMessages(this)
    },

    /**
     * add a message into flash message queue
     */
    add(flashMessage: FlashMessageArgument) {
      this.queue.push(mergeWithDefaultMessage(flashMessage))
    },

    /**
     * assign flash message array into queue directly.
     */
    set(flashMessages: FlashMessageArgument[]) {
      this.queue = flashMessages.map((flashMessage) => {
        return mergeWithDefaultMessage(flashMessage)
      })
    },

    /**
     * remove all messages
     */
    clear() {
      this.queue = []
    }
  }
})

export default useFlashMessageStore
