import Link from "next/link";
import { apiFetch } from "../../lib/api";
import type { Tool } from "../../lib/loan-types";
import { ReactNode } from "react";

type LoanRequestsPageProps = {
  id: any;
  status: ReactNode; searchParams: Promise<{ toolId?: string }> 
};

export default async function LoanRequestsPage({ searchParams }: LoanRequestsPageProps) {
  // Esta consulta solo prepara las opciones que se necesitan para el selector del filtro.
  const toolsResponse = await apiFetch("/tools");
  const tools: Tool[] = toolsResponse.ok ? await toolsResponse.json() : [];
  
  
  // TODO FRONT-A: leer searchParams y consultar las solicitudes con apiFetch.
  const { toolId } = await searchParams;
   const path = toolId  ? `/loan-requests?toolId=${(toolId)}` : "/loan-requests";

  const response = await apiFetch(path);
  const requests: LoanRequestsPageProps[] = response.ok ? await response.json() : [];

  // TODO FRONT-A: agregar el formulario GET de filtro usando tools y la opción All tools.
  // TODO FRONT-A: mostrar las solicitudes y sus enlaces al comprobante correspondiente.
  void searchParams;
  void tools;

  return (
    <main>
      <h1>Loan requests</h1>
      <Link className="button" href="/loan-requests/new">New request</Link>
      <section className="panel" aria-label="Loan requests">
        <p>Complete the request list and its filter.</p>
        
         <form method="GET" action="/loan-requests">
          <label id="toolId">Filtrado por los tool: </label>
          <select id="toolId" name="toolId" defaultValue={toolId}>
             <option value="">All tools</option>
             {tools.map((tool) => (
               <option key={tool.id} value={tool.id}>
                 {tool.name}
               </option>
             ))}
           </select>
          </form>
        </section>
        <section>
          <section>
           <ul>
             {requests.map((request) => (
               <li key={request.id}>
                <span>
                   Request #{request.id} — Status: {request.status}
                 </span>

                 <Link
                   className="button"
                   href={`/loan-requests/${request.id}`}>

                   Solicitudes
                 </Link>
               </li>
             ))}
           </ul>
           </section>
      </section>
    </main>
  );
}
