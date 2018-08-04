export default function(context) {
  // set host cors
  context.store.dispatch('initHost', context.req)
}
