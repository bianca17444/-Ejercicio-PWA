import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Biblioteca</h1>
      <p style={{ marginTop: "1rem" }}>Bienvenido a la biblioteca.</p>
      <Link href="/libros" style={{ display: "inline-block", marginTop: "1rem" }}>
        Ver libros
      </Link>
    </main>
  );
}
