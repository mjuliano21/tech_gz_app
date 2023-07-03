export default function formatePhone(phone) {
  return phone
    .replace(/\D/g, '') // Remove tudo o que não é dígito
    .replace(/^(\d{2})\B/, '($1) ') // Coloca parênteses em volta dos dois primeiros dígitos
    .replace(/(\d{1})?(\d{4})(\d{4})/, '$1$2-$3'); // Coloca hífen entre o quarto e o quinto dígitos
}
