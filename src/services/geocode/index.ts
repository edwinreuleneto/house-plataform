// Dependencies
export interface Coordinates {
  lat: number
  long: number
}

const GeocodeAddress = async (address: string): Promise<Coordinates | null> => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(address)}`
  try {
    const response = await fetch(url)
    const data = await response.json()
    if (data && data.length > 0) {
      return { lat: parseFloat(data[0].lat), long: parseFloat(data[0].lon) }
    }
    return null
  } catch {
    return null
  }
}

export { GeocodeAddress }
