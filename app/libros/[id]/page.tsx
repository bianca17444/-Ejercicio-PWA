import Link from "next/link";

type Libro = {
  id: number;
  titulo: string;
  autor: string;
  anio_publicacion: number | null;
  disponible: boolean;
};

async function getLibro(id: string): Promise<Libro | null> {
  const response = await fetch(`http://127.0.0.1:8000/api/libros/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export default async function LibroDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let libro: Libro | null = null;
  let mostrarError = false;

  try {
    libro = await getLibro(id);
  } catch {
    mostrarError = true;
  }

  if (mostrarError || !libro) {
    return (
      <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
        <h1>Detalle del libro</h1>
        <p style={{ marginTop: "1rem" }}>
          No se pudo encontrar este libro o la API no está disponible.
        </p>
        <Link href="/libros" style={{ display: "inline-block", marginTop: "1rem" }}>
          Volver al listado
        </Link>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <Link href="/libros">← Volver al listado</Link>
      <article style={{ marginTop: "1.5rem", maxWidth: "32rem" }}>
        <h1>{libro.titulo}</h1>
        <p style={{ marginTop: "0.75rem" }}>
          <strong>Autor:</strong> {libro.autor}
        </p>
        <p>
          <strong>Año de publicación:</strong> {libro.anio_publicacion ?? "No informado"}
        </p>
        <p>
          <strong>Disponibilidad:</strong>{" "}
          {libro.disponible ? "Disponible" : "No disponible"}
        </p>
      </article>
    </main>
  );
}
