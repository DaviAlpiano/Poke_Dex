import pokeLogo from '../assets/pokebolaIcon.webp';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto py-8 bg-black/50 backdrop-blur-md border-t border-white/20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 mb-2">
            <img src={pokeLogo} alt="Pokeball" className="w-6 h-6" />
            <span className="text-white font-black uppercase tracking-widest text-sm">
              Poké<span className="text-yellow-400">Dex</span>
            </span>
          </div>
          <p className="text-white/60 text-xs">
            © {currentYear} — Todos os direitos reservados.
          </p>
        </div>

        <div className="text-center">
          <p className="text-white/80 text-sm">
            Dados de{' '}
            <a
              href="https://pokeapi.co/"
              target="_blank"
              className="text-yellow-400 hover:underline"
            >
              PokeAPI
            </a>
          </p>
          <p className="text-white/80 text-sm">
            Arte de{' '}
            <a
              href="https://www.artstation.com/arkhaipixels"
              target="_blank"
              className="text-yellow-400 hover:underline"
            >
              Arkhaipixels
            </a>
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <p className="text-white text-sm font-bold mb-2">
            Feito pelo{' '}
            <span className="text-yellow-400">Lendário Treinador</span> Davi
          </p>
          <div className="flex gap-4">
            <a
              href="https://github.com/DaviAlpiano"
              target="_blank"
              className="text-white/60 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/davialpiano/"
              target="_blank"
              className="text-white/60 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/DaviAlpiano/poke_site"
              target="_blank"
              className="text-white/60 hover:text-white transition-colors"
            >
              Repositório do Projeto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
