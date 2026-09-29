import Link from "next/link";

type Libro = {
  id: number;
  titulo: string;
  autor: string;
  anio_publicacion: number | null;
  disponible: boolean;
};

async function getLibros(): Promise<Libro[]> {
  const response = await fetch("http://127.0.0.1:8000/api/libros", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("No se pudieron cargar los libros.");
  }

  return response.json();
}

export default async function LibrosPage() {
  let libros: Libro[] = [];

  try {
    libros = await getLibros();
  } catch {
    return (
      <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
        <h1>Biblioteca</h1>
        <p style={{ marginTop: "1rem" }}>
          No se pudieron cargar los libros. Intentá nuevamente más tarde.
        </p>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Listado de libros</h1>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "1.5rem" }}>
        {libros.map((libro) => (
          <li
            key={libro.id}
            style={{
              marginBottom: "0.75rem",
              padding: "0.75rem 1rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <Link href={`/libros/${libro.id}`} style={{ fontWeight: 600 }}>
              {libro.titulo}
            </Link>
            <span style={{ display: "block", marginTop: "0.25rem" }}>
              {libro.autor}
              {!libro.disponible && " (No disponible)"}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
