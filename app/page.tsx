import { AuthHeader } from "./auth";
import { supabase } from "@/lib/supabase";
import { sql } from "@vercel/postgres";

export default async function Home() {
  const { data, error } = await supabase.from("fuga").select();
  console.log(data, error);
  const { error: e2 } = await supabase
    .from("fuga")
    .insert({ id: new Date().getTime() });
  console.log(e2);

  // await sql`CREATE TABLE Pets ( Name varchar(255), Owner varchar(255) );`;
  const { rows } = await sql`SELECT * from Pets`;
  console.log(rows);
  await sql`INSERT INTO Pets (Name, Owner) VALUES ('Fido', 'Joe');`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header className="flex items-start gap-3">
        <AuthHeader />
      </header>
    </main>
  );
}
