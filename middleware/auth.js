export default function(context) {
  // cek user token if exist
  if(! context.store.getters.isAuthenticated){
      // redirect
      if(context.route.path != '/admin/auth'){
        context.redirect('/admin/auth')
      }
  }else{
    // cek page
    if (context.route.path == '/admin/auth') {
      // redirect
      context.redirect('/admin/')
    }
  }
}
