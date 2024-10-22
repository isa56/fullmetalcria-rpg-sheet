import Image from 'next/image';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="text-center flex justify-center align-center">
      <h3>404 - Opa! Tá perdido?</h3>
      <p>A página que você está buscando não existe!</p>
      <Link href="/">
        Voltar para a página inicial
      </Link>
      <Image src="/assets/duvidas.webp" alt="Você está perdido?" className="h-16 md:h-20 object-contain px-4 mb-4 md:mb-0" />
    </div>
  );
}
