// If the executing binary is named `electron`, we're running
// in developer mode - otherwise, it'd be `installer`.
export function isDevMode () {
  return !!process.execPath.match(/[\\/]electron/)
}
