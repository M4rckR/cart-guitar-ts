export type Guitar = {
    id: number | string
    name: string
    image: string
    description: string
    price: number
}

export type GuitarApp = Guitar&{}


export type CartItem = Guitar & {
    quantity: number
}

