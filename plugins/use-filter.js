import Vue from 'vue';

Vue.filter('truncate', (string, value) => {
  if(string.length > value){
    return (string || '').substring(0, value) + '…'
  }
  return (string || '')
})

