<template>
  <v-layout row wrap>
    <v-flex xs12 justify-center text-xs-center >
      <div class="layout justify-center row wrap" v-if="!multiple">
        <v-avatar :tile="tile" :size="size" color="grey lighten-4">
          <img :src="listImage[0].imageUrl" alt="avatar" v-if="listImage.length > 0">
        </v-avatar>
      </div>
      <div class="layout justify-center row wrap mt-2">
        <v-btn raised :class="classButton" :color="colorButton" @click="onPickFile">{{ titleButton}}</v-btn>
        <input type="file" :multiple="multiple" style="display: none" ref="fileInput" :accept="getImageAllowed" @change="onFilePicked">
      </div>
    </v-flex>
  </v-layout>
</template>

<script>

  export default {
    name: "FormInputFile",
    props: {
      titleButton: {
        type: String,
        required: false,
        default: 'Upload Image',
      },
      classButton: {
        type: String,
        required: false,
        default: 'primary'
      },
      colorButton: {
        type: String,
        required: false,
        default: ''
      },
      tile: {
        type: Boolean,
        required: false,
        default: false
      },
      size: {
        type: String,
        required: false,
        default: '150px'
      },
      acceptType: {
        type: String,
        required: false,
        default: ''
      },
      multiple: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    data() {
      return {
        listImage: [],
        errorsInput : []
      }
    },
    computed: {
      getImageAllowed() {
        //declare allowes string variable
        let allowedImage = []
        // get array of list type
        let listType = this.acceptType.split('|')
        // cek list type
        if (listType.length < 1) {
          return 'image/*'
        }
        // generate type
        listType.forEach(function (element) {
          allowedImage.push("image/" + element)
        })
        return allowedImage.join()
      }
    },
    methods: {
      onPickFile() {
        this.$refs.fileInput.click()
      },
      onFilePicked(event) {
        // get files
        const files = event.target.files
        // validate
        if (this.validateFilesExtension(files)) {
          // cek multiple
          if (this.multiple) {
            for (let i = 0; i < files.length; i++){
              this.getImage(files[i])
            }
          } else {
            this.getImage(files[0])
          }
          // this.$emit('onChange', files)
        }
      },
      validateFilesExtension(files) {
        var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + this.acceptType + ")$");
        if (!this.multiple) {
          let error = {
            label: 'Error file axtension',
            message: "Tolong inputkan file dengan extension : <b>" + this.acceptType.replace('|', ',') + "</b>."
          }
          if (!regex.test(files[0].name)) {
            this.errorsInput.push(error)
            return false;
          }
        } else {
          let error = {
            label: 'Error file axtension',
            message: "Salah satu file memiliki extension yang tidak sesuai, tolong inputkan file dengan extension : <b>" + this.acceptType.replace('|', ',') + "</b>."
          }
          console.log(files)
          for (let i = 0; i < files.length; i++){
            if (!regex.test(files[i]['name'])) {
              this.errorsInput.push(error)
              return false;
            }
          }
        }
        return true
      },
      getImage(file) {
        const fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
          this.listImage = []
          this.listImage.push({
            imageUrl: fileReader.result,
            imageFile: file
          })
        })
        fileReader.readAsDataURL(file)
      },
    }
  }
</script>

<style scoped>

</style>
