// ** Third Party Imports
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/*
 * As we do not have backend server, the refresh token feature has not been incorporated into the template.
 * Please refer https://next-auth.js.org/tutorials/refresh-token-rotation link for a reference.
 */

export const authOptions = {
	// ** Configure one or more authentication providers
	// ** Please refer to https://next-auth.js.org/configuration/options#providers for more `providers` options
	providers: [
		CredentialsProvider({
			// ** The name to display on the sign in form (e.g. 'Sign in with...')
			name: "Credentials",
			type: "credentials",

			/*
			 * As we are using our own Sign-in page, we do not need to change
			 * username or password attributes manually in following credentials object.
			 */
			credentials: {},
			async authorize(credentials) {
				/*
				 * You need to provide your own logic here that takes the credentials submitted and returns either
				 * an object representing a user or value that is false/null if the credentials are invalid.
				 * For e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
				 * You can also use the `req` object to obtain additional parameters (i.e., the request IP address)
				 */
				// const { email, password } = credentials

				try {
					// ** Login API Call to match the user credentials and receive user data in response along with his role
					// const res = await fetch(`${process.env.API_URL}/api/login`, {
					//   method: 'POST',
					//   headers: {
					//     'Content-Type': 'application/json'
					//   },
					//   body: JSON.stringify({ email, password })
					// })
					// const user = await res.json()

					// if (res.status === 200 && user) {
					//   /*
					//    * Please unset all the sensitive information of the user either from API response or before returning
					//    * user data below. Below return statement will set the user object in the token and the same is set in
					//    * the session which will be accessible all over the app.
					//    */
					//   return user
					// }

					if (credentials.user) {
						return JSON.parse(credentials.user);
					}

					return null;
				} catch {
					throw new Error("Credentials is invalid");
				}
			},
		}),

		// ** ...add more providers here
	],

	// ** Please refer to https://next-auth.js.org/configuration/options#session for more `session` options
	session: {
		/*
		 * Choose how you want to save the user session.
		 * The default is `jwt`, an encrypted JWT (JWE) stored in the session cookie.
		 * If you use an `adapter` however, NextAuth default it to `database` instead.
		 * You can still force a JWT session by explicitly defining `jwt`.
		 * When using `database`, the session cookie will only contain a `sessionToken` value,
		 * which is used to look up the session in the database.
		 */
		strategy: "jwt",

		// ** Seconds - How long until an idle session expires and is no longer valid
		maxAge: 30 * 24 * 60 * 60, // ** 30 days
	},

	// ** Please refer to https://next-auth.js.org/configuration/options#pages for more `pages` options
	pages: {
		// signIn: "/user/login",
		signOut: "/user/login",
		// error: '/404'
	},

	// ** Please refer to https://next-auth.js.org/configuration/options#callbacks for more `callbacks` options
	callbacks: {
		/*
		 * While using `jwt` as a strategy, `jwt()` callback will be called before
		 * the `session()` callback. So we have to add custom parameters in `token`
		 * via `jwt()` callback to make them accessible in the `session()` callback
		 */
		async jwt({ token, user, trigger, session }) {
			if (user) {
				/*
				 * For adding custom parameters to user in session, we first need to add those parameters
				 * in token which then will be available in the `session()` callback
				 */
				token.user = user;
			}

			if (trigger === "update" && session?.id) {
				// Note, that `session` can be any arbitrary object, remember to validate it!
				token.user = session;
			}

			return token;
		},
		async session({ session, token, trigger,  newSession }) {
			if (session.user) {
				// ** Add custom params to user in session which are added in `jwt()` callback via `token` parameter
				session.user = token.user;
			}

			 if (trigger === "update" && newSession?.id) {
        // You can update the session in the database if it's not already updated.
        // await adapter.updateUser(session.user.id, { name: newSession.name })

        // Make sure the updated value is reflected on the client
								session.user = newSession;
      }

			return session;
		},

		// async redirect(params) {
		// 	const { url } = params;

		// 	console.log({ url }, "sss");

		// 	// url is just a path, e.g.: /videos/pets
		// 	if (!url.startsWith("http")) return url;

		// 	// If we have a callback use only its relative path
		// 	const callbackUrl = new URL(url).searchParams.get("callbackUrl");

		// 	if (!callbackUrl) return url;

		// 	return new URL(callbackUrl).pathname;
		// },
	},
};

export default NextAuth(authOptions);
