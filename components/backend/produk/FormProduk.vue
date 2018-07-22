<template>
  <v-container fluid>
    <v-form>
      <v-layout row wrap >
        <!--field input-->
        <v-flex xs12 sm12 md6>
          <v-text-field
            v-model="produkData.nama_produk"
            v-validate="this.validateRule.nama_produk"
            label="Nama Produk"
            data-vv-name="nama_produk"
            :error-messages="errors.collect('nama_produk')"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 sm12 md12 class="mt-3">
          <div class="mb-2">
            <label aria-hidden="true" class="v-label text--black">Deskripsi Produk</label>
          </div>
          <no-ssr>
            <vue-editor
              id="editor"
              v-model="produkData.deskripsi_produk"
              v-validate="this.validateRule.deskripsi_produk"
              data-vv-name="deskripsi_produk"
            ></vue-editor>
          </no-ssr>
          <div class="v-messages error--text mt-2"  v-if="errors.collect('deskripsi_produk')">
            <div class="v-messages__wrapper">
              <div class="v-messages__message"  v-text="errors.collect('deskripsi_produk')[0]"></div>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs3 sm2 md1 class="mr-5">
          <v-text-field
            v-model="produkData.stok"
            v-validate="this.validateRule.stok"
            label="Stok"
            data-vv-name="stok"
            :error-messages="errors.collect('stok')"
            type="number"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 sm4 md3 class="mr-5">
          <v-text-field
            v-model="produkData.harga"
            v-validate="this.validateRule.harga"
            label="Harga"
            data-vv-name="harga"
            :error-messages="errors.collect('harga')"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 sm2 md1>
          <v-text-field
            v-model="produkData.diskon"
            v-validate="this.validateRule.diskon"
            label="Diskon"
            data-vv-name="diskon"
            :error-messages="errors.collect('diskon')"
            suffix="%"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 sm12 md12 class="d-inline-block">
          <label aria-hidden="true" class="v-label">Status Publikasi</label>
          <v-switch
            v-model="produkData.publish_st"
            color="teal"
          ></v-switch>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex md12 sm12 xs12 class="d-inline-block">
          <label aria-hidden="true" class="v-label">Gambar Produk</label>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex md3 sm4 xs12 class="mr-1" v-for="(file,index) in files" v-bind:key="index">
          <v-card>
            <v-card-media
              :src="file.image"
              height="150px"
            >
              <v-card-actions class="layout align-end justify-center fill-height ">
                <v-btn color="red" dark class="md12" @click="deleteImage(file)">Hapus</v-btn>
              </v-card-actions>
            </v-card-media>
          </v-card>
        </v-flex>
        <v-flex md3 sm4 xs12 style="min-height: 150px;border: 1px dashed #dbe1ec">
          <v-card-actions class="layout align-center justify-center fill-height">
            <v-btn fab outline color="#dbe1ec" @click="onPickFile">
              <v-icon>add</v-icon>
            </v-btn>
            <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked">
          </v-card-actions>
        </v-flex>
      </v-layout>
      <v-flex xs12 sm12 md12 justify-end align-end class="layout">
        <v-spacer></v-spacer>
        <v-btn @click="reset">
          <v-icon class="mr-2">settings_backup_restore</v-icon> Reset
        </v-btn>
        <v-btn color="success" @click="submit" v-if="!edit">
          <v-icon class="mr-2">add</v-icon> Simpan
        </v-btn>
        <v-btn color="success" @click="submit" v-if="edit">
          <v-icon class="mr-2">edit</v-icon> Simpan
        </v-btn>
      </v-flex>
    </v-form>
  </v-container>
</template>

<script>
  export default {
    name: "FormProduk",
    props: {
      produk : {
        type: Object,
        required: false
      },
      edit: {
        type: Boolean,
        default: false
      },
      fileAttach : {
        type : Array,
        required : false
      }
    },
    data() {
      return {
        // init data
        produkData: this.produk ? {...this.produk} : {
          nama_produk: "",
          deskripsi_produk: "",
          stok : "",
          harga : "",
          diskon : '',
          publish_st : false
        },
        files : this.fileAttach ? this.fileAttach : [],
        filesDelete : [],
        // validate rule
        validateRule: {
          nama_produk: "required",
          deskripsi_produk: "required",
          stok : "required",
          harga : "required",
          diskon : '',
        },
      };
    },
    mounted() {
      // custom option vee validate
      const dict = {
        custom: {

        }
      };
      // init custom vee validation
      this.$validator.localize("id", dict);
    },
    methods: {
      // when click button upload
      onPickFile() {
        this.$refs.fileInput.click();
      },
      // when input file change
      onFilePicked(event) {
        // get files
        const files = event.target.files;
        let fileName = files[0].name;
        if (fileName.lastIndexOf(".") <= 0) {
          return false;
        }
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          let image = { id : this.files.length , image : fileReader.result , status : true}
          this.files.push(image)
        });
        fileReader.readAsDataURL(files[0]);
      },
      // submit form
      submit() {
        // run validation
        this.$validator.validateAll().then(res => {
          if (res) {
            // get files attach
            let filesAttach = []
            this.files.forEach(function (element) {
              if(element.status){
                filesAttach.push(element.image)
              }
            })
            // cek status edit
            if(this.edit){
              // declare send data
              let sendData = {...this.produkData, filesAttach : filesAttach, filesDelete : this.filesDelete}
              // emit edit
              this.$emit("edit", sendData)
            }else{
              // declare send data
              let sendData = {...this.produkData, filesAttach : filesAttach}
              // emit insert
              this.$emit("insert", sendData)
            }
          }
        });
      },
      // delete temporary image
      deleteImage(image){
        // cek status edit end old file
        if(this.edit && image.status == false){
          this.filesDelete.push(image.id)
        }
        // delete from local variable
        this.files.splice(this.files.indexOf(image), 1)
      },
      // reset form
      reset() {
        // reset data produk
        this.produkData = {
          nama_produk: "",
          deskripsi_produk: "",
          stok : "",
          harga : "",
          diskon : '',
          publish_st : false
        };
        // reset files attch
        this.files = []
        // reset validation
        this.$validator.reset();
        // emit reset
        this.$emit("reset");
      },
    }
  }
</script>

<style scoped>

</style>
