/*
 * Handle the Sign Out button press
*/
function handleSignOut(){
	if(firebase.auth().currentUser){
		// LOGOUT
		firebase.auth().signOut().then(function(){
			alert("Sign out");
            window.location = "sign-in.html" // Page reload
		});
	}
}

/*
 * init User Profile and Auth Listener
*/
function initApp() {
	// Listening for auth state changes.
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			// User is signed in.
			var displayName = user.displayName;
			var email = user.email;
			var emailVerified = user.emailVerified;
			var photoURL = user.photoURL;
			var isAnonymous = user.isAnonymous;
			var uid = user.uid;
			var providerData = user.providerData;

			// Alert message when logged in
			//alert("email: " + email + "uid: " + uid);

			document.getElementById('user-email_').innerHTML = email;
			document.getElementById('user-name_').innerHTML = displayName;
		} else {
			// User is signed out.
			//alert("No User");
			window.location = "sign-in.html" // If not sign-in, redirect
		}
    });

    console.log("init");
    document.getElementById('SIGNOUT').addEventListener('click', handleSignOut, false);
}

initApp();