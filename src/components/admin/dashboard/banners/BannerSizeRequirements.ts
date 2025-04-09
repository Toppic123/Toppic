
// Constants for banner size requirements
export const BANNER_SIZE_REQUIREMENTS = {
  homepage: {
    width: 1200,
    height: 300,
    name: "Banner de Página Principal",
    description: "Aparecerá en la sección superior de la página principal"
  },
  sidebar: {
    width: 300,
    height: 600,
    name: "Banner Lateral",
    description: "Aparecerá en la barra lateral de las páginas de concursos"
  },
  contestPage: {
    width: 800,
    height: 200,
    name: "Banner de Concurso",
    description: "Aparecerá en la página de detalles de concursos"
  }
};

export type BannerType = keyof typeof BANNER_SIZE_REQUIREMENTS;
