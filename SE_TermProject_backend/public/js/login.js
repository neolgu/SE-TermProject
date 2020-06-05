function toggleSignIn() {
	if (firebase.auth().currentUser) {
		firebase.auth().signOut();
	} else {
		var email = document.getElementById('email').value;
		var password = document.getElementById('password').value;

		if (email.length < 4) {
			alert('Please enter an email address.');
			return;
		}
		if (email.length < 4) {
			alert('Please enter a password.');
		}

		firebase.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;

			if (errorCode === 'auth/wrong-password') {
				alert('Wrong password.');
			} else {
				alert(errorMessage);
			}

			console.log(error);
			document.getElementById('quickstart-sign-in').disabled = false;
		});
	}
	document.getElementById('quickstart-sign-in').disabled = true;
}

function handleSignUp(){
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;

	/*email & password verify*/
	if (email.length < 4) {
		alert('Please enter an email address.');
		return;
	}
	if (password.length < 4) {
		alert('Please enter a password');
		return;
	}

	// create with email
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;

		if (errorCode == 'auth/weak-password') {
			alert('The password is too weak.');
		} else {
			alert(errorMessage);
		}
		console.log(error);
	});
}

function initApp() {
	firebase.auth().onAuthStateChange(function(user) {
		document.getElementById('quickstart-verify-email').disabled = true;

		if (user) {
			var displayName = user.displayName;
			var email = user.email;
			var emailVerified = user.emailVerified;
			var photoURL = user.photoURL;
			var isAnonymous = user.isAnonymous;
			var uid = user.uid;
			var porviderData = user.providerData;

			document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
			document.getElementById('quickstart-sign-in').textContent = 'Sign out';
			document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
			if (!emailVerified) {
				document.getElementById('quickstart-verify-email').disabled = false;
			}

		} else {
			document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
			document.getElementById('quickstart-sign-in').textContent = 'Sign in';
			document.getElementById('quickstart-account-details').textContent = 'null';
		}
		document.getElementById('quickstart-sign-in').disabled = false;
	});

	document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
	document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
	document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
	document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
}

window.onload = function() {
	initApp();
};