import { ShoppingCart } from '@phosphor-icons/react'
import { useTheme } from 'styled-components'

import { QuantityInput } from '../Form/QuantityInput'
import {
  CoffeeImg,
  Container,
  Control,
  Description,
  Order,
  Price,
  Tags,
  Title,
} from './styles'

type CoffeeCardProps = {
  coffee: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    price: number;
    image: string;
    quantity: number
  },
  incrementQuantity: (id: string) => void
  decrementQuantity: (id: string) => void
}

export function CoffeeCard({coffee, decrementQuantity, incrementQuantity}: CoffeeCardProps) {
  const theme = useTheme();

  function handleAddItem() {
    console.log('Adicionar item ao carrinho')
    return;
  }

  return (
    <Container>
      <CoffeeImg src={coffee.image} alt="Expresso Tradicional" />

      <Tags>
        {coffee.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </Tags>

      <Title>{coffee.title}</Title>

      <Description>{coffee.description}</Description>

      <Control>
        <Price>
          <span>R$</span>
          <span>{coffee.price}</span>
        </Price>

        <Order $itemAdded={false}>
          <QuantityInput
            quantity={coffee.quantity}
            incrementQuantity={() => {incrementQuantity(coffee.id)}}
            decrementQuantity={() => {decrementQuantity(coffee.id)}}
          />

          <button onClick={handleAddItem}>
            <ShoppingCart size={22} color={theme.colors['base-card']} />
          </button>
        </Order>
      </Control>
    </Container>
  )
}
