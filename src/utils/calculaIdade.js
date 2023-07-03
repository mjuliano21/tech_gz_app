export default function calculaIdade(data) {
  if (!data) {
    return 0;
  }
  const datanascimento = new Date(data);
  const hoje = new Date();

  const idade = hoje.getFullYear() - datanascimento.getFullYear()
             - (hoje.getMonth() < datanascimento.getMonth()
             || (hoje.getMonth() === datanascimento.getMonth()
             && hoje.getDate() < datanascimento.getDate()));
  return idade ?? 0;
}
