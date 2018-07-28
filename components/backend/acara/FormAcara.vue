<template>
  <v-container fluid>
    <v-form>
      <v-layout row wrap >
        <!--field input-->
        <v-flex xs12 sm12 md6>
          <v-text-field
            v-model="acaraData.nama_acara"
            v-validate="this.validateRule.nama_acara"
            label="Nama Acara"
            data-vv-name="nama_acara"
            :error-messages="errors.collect('nama_acara')"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 sm6 md3 class="mr-5">
          <v-menu
            ref="date_menu"
            :close-on-content-click="false"
            :value="false"
            :nudge-right="40"
            :return-value.sync="acaraData.tanggal_acara"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="acaraData.tanggal_acara"
              v-validate="this.validateRule.tanggal_acara"
              label="Tanggal Acara"
              data-vv-name="tanggal"
              :error-messages="errors.collect('tanggal')"
              prepend-icon="event"
            ></v-text-field>
            <v-date-picker v-model="acaraData.tanggal_acara" @input="$refs.date_menu.save(acaraData.tanggal_acara)"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs12 sm6 md3 class="mr-5">
          <v-menu
            ref="menu"
            :close-on-content-click="false"
            v-model="showTimePicker"
            :nudge-right="40"
            :return-value.sync="acaraData.jam_acara"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="acaraData.jam_acara"
              v-validate="this.validateRule.jam_acara"
              label="Jam"
              data-vv-name="jam"
              :error-messages="errors.collect('jam')"
              prepend-icon="access_time"
            ></v-text-field>
            <v-time-picker
              v-if="showTimePicker"
              v-model="acaraData.jam_acara"
              @change="$refs.menu.save(acaraData.jam_acara)"
            ></v-time-picker>
          </v-menu>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 sm12 md12>
          <v-textarea
            v-model="acaraData.tempat_acara"
            v-validate="this.validateRule.tempat_acara"
            label="Tempat Acara"
            data-vv-name="tempat"
            :error-messages="errors.collect('tempat')"
            prepend-icon="place"
          ></v-textarea>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 sm12 md12 class="d-inline-block">
          <label aria-hidden="true" class="v-label">Status Publikasi</label>
          <v-switch
            v-model="acaraData.publish_st"
            color="teal"
          ></v-switch>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 sm12 md12 class="mt-3">
          <div class="mb-2">
            <label aria-hidden="true" class="v-label text--black">Deskripsi Acara</label>
          </div>
          <no-ssr>
            <vue-editor
              id="editor"
              v-model="acaraData.deskripsi_acara"
              v-validate="this.validateRule.deskripsi_acara"
              data-vv-name="deskripsi_acara"
            ></vue-editor>
          </no-ssr>
          <div class="v-messages error--text mt-2"  v-if="errors.collect('deskripsi_acara')">
            <div class="v-messages__wrapper">
              <div class="v-messages__message"  v-text="errors.collect('deskripsi_acara')[0]"></div>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex md12 sm12 xs12 class="d-inline-block mb-2">
          <label aria-hidden="true" class="v-label">Gambar Acara</label>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex md3 sm4 xs12 class="mr-2 mb-2" v-for="(file,index) in files" v-bind:key="index">
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
        <v-flex md3 sm4 xs12 style="min-height: 150px;border: 2px dashed #00897B;background:rgba(244, 244, 246, 0.47);">
          <v-card-actions class="layout align-center justify-center fill-height">
            <v-btn fab outline color="primary" @click="onPickFile">
              <v-icon>add</v-icon>
            </v-btn>
            <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked">
          </v-card-actions>
        </v-flex>
      </v-layout>
      <v-flex xs12 sm12 md12 justify-end align-end class="layout mt-2">
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
    name: "FormAcara",
    props: {
      acara : {
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
        acaraData: this.acara ? {...this.acara} : {
          nama_acara: "",
          tanggal_acara : "",
          jam_acara : null,
          tempat_acara : '',
          deskripsi_acara: "",
          publish_st : true
        },
        files : this.fileAttach ? this.fileAttach : [],
        filesDelete : [],
        // validate rule
        validateRule: {
          nama_acara: "required",
          tanggal_acara: "required",
          jam_acara : "required",
          tempat_acara : "required",
          deskripsi_acara : 'required',
        },
        showTimePicker : false
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
              let sendData = {...this.acaraData, filesAttach : filesAttach, filesDelete : this.filesDelete}
              // emit edit
              this.$emit("edit", sendData)
            }else{
              // declare send data
              let sendData = {...this.acaraData, filesAttach : filesAttach}
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
        // reset data acara
        this.acaraData = {
          nama_acara: "",
          tanggal_acara : "",
          jam_acara : null,
          tempat_acara : '',
          deskripsi_acara: "",
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
