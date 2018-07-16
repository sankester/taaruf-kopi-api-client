export default function(context) {
  // initial and cek token for multiple page
  context.store.dispatch('initAuth', context.req)
}
