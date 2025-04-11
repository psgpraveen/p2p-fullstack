import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Welcome to P2P Book Exchange!</h1>
        <p>Browse and exchange books easily.</p>
      </main>
    </>
  );
}
