import Background from "@/components/background";
import Header from "@/components/header";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const buttonCss =
    "bg-netflixRed hover:bg-red-700 duration-200 rounded-md text-white";
  return (
    <>
      <Header />

      <Background>
        <div className=" flex flex-col items-center text-white space-y-8 ">
          <h1 className="text-3xl md:text-5xl font-bold ">
            Unlimited movies, TV shows and more
          </h1>
          <h1 className="text-lg md:text-2xl font-semibold ">
            Watch anywhere. Cancel anytime.
          </h1>
          <h1 className="text-lg md:text-2xl font-normal ">
            Ready to watch? Enter your email to create or restart your
            membership.
          </h1>
        </div>
        <div className=" flex justify-center space-x-4">
          <input
            className="bg-black bg-opacity-70 h-14 w-80 rounded p-4 text-white"
            type="text"
            placeholder="Email address"
          />
          <button
            onClick={() => router.push("/signup")}
            className={`${buttonCss} rounded-md bg-netflixRed h-14 w-64 text-2xl font-medium `}
          >
            {"Get Started >"}
          </button>
        </div>
      </Background>
    </>
  );
}
