export * from "./weather/index";
export * from "./air-pollution";
export * from "./options";

export interface Location {
  /**
   * Name of the found location
   */
  name: string;
  /**
   * * local_names.[language code] - Name of the found location in different languages. The list of names can be different for different locations
   * * local_names.ascii - Internal field
   * * local_names.feature_name - Internal field
   */
  local_names: any;
  /**
   * Geographical coordinates of the found location (latitude)
   */
  lat: number;
  /**
   * Geographical coordinates of the found location (longitude)
   */
  lon: number;
  /**
   * Country of the found location
   */
  country: string;
  /**
   * State of the found location (where available)
   */
  state: string | undefined;
}
