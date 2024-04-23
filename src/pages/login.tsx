import { emailState, passwordState } from "@/atoms/atom";
import Background from "@/components/background";
import Header from "@/components/header";
import { validateLoginData } from "@/utils/functions";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [email, setEmail] = useRecoilState(emailState);
  const [password, setPassword] = useRecoilState(passwordState);

  async function handleLogin() {
    if (validateLoginData(email, password)) {
      let api = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      let data = await api.json();
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        router.push("/browse");
      }
    } else {
      setError("Invalid data");
    }
  }

  const buttonCss =
    "bg-netflixRed hover:bg-red-700 duration-200 rounded-md text-white";
  return (
    <>
      <Header />
      <Background>
        <div className="flex justify-center items-center text-white w-screen h-10/12 ">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-10 w-auto bg-black bg-opacity-70 px-16 py-14"
          >
            <h1 className="text-4xl font-bold">Sign In</h1>
            <div className="flex flex-col gap-4">
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
                onChange={(e) => {
                  setError("");
                  setPassword(e.target.value);
                }}
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
                onClick={handleLogin}
                className={`${buttonCss} h-10 w-80`}
              >
                Sign In
              </button>
            </div>
            <h1 className={`text-gray-300`}>
              {"New to Netflix?" + " "}
              <b
                onClick={() => router.push("/signup")}
                className="text-white cursor-pointer"
              >
                Sign up now
              </b>
            </h1>
          </form>
        </div>
      </Background>
    </>
  );
};

export default Login;
