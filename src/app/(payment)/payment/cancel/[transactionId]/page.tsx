interface PageProps {
  params: { transactionId: string };
}

export default function Page({ params }: PageProps) {
  const { transactionId } = params;

  if (!transactionId) return <div>No transaction ID found!</div>;

  return <div>Transaction ID: {transactionId}</div>;
}
