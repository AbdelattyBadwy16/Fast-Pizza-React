import CreateUser from "../features/uesr/CreateUser"
function Home() {
  return (
    <div className="my-10 text-center sm:my-16">
      <h1 className="text-xl mb-4 font-semibold md:text-3xl px-4">
        The best pizza.
        <br />
        <span className="text-yellow-500">
        Straight out of the oven, straight to you.
        </span>
      </h1>

      <CreateUser></CreateUser>
    </div>
  );
}

export default Home;
