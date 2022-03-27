# How to use

```ts
import { useFlashMessageStore } from 'use-flash-message-store'
import { FlashMessage } from 'use-flash-message-store/types'

// in vue setup
const flashMessageStore = useFlashMessageStore()
// use init action, provide a callback function for display messages
// the only argument of callback function is FlashMessage object.
flashMessageStore.init((flashMessage: FlashMessage) => {
  Toast.open({
    duration: 5000,
    type: `is-${flashMessage.type}`,
    message: flashMessage.message,
    position: `is-${flashMessage.position}`,
    queue: false,
  })
})

// add single message
flashMessageStore.add({message: 'test'})

// set multiple messages
flashMessageStore.set([
  { message: 'test1' },
  { message: 'test2', position: 'top-right' },
  { message: 'test3', position: 'bottom', type: 'danger' },
])
```
