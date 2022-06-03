import { defineStore } from 'pinia'

const DEFAULT_MESSAGE: FlashMessage = {
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

/**
 * display messages in View, with function that provided from vue component.
 */
const showAllMessages = (store: IFlashMessageStore) => {
  store.all.forEach((flashMessage: FlashMessage) => {
    // @ts-ignore
    store.showFlashMessageFunction(flashMessage)
  })
  store.clear()
}

// store definition
export const useFlashMessageStore = defineStore('[odd] flash-message-store', {
  state: (): RootState => {
    return {
      queue: [],
      showFlashMessageFunction: undefined
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
    init(callback: (flashMessage: FlashMessage) => any) {
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
