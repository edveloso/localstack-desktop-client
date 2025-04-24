import Services from "./services";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bem-vindo ao Portal LocalStack</h1> {/* Título aumentado */}
      <p className="mb-8"> {/* Adiciona margem inferior */}
        <br />
        Este é um portal de gerenciamento para serviços da AWS em execução no LocalStack.
        Aqui você pode visualizar e gerenciar serviços como SQS, SNS, DynamoDB e muito mais.
        
        Com o LocalStack, você pode simular o comportamento dos serviços da AWS em seu ambiente local,
        permitindo que você desenvolva e teste suas aplicações sem a necessidade de uma conexão com a nuvem.
        <br />
        <br />
      </p>

      <Services />
    </main>
  );
}
