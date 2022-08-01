import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import fsPromises from "fs/promises";
import path from "path";

const columns = [
  { field: "cuenta", headerName: "Cuenta", width: 150 },
  { field: "cedula", headerName: "Cédula", width: 150 },
  { field: "cliente", headerName: "Cliente", width: 150 },
  { field: "desc_mercado", headerName: "Mercado", width: 150 },
  { field: "plataforma", headerName: "Plataforma", width: 150 },
  { field: "nombre_plan", headerName: "Plan", width: 150 },
  { field: "estatus_cuenta", headerName: "Estado", width: 150 },
  { field: "segmento", headerName: "Segmento", width: 150 },
];

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), "/json/parque.json");
  const jsonData = await fsPromises.readFile(filePath);
  const posts = JSON.parse(jsonData);
  // console.log(data);
  return { props: { posts } };
}

export default function Home({ posts }) {
  // const { data, error } = useSWR("/api/hello", fetcher);
  // console.log(data.toJson());

  // const rows = data;
  return (
    <div className={styles.container}>
      <Head>
        <title>Cuentas Movistar TV</title>
        <meta name="description" content="Busqueda de cuentas Movistar TV" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Consulta TV</h1>

        <div style={{ height: 300, width: "100%" }}>
          <DataGrid rows={posts} columns={columns} getRowId={(row)=>row.ID } components={{ Toolbar: GridToolbar }}/>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
