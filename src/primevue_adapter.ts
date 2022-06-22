type flashMessageArgument = { [key: string]: string }
type primevueToastMessage = {
  /**
   * Severity level of the message.
   * Default value is 'info'.
   */
  severity?: any | undefined
  /**
   * Summary content of the message.
   */
  summary?: string | undefined
  /**
   * Detail content of the message.
   */
  detail?: any | undefined
  /**
   * Whether the message can be closed manually using the close icon.
   * Default value is true.
   */
  closable?: boolean | undefined
  /**
   * Delay in milliseconds to close the message automatically.
   * Default value is 3000.
   */
  life?: number | undefined
  /**
   * Key of the Toast to display the message.
   */
  group?: string | undefined
  /**
   * Style class of the message.
   */
  styleClass?: any
  /**
   * Style class of the content.
   */
  contentStyleClass?: any
}

const convertRequiredKeys = ['type', 'message', 'position']
const messageTypeMap: flashMessageArgument = {
  warning: 'warn',
  danger: 'error'
}
const positionMap: flashMessageArgument = {
  top: 'top-center',
  bottom: 'bottom-center'
}

const convertSeverity = (messageType: string) => {
  return messageTypeMap[messageType] || messageType
}
const convertGroup = (position: string) => {
  return positionMap[position] || position
}

export const primevueAdapter = (
  originalArguments: flashMessageArgument
): primevueToastMessage => {
  let args = { ...originalArguments }
  const converted = {
    severity: convertSeverity(args.type),
    detail: args.message,
    group: convertGroup(args.position)
  }

  // remove converted keys
  Object.keys(args)
    .filter((key) => !convertRequiredKeys.includes(key))
    .forEach((key) => delete args[key])

  return { ...converted, ...args }
}
