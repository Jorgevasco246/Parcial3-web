import Link from "next/link";
import { apiFetch } from "../../../lib/api";
import { notFound } from "next/navigation";
import { LoanRequest } from "../../../lib/loan-types";

type ReceiptPageProps = { params: Promise<{ id: string }> };

export default async function ReceiptPage({ params }: ReceiptPageProps) {
  // TODO FRONT-C: leer params y consultar el detalle con apiFetch.


   const { id } = await params
   const toolId = Number(id)
//Forma 1
  // const response = await apiFetch('/loan-requests/${toolId}',{
  //       method: 'GET',
  //       headers: {
  //           'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //           id: (await params),
  //       })
  //   });
  // if (response?.status === 404) notFound();
  // const request: ReceiptPageProps = await response.json();

//Forma 2
  const response = await apiFetch(`/loan-requests/${(toolId)}`);
  if (!response.ok) notFound();
  const request: LoanRequest = await response.json();

  // TODO FRONT-C: mostrar ID, purpose, days y tool.name de la solicitud recibida.
  
  void params;

  return (
    <main>
      <h1>Loan receipt</h1>
      <Link href="/loan-requests">Back to requests</Link>
      <section className="panel">
        <p>Complete the request details.</p>
        <h1>Pedido</h1> <dd>{request.id}</dd>
        <h1>Purpose</h1> <dd>{request.purpose}</dd>
        <h1>days</h1> <dd>{request.days}</dd>
        <h1>tool</h1> <dd>{request.tool.name}</dd>
      </section>
    </main>
  );
}