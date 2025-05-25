
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Prediction, GoogleMapsServices } from "../types/location.types";

// Lista expandida de ciudades españolas y Andorra para búsqueda local cuando la API no está disponible
const spanishCities = [
  // Andorra
  { description: "Andorra la Vella, Andorra", place_id: "andorra_la_vella_local" },
  { description: "Escaldes-Engordany, Andorra", place_id: "escaldes_local" },
  { description: "Encamp, Andorra", place_id: "encamp_local" },
  { description: "La Massana, Andorra", place_id: "la_massana_local" },
  { description: "Ordino, Andorra", place_id: "ordino_local" },
  { description: "Sant Julià de Lòria, Andorra", place_id: "sant_julia_local" },
  { description: "Canillo, Andorra", place_id: "canillo_local" },
  
  // Capitales de provincia y ciudades principales
  { description: "Madrid, España", place_id: "madrid_local" },
  { description: "Barcelona, España", place_id: "barcelona_local" },
  { description: "Valencia, España", place_id: "valencia_local" },
  { description: "Sevilla, España", place_id: "sevilla_local" },
  { description: "Zaragoza, España", place_id: "zaragoza_local" },
  { description: "Málaga, España", place_id: "malaga_local" },
  { description: "Murcia, España", place_id: "murcia_local" },
  { description: "Palma de Mallorca, España", place_id: "palma_local" },
  { description: "Las Palmas de Gran Canaria, España", place_id: "laspalmas_local" },
  { description: "Bilbao, España", place_id: "bilbao_local" },
  { description: "Alicante, España", place_id: "alicante_local" },
  { description: "Córdoba, España", place_id: "cordoba_local" },
  { description: "Valladolid, España", place_id: "valladolid_local" },
  { description: "Vigo, España", place_id: "vigo_local" },
  { description: "Gijón, España", place_id: "gijon_local" },
  { description: "Granada, España", place_id: "granada_local" },
  { description: "A Coruña, España", place_id: "coruna_local" },
  { description: "Vitoria-Gasteiz, España", place_id: "vitoria_local" },
  { description: "Santa Cruz de Tenerife, España", place_id: "tenerife_local" },
  { description: "Pamplona, España", place_id: "pamplona_local" },
  { description: "Almería, España", place_id: "almeria_local" },
  { description: "San Sebastián, España", place_id: "sansebastian_local" },
  { description: "Burgos, España", place_id: "burgos_local" },
  { description: "Albacete, España", place_id: "albacete_local" },
  { description: "Santander, España", place_id: "santander_local" },
  { description: "Castellón de la Plana, España", place_id: "castellon_local" },
  { description: "Logroño, España", place_id: "logrono_local" },
  { description: "Badajoz, España", place_id: "badajoz_local" },
  { description: "Salamanca, España", place_id: "salamanca_local" },
  { description: "Huelva, España", place_id: "huelva_local" },
  { description: "Lleida, España", place_id: "lleida_local" },
  { description: "Tarragona, España", place_id: "tarragona_local" },
  { description: "León, España", place_id: "leon_local" },
  { description: "Cádiz, España", place_id: "cadiz_local" },
  { description: "Jaén, España", place_id: "jaen_local" },
  { description: "Ourense, España", place_id: "ourense_local" },
  { description: "Girona, España", place_id: "girona_local" },
  { description: "Lugo, España", place_id: "lugo_local" },
  { description: "Cáceres, España", place_id: "caceres_local" },
  { description: "Ceuta, España", place_id: "ceuta_local" },
  { description: "Melilla, España", place_id: "melilla_local" },
  
  // Pueblos y ciudades adicionales de España
  { description: "Toledo, España", place_id: "toledo_local" },
  { description: "Segovia, España", place_id: "segovia_local" },
  { description: "Ávila, España", place_id: "avila_local" },
  { description: "Cuenca, España", place_id: "cuenca_local" },
  { description: "Guadalajara, España", place_id: "guadalajara_local" },
  { description: "Soria, España", place_id: "soria_local" },
  { description: "Palencia, España", place_id: "palencia_local" },
  { description: "Zamora, España", place_id: "zamora_local" },
  { description: "Teruel, España", place_id: "teruel_local" },
  { description: "Huesca, España", place_id: "huesca_local" },
  { description: "Pontevedra, España", place_id: "pontevedra_local" },
  { description: "Santiago de Compostela, España", place_id: "santiago_local" },
  { description: "Oviedo, España", place_id: "oviedo_local" },
  { description: "Mérida, España", place_id: "merida_local" },
  { description: "Ciudad Real, España", place_id: "ciudadreal_local" },
  { description: "Cartagena, España", place_id: "cartagena_local" },
  { description: "Elche, España", place_id: "elche_local" },
  { description: "Jerez de la Frontera, España", place_id: "jerez_local" },
  { description: "Marbella, España", place_id: "marbella_local" },
  { description: "Torremolinos, España", place_id: "torremolinos_local" },
  { description: "Benidorm, España", place_id: "benidorm_local" },
  { description: "Gandía, España", place_id: "gandia_local" },
  { description: "Alcoy, España", place_id: "alcoy_local" },
  { description: "Reus, España", place_id: "reus_local" },
  { description: "Manresa, España", place_id: "manresa_local" },
  { description: "Terrassa, España", place_id: "terrassa_local" },
  { description: "Sabadell, España", place_id: "sabadell_local" },
  { description: "Mataró, España", place_id: "mataro_local" },
  { description: "Badalona, España", place_id: "badalona_local" },
  { description: "L'Hospitalet de Llobregat, España", place_id: "hospitalet_local" },
  { description: "Getafe, España", place_id: "getafe_local" },
  { description: "Alcalá de Henares, España", place_id: "alcala_local" },
  { description: "Fuenlabrada, España", place_id: "fuenlabrada_local" },
  { description: "Leganés, España", place_id: "leganes_local" },
  { description: "Móstoles, España", place_id: "mostoles_local" },
  { description: "Alcorcón, España", place_id: "alcorcon_local" },
  { description: "Parla, España", place_id: "parla_local" },
  { description: "Torrejón de Ardoz, España", place_id: "torrejon_local" },
  { description: "Rivas-Vaciamadrid, España", place_id: "rivas_local" },
  { description: "Las Rozas de Madrid, España", place_id: "lasrozas_local" },
  { description: "Pozuelo de Alarcón, España", place_id: "pozuelo_local" },
  { description: "Majadahonda, España", place_id: "majadahonda_local" },
  { description: "Boadilla del Monte, España", place_id: "boadilla_local" },
  { description: "San Sebastián de los Reyes, España", place_id: "sansebastianreyes_local" },
  { description: "Alcobendas, España", place_id: "alcobendas_local" },
  { description: "Coslada, España", place_id: "coslada_local" },
  { description: "Collado Villalba, España", place_id: "collado_local" },
  { description: "Aranjuez, España", place_id: "aranjuez_local" },
  { description: "El Escorial, España", place_id: "escorial_local" },
  { description: "Chinchón, España", place_id: "chinchon_local" },
  { description: "Ronda, España", place_id: "ronda_local" },
  { description: "Antequera, España", place_id: "antequera_local" },
  { description: "Estepona, España", place_id: "estepona_local" },
  { description: "Fuengirola, España", place_id: "fuengirola_local" },
  { description: "Nerja, España", place_id: "nerja_local" },
  { description: "Mijas, España", place_id: "mijas_local" },
  { description: "Úbeda, España", place_id: "ubeda_local" },
  { description: "Baeza, España", place_id: "baeza_local" },
  { description: "Linares, España", place_id: "linares_local" },
  { description: "Andújar, España", place_id: "andujar_local" },
  { description: "Écija, España", place_id: "ecija_local" },
  { description: "Osuna, España", place_id: "osuna_local" },
  { description: "Carmona, España", place_id: "carmona_local" },
  { description: "Utrera, España", place_id: "utrera_local" },
  { description: "Dos Hermanas, España", place_id: "doshermanas_local" },
  { description: "Alcalá de Guadaíra, España", place_id: "alcalaguadaira_local" },
  { description: "Mairena del Aljarafe, España", place_id: "mairena_local" },
  { description: "Coria del Río, España", place_id: "coria_local" },
  { description: "La Rinconada, España", place_id: "rinconada_local" },
  { description: "Tomares, España", place_id: "tomares_local" },
  { description: "San Juan de Aznalfarache, España", place_id: "sanjuanaznalfarache_local" },
  { description: "Gelves, España", place_id: "gelves_local" },
  { description: "Palomares del Río, España", place_id: "palomares_local" },
  { description: "Villaverde del Río, España", place_id: "villaverde_local" },
  { description: "Burguillos, España", place_id: "burguillos_local" },
  { description: "Castilleja de la Cuesta, España", place_id: "castilleja_local" },
  { description: "Espartinas, España", place_id: "espartinas_local" },
  { description: "Gines, España", place_id: "gines_local" },
  { description: "Bormujos, España", place_id: "bormujos_local" },
  { description: "Bollullos de la Mitación, España", place_id: "bollullos_local" },
  { description: "Almensilla, España", place_id: "almensilla_local" },
  { description: "Pilas, España", place_id: "pilas_local" },
  { description: "Aznalcázar, España", place_id: "aznalcazar_local" },
  { description: "Isla Mayor, España", place_id: "islamayor_local" },
  { description: "Puebla del Río, España", place_id: "pueblario_local" },
  { description: "Villamanrique de la Condesa, España", place_id: "villamanrique_local" },
  { description: "Hinojos, España", place_id: "hinojos_local" },
  { description: "Almonte, España", place_id: "almonte_local" },
  { description: "Rociana del Condado, España", place_id: "rociana_local" },
  { description: "Bonares, España", place_id: "bonares_local" },
  { description: "Moguer, España", place_id: "moguer_local" },
  { description: "Palos de la Frontera, España", place_id: "palos_local" },
  { description: "La Palma del Condado, España", place_id: "palma_condado_local" },
  { description: "Niebla, España", place_id: "niebla_local" },
  { description: "Bollullos Par del Condado, España", place_id: "bollullos_condado_local" },
  { description: "Villarrasa, España", place_id: "villarrasa_local" },
  { description: "Chucena, España", place_id: "chucena_local" },
  { description: "Manzanilla, España", place_id: "manzanilla_local" },
  { description: "Villalba del Alcor, España", place_id: "villalba_local" },
  { description: "Escacena del Campo, España", place_id: "escacena_local" },
  { description: "Paterna del Campo, España", place_id: "paterna_local" },
  { description: "Berrocal, España", place_id: "berrocal_local" },
  { description: "El Madroño, España", place_id: "madrono_local" },
  { description: "Zalamea la Real, España", place_id: "zalamea_local" },
  { description: "Valverde del Camino, España", place_id: "valverde_local" },
  { description: "Beas, España", place_id: "beas_local" },
  { description: "Trigueros, España", place_id: "trigueros_local" },
  { description: "San Bartolomé de la Torre, España", place_id: "sanbartolome_local" },
  { description: "Gibraleón, España", place_id: "gibraleon_local" },
  { description: "Cartaya, España", place_id: "cartaya_local" },
  { description: "Lepe, España", place_id: "lepe_local" },
  { description: "Ayamonte, España", place_id: "ayamonte_local" },
  { description: "Isla Cristina, España", place_id: "islacristina_local" },
  { description: "Punta Umbría, España", place_id: "puntaumbria_local" },
  { description: "Aljaraque, España", place_id: "aljaraque_local" },
  { description: "Corrales, España", place_id: "corrales_local" },
  { description: "San Juan del Puerto, España", place_id: "sanjuanpuerto_local" },
  { description: "Tharsis, España", place_id: "tharsis_local" },
  { description: "Puebla de Guzmán, España", place_id: "pueblaguzman_local" },
  { description: "Sanlúcar de Guadiana, España", place_id: "sanlucarguadiana_local" },
  { description: "El Granado, España", place_id: "granado_local" },
  { description: "Villanueva de los Castillejos, España", place_id: "villanueva_local" },
  { description: "San Silvestre de Guzmán, España", place_id: "sansilvestre_local" },
  { description: "El Almendro, España", place_id: "almendro_local" },
  { description: "Villanueva de las Cruces, España", place_id: "villanueva_cruces_local" },
  { description: "Sanlúcar de Barrameda, España", place_id: "sanlucar_local" },
  { description: "Chipiona, España", place_id: "chipiona_local" },
  { description: "Rota, España", place_id: "rota_local" },
  { description: "El Puerto de Santa María, España", place_id: "puertosantamaria_local" },
  { description: "Puerto Real, España", place_id: "puertoreal_local" },
  { description: "Chiclana de la Frontera, España", place_id: "chiclana_local" },
  { description: "Conil de la Frontera, España", place_id: "conil_local" },
  { description: "Vejer de la Frontera, España", place_id: "vejer_local" },
  { description: "Barbate, España", place_id: "barbate_local" },
  { description: "Zahara de los Atunes, España", place_id: "zahara_local" },
  { description: "Tarifa, España", place_id: "tarifa_local" },
  { description: "Algeciras, España", place_id: "algeciras_local" },
  { description: "La Línea de la Concepción, España", place_id: "lalinea_local" },
  { description: "San Roque, España", place_id: "sanroque_local" },
  { description: "Los Barrios, España", place_id: "losbarrios_local" },
  { description: "Castellar de la Frontera, España", place_id: "castellar_local" },
  { description: "Jimena de la Frontera, España", place_id: "jimena_local" },
  { description: "Alcalá de los Gazules, España", place_id: "alcalagazules_local" },
  { description: "Medina-Sidonia, España", place_id: "medinasidonia_local" },
  { description: "Benalup-Casas Viejas, España", place_id: "benalup_local" },
  { description: "Paterna de Rivera, España", place_id: "paternarivera_local" },
  { description: "Algar, España", place_id: "algar_local" },
  { description: "Tahivilla, España", place_id: "tahivilla_local" }
];

export const useLocationSearch = (services: GoogleMapsServices, isApiLoading: boolean) => {
  const { toast } = useToast();
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const searchLocations = (input: string) => {
    if (!input.trim()) {
      setPredictions([]);
      setIsLoading(false);
      return;
    }

    // Si la API está cargando, no está disponible o status es null, usamos la búsqueda local
    if (isApiLoading || !services.autocompleteService || !services.status) {
      setIsLoading(true);
      
      // Buscar en nuestra lista local de ciudades españolas y Andorra
      const filteredCities = spanishCities.filter(city => 
        city.description.toLowerCase().includes(input.toLowerCase())
      ).map(city => ({
        description: city.description,
        place_id: city.place_id,
        // Añadir estructura compatible para la interfaz Prediction
        structured_formatting: {
          main_text: city.description.split(',')[0].trim(),
          secondary_text: city.description.includes('Andorra') ? "Andorra" : "España",
          main_text_matched_substrings: []
        }
      }));
      
      setPredictions(filteredCities);
      setIsLoading(false);
      
      if (!services.autocompleteService && filteredCities.length === 0) {
        setApiError("El servicio de autocompletado no está disponible. Usando opciones locales limitadas.");
      }
      
      return;
    }

    setIsLoading(true);
    setApiError(null);
    
    const searchOptions = {
      input,
      types: ['(cities)'], // Enfocarse específicamente en ciudades
      componentRestrictions: { country: ['es', 'ad'] } // Incluir España y Andorra
    };

    services.autocompleteService.getPlacePredictions(searchOptions, (predictions, status) => {
      setIsLoading(false);
      
      if (status !== services.status.OK) {
        console.error('Error fetching predictions:', status);
        setPredictions([]);
        
        if (services.status && status === services.status.ZERO_RESULTS) {
          // Usar búsqueda local como fallback
          const filteredCities = spanishCities
            .filter(city => city.description.toLowerCase().includes(input.toLowerCase()))
            .map(city => ({
              description: city.description,
              place_id: city.place_id,
              structured_formatting: {
                main_text: city.description.split(',')[0].trim(),
                secondary_text: city.description.includes('Andorra') ? "Andorra" : "España",
                main_text_matched_substrings: []
              }
            }));
          
          setPredictions(filteredCities);
          
          if (filteredCities.length === 0) {
            setApiError("No se encontraron resultados");
          }
        } else {
          setApiError(`Error: ${status}`);
        }
        
        return;
      }
      
      setPredictions(predictions || []);
    });
  };

  const getDetailsFromPlaceId = async (placeId: string): Promise<{
    formattedAddress: string;
    coordinates: { lat: number; lng: number };
  } | null> => {
    // Si es un ID local, devolver datos simulados
    if (placeId.includes('_local')) {
      const cityName = placeId.split('_')[0];
      
      // Coordenadas aproximadas para algunas ciudades principales
      const cityCoordinates: Record<string, { lat: number; lng: number }> = {
        madrid: { lat: 40.4168, lng: -3.7038 },
        barcelona: { lat: 41.3851, lng: 2.1734 },
        valencia: { lat: 39.4699, lng: -0.3763 },
        sevilla: { lat: 37.3891, lng: -5.9845 },
        malaga: { lat: 36.7213, lng: -4.4214 },
        andorra: { lat: 42.5063, lng: 1.5218 },
        // Añadir más ciudades según sea necesario
      };
      
      // Búsqueda del nombre de la ciudad en el objeto de coordenadas
      const coordinates = cityCoordinates[cityName.toLowerCase()] || { lat: 40.4168, lng: -3.7038 }; // Por defecto Madrid
      
      return {
        formattedAddress: spanishCities.find(city => city.place_id === placeId)?.description || `${cityName}, España`,
        coordinates
      };
    }
    
    if (!services.placesService || !services.status) {
      toast({
        title: "Error",
        description: "El servicio de lugares no está disponible",
        variant: "destructive",
      });
      return null;
    }

    return new Promise((resolve) => {
      services.placesService.getDetails(
        { placeId, fields: ['formatted_address', 'geometry'] },
        (place, status) => {
          if (services.status && status !== services.status.OK || !place) {
            toast({
              title: "Error",
              description: "No se pudieron obtener los detalles de esta ubicación",
              variant: "destructive",
            });
            resolve(null);
            return;
          }

          resolve({
            formattedAddress: place.formatted_address || '',
            coordinates: {
              lat: place.geometry?.location?.lat() || 0,
              lng: place.geometry?.location?.lng() || 0,
            },
          });
        }
      );
    });
  };

  return {
    predictions,
    isLoading,
    apiError,
    searchLocations,
    getDetailsFromPlaceId,
  };
};
