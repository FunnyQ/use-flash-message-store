const MessageTypeMap = {
  warning: 'warn',
  danger: 'error'
}
const PositionMap = {
  top: 'top-center',
  bottom: 'center'
}

const convertSeverity = (messageType: string | undefined) => {
  // @ts-ignore will return original value if type not in the map.
  return MessageTypeMap[messageType] || messageType
}
const convertGroup = (position: string | undefined) => {
  // @ts-ignore will return original value if type not in the map.
  return PositionMap[position] || position
}

export const primevueAdapter = (args: {
  [k: string]: string
}): { severity: string; detail: string; group: string } => {
  const converted = {
    severity: convertSeverity(args.type),
    detail: args.message,
    group: convertGroup(args.position)
  }
  delete args.position
  delete args.type
  delete args.message

  return { ...converted, ...args }
}
