import Vue from 'vue';

Vue.filter('truncate', (string, value) => {
  if(string.length > value){
    return (string || '').substring(0, value) + '…'
  }
  return (string || '')
})

Vue.filter('strip_tag', (string) => {
 return string.replace(/(<([^>]+)>)/ig, '')
})

