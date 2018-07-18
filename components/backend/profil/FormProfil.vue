<template>
  <v-container fluid>
    <v-form>
      <v-layout wrap>
        <!--field input-->
        <v-flex xs12 sm12 md12>
            <v-text-field
              v-model="profilData.nama_profil"
              v-validate="this.validateRule.nama_profil"
              label="Nama Profil"
              data-vv-name="nama_profil"
              :error-messages="errors.collect('nama_profil')"
              placeholder="nama profil"
            ></v-text-field>
        </v-flex>
        <v-flex xs12 sm12 md12 class="my-3">
          <no-ssr>
            <vue-editor
              id="editor"
              v-model="profilData.isi_profil"
              v-validate="this.validateRule.isi_profil"
              data-vv-name="isi_profil"
            ></vue-editor>
          </no-ssr>
          <div class="v-messages error--text mt-2"  v-if="errors.collect('isi_profil')">
            <div class="v-messages__wrapper">
              <div class="v-messages__message"  v-text="errors.collect('isi_profil')[0]">nama_profil harus diisi.</div>
            </div>
          </div>
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
  name: "FormUser",
  props: {
    profil: {
      type: Object,
      required: false
    },
    edit : {
      type : Boolean,
      default : false
    }
  },
  data() {
    return {
      profilData: this.profil ? { ...this.profil } : {
            nama_profil: "",
            isi_profil: "",
          },
      validateRule : {
        nama_profil: 'required',
        isi_profil: 'required',
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
    // submit form
    submit() {
      // run validation
      this.$validator.validateAll().then(res => {
        if (res) {
          if(this.edit){
            this.$emit("edit", this.profilData)
          }else{
            this.$emit("insert", this.profilData)
          }
        }
      });
    },
    // reset form
    reset() {
      this.profilData = {
        nama_profil: "",
        isi_profil: "",
      };
      this.$validator.reset();
      this.$emit("reset");
    },
  }
};
</script>

<style scoped>
</style>
