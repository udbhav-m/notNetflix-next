import {
  usernameState,
  passwordState,
  emailState,
} from "@/atoms/atom";
import Background from "@/components/background";
import Header from "@/components/header";
import { validateSignUpData } from "@/utils/functions";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";

const SignUp = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const [username, setUsername] = useRecoilState(usernameState);
  const [password, setPassword] = useRecoilState(passwordState);
  const [email, setEmail] = useRecoilState(emailState);
  const buttonCss =
    "bg-netflixRed hover:bg-red-700 duration-200 rounded-md text-white";

  async function handleSignUp() {
    if (validateSignUpData(email, password, username)) {
      const api = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await api.json();
      console.log(data);
      if (data.message) {
        router.push("/login");
      }
      if (data.error) {
        setError(data.error);
      }
    } else {
      setError("invalid data");
    }
  }

  return (
    <>
      <Header />
      <Background>
        <div className="flex justify-center items-center text-white w-screen  pt-10">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-10  bg-black bg-opacity-70 px-16 py-14 "
          >
            <h1 className="text-4xl font-bold">Sign Up</h1>
            <div className="flex flex-col gap-4">
              <input
                onChange={(e) => {
                  setError("");
                  setUsername(e.target.value);
                }}
                className={`w-80 h-14 px-3 rounded-md bg-neutral-900 bg-opacity-50 border border-white border-opacity-50 `}
                type="text"
                placeholder="Username"
              />
              <input
                onChange={(e) => {
                  setError("");
                  setEmail(e.target.value);
                }}
                className="w-80 h-14 px-3 rounded-md bg-neutral-900 bg-opacity-50 border border-white border-opacity-50"
                type="text"
                placeholder="Email address"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-80 h-14 px-3 rounded-md bg-neutral-900 bg-opacity-50 border border-white border-opacity-50"
                type="password"
                placeholder="password"
              />
              <h1
                className={`${
                  error ? "visible" : "hidden"
                } text-xs px-3 my-0 font-semibold text-red-400`}
              >
                {error}
              </h1>
              <button
                onClick={handleSignUp}
                className={`${buttonCss} h-10 w-80`}
              >
                Sign Up
              </button>
            </div>
            <h1 className={`text-gray-300`}>
              Already have Netflix?{" "}
              <b
                onClick={() => {
                  setError("");
                  router.push("/login");
                }}
                className="text-white cursor-pointer"
              >
                Sign In now
              </b>
            </h1>
          </form>
        </div>
      </Background>
    </>
  );
};

export default SignUp;
