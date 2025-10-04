export interface HabitabilityResult {
  habitable: boolean;
  score: number;
  category: string;
  esi: number;
  equilibrium_temp: number;
  in_habitable_zone: boolean;
}

export interface PlanetClassification {
  planet_type: string;
  confidence: number;
  probabilities: Record<string, number>;
}

export interface TransitResult {
  image: string;
  depth: number;
  transits_detected: number;
}

export interface AnalysisRequest {
  radius: number;
  orbit: number;
  mass: number;
  starType: string;
  starMass?: number;
  starTemp?: number;
}
