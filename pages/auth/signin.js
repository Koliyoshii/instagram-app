import { getProviders, signIn } from "next-auth/react";
import Header from "../../components/Header";

function SignInPage({ providers }) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-height-screen py-2 mt-11">
        <img className="w-80" src="https://links.papareact.com/ocw" alt="Instagram Logo" />
        <p className="font-xs italic">
            This is a project App for educational purposes only.
        </p>
        <div className=" mt-20">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-blue-500 rounded-lg text-white m-1"
                onClick={() => signIn(provider.id, { callbackUrl: '/'})}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  //get the initialized Providers
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default SignInPage;
