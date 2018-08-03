<template>
  <v-container fluid>
    <v-form>
      <v-layout wrap>
        <!--avatar-->
        <v-flex xs12 sm6 md4 justify-center text-xs-center>
          <div class="layout justify-center row wrap">
            <v-avatar size="150px" color="grey lighten-4">
              <img :src="userData.avatar" alt="avatar" v-if="userData.avatar">
            </v-avatar>
          </div>
          <div class="layout justify-center row wrap mt-2">
            <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
            <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked">
          </div>
        </v-flex>
        <!--field input-->
        <v-flex xs12 sm6 md8>
          <v-flex xs12 sm12 md12>
            <v-text-field
              v-model="userData.nama"
              v-validate="this.validateRule.nama"
              label="Nama"
              data-vv-name="nama"
              :error-messages="errors.collect('nama')"
              placeholder="nama user"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <v-text-field
              v-model="userData.username"
              v-validate="this.validateRule.username"
              data-vv-name="username"
              :error-messages="errors.collect('username')"
              label="Username"
              placeholder="username"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <v-text-field
              v-model="userData.email"
              v-validate="this.validateRule.email"
              data-vv-name="email"
              :error-messages="errors.collect('email')"
              label="E-Mail"
              placeholder="email"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <v-text-field
              v-model="userData.password"
              ref="password"
              v-validate="this.validateRule.password"
              data-vv-name="password"
              :error-messages="errors.collect('password')"
              :type="'password'"
              label="Password"
              name="password"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <v-text-field
              v-model="userData.password_confirm"
              v-validate="this.validateRule.password_confirm"
              data-vv-name="password_confirm"
              :error-messages="errors.collect('password_confirm')"
              :type="'password'"
              label="Konfirmasi Password"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md12>
            <v-switch
              v-model="userData.status"
              label="Status"
              color="teal"
            ></v-switch>
          </v-flex>
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
  name: "FormUser",
  props: {
    user: {
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
      userData: this.user
        ? { ...this.user }
        : {
            nama: "",
            username: "",
            email: "",
            password: "",
            password_confirm: "",
            status: 1,
            avatar: ""
          },
      validateRule : {
        nama: 'required',
        username: this.edit ? 'required' : 'required|uniqueUsername',
        email: this.edit ? 'required' :'required|email|uniqueEmail',
        password: this.edit ? 'verify_password' :'required|min:4|verify_password',
        password_confirm:  this.edit ? 'confirmed:password' :'required|min:4|confirmed:password',
      },
      tmp_image : false
    };
  },
  mounted() {
    // custom unique email validation
    this.$validator.extend("uniqueEmail", {
      // set validation
      validate: value => {
        return this.$axios
          .$post(
            "/user/isExsistEmail",
            { email: value },
            {
              headers: {
                Authorization: "Bearer " + this.$store.getters.getToken
              }
            }
          )
          .then(response => {
            return {
              valid: response.status,
              data: {
                message: "email sudah digunakan."
              }
            };
          });
      },
      // set message
      getMessage(field, params, data) {
        return (data && data.message) || "Something went wrong";
      }
    });
    // custom unique username validation
    this.$validator.extend("uniqueUsername", {
      // set validation
      validate: value => {
        return this.$axios
          .$post(
            "/user/isExsistUsername",
            { username: value },
            {
              headers: {
                Authorization: "Bearer " + this.$store.getters.getToken
              }
            }
          )
          .then(response => {
            return {
              valid: response.status,
              data: {
                message: "username sudah digunakan."
              }
            };
          });
      },
      // set message
      getMessage(field, params, data) {
        return (data && data.message) || "Something went wrong";
      }
    });
    // custom validation strong password
    this.$validator.extend('verify_password',{
       validate: value => {
            var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
            return strongRegex.test(value);
        },
        getMessage: field => `Password harus mengandung minimal 1 huruf kapital, 1 huruf kecil, 1 angka`,
    });
    // custom option vee validate
    const dict = {
      custom: {
        email: {
          required: "Email tidak boleh kosong.",
          email: "Format email tidak valid / email sudah digunakan",
          uniqueEmail: "Alamat email sudah digunakan."
        }
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
            // set user data edit
            let userDataEdit = this.userData
            if(! this.tmp_image){
              delete userDataEdit.avatar
            }
            this.$emit("edit", userDataEdit)
          }else{
            this.$emit("insert", this.userData)
          }
        }
      });
    },
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
        this.userData.avatar = fileReader.result;
        this.tmp_image = true;
      });
      fileReader.readAsDataURL(files[0]);
    },
    // reset form
    reset() {
      this.userData = {
        nama: "",
        username: "",
        email: "",
        password: "",
        password_confirm: "",
        status: 1,
        avatar: ""
      };
      this.$validator.reset();
      this.$emit("reset");
    },
  }
};
</script>
<style scoped>
.avatar {
  width: 200px !important;
  height: 200px !important;
}
</style>
