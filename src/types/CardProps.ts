export type Plant = {
    id: number,
    image_url: string,
    name: string,
    price: number,
    description: string
    quantity: number
}


export type ItemCardProp = {
    id: number,
    image_url: string,
    name: string,
    price: number,
    description: string,
    quantity: number,
    isFavorited: boolean,
    handleFavorite: () => void
}