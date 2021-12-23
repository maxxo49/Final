<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="display-2 font-weight-bold mb-6">Sign In Form</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="[(v) => !!v || 'Password is required']"
            label="Password"
            type="password"
            :counter="20"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="blue"
            class="mr-4"
            @click="SignInWithEmailAndPassword"
          >
            Sign In
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-divider class="my-3"></v-divider>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-btn class="login-button my-2 pa-2" @click="googleSignIn">
          <v-icon color="red" large> mdi-google </v-icon>&nbsp;Log in with
          google
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template> 

<script>
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
export default {
  data: () => ({
    valid: true,
    email: "",
    password: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),
  methods: {
    SignInWithEmailAndPassword() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          console.log(userCredential);
          this.$router.push({ path: "/macxx" });
          // ...
        })
        .catch((error) => {
          alert("not admin");
          console.log(error);
        });
    },
    googleSignIn() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          console.log(result);
          const credential = GoogleAuthProvider.credentialFromResult(result);
          console.log(credential);
          this.$router.push({ path: "/profile" });
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          console.log(error);
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log(credential);
          // ...
        });
    },
  },
  watch: {},
  computed: {},
  mounted() {},
};
</script> 
 
<style>
</style> 
