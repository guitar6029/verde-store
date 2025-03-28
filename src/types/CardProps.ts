export type Plant = {
    id: string,
    image_url: string,
    name: string,
    price: number,
    description: string
    quantity: number,
    category: string
}

export type Item = {
    id: string,
    image_url: string,
    name: string,
    price: number,
    description: string
}

export type ItemCardProp = {
    id: string,
    image_url: string,
    name: string,
    price: number,
    description: string,
    quantity: number,
    isFavorited: boolean,
    handleFavorite: (itemId: string) => void
    handleCart: (item: Item) => void
}