export function formatTemperature(value) {
  return `${Math.round(value)}°`;
}

export function formatHumidity(value) {
  return `${value}%`;
}

export function formatPressure(value) {
  return `${value}hPa`;
}

export function formatWind(value) {
  return `${value}mps`;
}
