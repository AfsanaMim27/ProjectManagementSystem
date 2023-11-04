"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import "./login.css";
export default function SignIn(props) {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const { error, callbackUrl } = props.searchParams;
	let linkAfterLogin = callbackUrl ?? "/user-dashboard";
	linkAfterLogin = linkAfterLogin === "http://localhost:3000/" ? "/user-dashboard" : linkAfterLogin;
	const submitForm = async () => {
		await signIn("credentials", {
			username: userName,
			password: password,
			redirect: true,
			callbackUrl: linkAfterLogin,
		});
	};
	return (
		<div className="loginFormContainer">
			<form className="loginForm">
				{error ? (
					<div className="alert alert-danger">Authentication Failed</div>
				) : null}
				<div className="form-outline mb-4">
					<label className="form-label">User Name</label>
					<input
						type="text"
						id="userName"
						className="form-control"
						onChange={(e) => setUserName(e.target.value)}
					/>
				</div>
				<div className="form-outline mb-4">
					<label className="form-label">Password</label>
					<input
						type="password"
						id="password"
						className="form-control"
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="d-grid">
					<button
						type="button"
						className="btn btn-primary btn-block mb-4"
						onClick={submitForm}
					>
						Sign in
					</button>
				</div>
			</form>
		</div>
	);
}
