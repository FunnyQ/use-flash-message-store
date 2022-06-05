type MessageType =
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'primary'
  | 'dark'
type Position =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right'
type FlashMessage = {
  type: MessageType
  message: string
  position: Position
}
type FlashMessageArgument = {
  type?: MessageType
  message: string
  position?: Position
}
type RootState = {
  queue: FlashMessage[]
  showFlashMessageFunction?: Function
  uiFramework: string
}

interface IFlashMessageStore extends RootState {
  // getters
  all: FlashMessage[]

  // actions
  init(
    uiFrameworkName: 'buefy' | 'primevue' | undefined,
    callback: (flashMessage: FlashMessage) => any
  ): void

  add(flashMessage: FlashMessageArgument): void

  set(flashMessages: FlashMessageArgument[]): void

  clear(): void
}
