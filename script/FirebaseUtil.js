import * as firebase from 'firebase'

class FirebaseUtil {

  static initialApp() {
    // const config = {
    //       apiKey: "AIzaSyC3bCd8GZlOSoC0tiD9Ets3lWhbo_TquQE",
    //       authDomain: "devfin-project.firebaseapp.com",
    //       databaseURL: "https://devfin-project.firebaseio.com",
    //       projectId: "devfin-project",
    //       storageBucket: "devfin-project.appspot.com",
    //       messagingSenderId: "925604061013"
    //   };
    var config = {
      apiKey: "AIzaSyD8-qoZFdLW8aqEfl91EWapGK3za98g45I",
      authDomain: "testproject-3782c.firebaseapp.com",
      databaseURL: "https://testproject-3782c.firebaseio.com",
      projectId: "testproject-3782c",
      storageBucket: "testproject-3782c.appspot.com",
      messagingSenderId: "303688420444"
    };
    firebase.initializeApp(config);
    this.listenToAuthStateChange();
    this.fbUi = new firebaseui.auth.AuthUI(firebase.auth());
  }

  static auth() {
    return firebase.auth();
  }

  static database() {
    return firebase.database();
  }

  static storage() {
    return firebase.storage();
  }

  // **** AUTHENTICATION *****
  static listenToAuthStateChange() {
    const thisObj = this;
    firebase.auth().onAuthStateChanged(function (user) {
      user ? thisObj.handleSignedInUser(user) : thisObj.handleSignedOutUser();
      thisObj.currentUser = user;
    });
  }

  static handleSignedInUser(user) {
    // show bottom part menues (via redux)
    console.log('signed in');
  }

  static handleSignedOutUser() {
    // hide bottom part menues (via redux)
    console.log('signed out');
  }

  static signOut() {
    firebase.auth().signOut();
  }

  static deleteAccount() {
    firebase.auth().currentUser.delete().catch(function (error) {
      if (error.code == 'auth/requires-recent-login') {
        // The user's credential is too old. She needs to sign in again.
        firebase.auth().signOut().then(function () {
          // The timeout allows the message to be displayed after the UI has
          // changed to the signed out state.
          setTimeout(function () {
            alert('Please sign in again to delete your account.');
          }, 1);
        });
      }
    });
  }

  static getDogs() {
    return firebase.database().ref('dogs/').once('value').then(function (snapshot) {
      var animalArr = [];
      var animalObj = snapshot.val();
      const animalIds = Object.keys(animalObj);
      
      animalIds.forEach(function (item, index) {
        var photourls = [];
        if (animalObj[item].photo_urls) {
          Object.values(animalObj[item].photo_urls).forEach(function (photo, idx) {
            photourls.push(photo);
          });
        }
        animalArr.push(
          {
            id: item,
            name: animalObj[item].name,
            type: animalObj[item].type,
            photo_urls: photourls,
            views: animalObj[item].views ? animalObj[item].views : 0,
            owner: animalObj[item].author.uid,
            timestamp: animalObj[item].timestamp
          }
        )
      });
      return animalArr;
    });
  }

  // function updateProfile() {
  //   var nameValue = document.getElementById("firstname").value;
  //   var user = firebase.auth().currentUser;

  //   user.updateProfile({
  //     displayName: nameValue
  //   }).then(function() {
  //     //displayUpdatePanel(false);
  //   }, function(error) {
  //     console.log(error);
  //   });

  // user.updateEmail("user@example.com").then(function() {
  //   // Update successful.
  // }, function(error) {
  //   // An error happened.
  // });
  //}
}
export default FirebaseUtil