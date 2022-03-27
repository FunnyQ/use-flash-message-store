import { defineStore } from 'pinia'
import { FlashMessage, FlashMessageArgument, IFlashMessageStore, RootState } from '../types'

const DEFAULT_MESSAGE_FORMAT: FlashMessage = {
  type: 'success',
  message: '',
  position: 'top'
}

// helpers

/**
 * set callback function
 */
const showFlashMessageWith = (callback: (flashMessage: FlashMessage) => any, patcher: Function): void => {
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
     * @returns {FlashMessage[]}
     */
    all(state): FlashMessage[] {
      return state.queue
    }
  },

  actions: {
    /**
     * initializing flash message store. if any change happen to `queue` and include new messages, `__showAllMessages`
     * will been called for display messages in View.
     * @param {(flashMessage: FlashMessage) => any} callback provide a callback function to show flashMessages in View.
     */
    init(callback: (flashMessage: FlashMessage) => any) {
      showFlashMessageWith(callback, this.$patch)

      if (!this.showFlashMessageFunction) throw new Error('Should dispatch `init` action first.')

      this.$subscribe(() => {
        if (this.queue.length <= 0) return

        showAllMessages(this)
      })

      showAllMessages(this)
    },

    /**
     * add a message into flash message queue
     * @param {FlashMessage} flashMessage an flashMessage object
     */
    add(flashMessage: FlashMessageArgument) {
      this.queue.push({ ...DEFAULT_MESSAGE_FORMAT, ...flashMessage })
    },

    /**
     * reset queue as flash message array
     * @param {FlashMessage[]} flashMessages
     */
    set(flashMessages: FlashMessageArgument[]) {
      this.queue = flashMessages.map((flashMessage) => {
        return { ...DEFAULT_MESSAGE_FORMAT, ...flashMessage }
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
