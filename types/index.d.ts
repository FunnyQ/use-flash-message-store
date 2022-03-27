export declare type MessageType = 'success' | 'info' | 'warning' | 'danger' | 'primary' | 'dark'
export declare type Position = 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right'
export declare type FlashMessage = {
  type: MessageType
  message: string
  position: Position
}
export declare type FlashMessageArgument = {
  type?: MessageType
  message: string
  position?: Position
}
export declare type RootState = {
  queue: FlashMessage[]
  showFlashMessageFunction?: Function
}

export declare interface IFlashMessageStore extends RootState {
  // getters
  all: FlashMessage[]

  // actions
  init(callback: (flashMessage: FlashMessage) => any): void
  add(flashMessage: FlashMessageArgument): void
  set(flashMessages: FlashMessageArgument[]): void
  clear(): void
}
