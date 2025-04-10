import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react'
import { useTheme } from 'styled-components'

import { CoffeeCard } from '../../components/CoffeeCard'

import { CoffeeList, Heading, Hero, HeroContent, Info } from './styles'
import { useEffect, useState } from 'react';

import axios from 'axios';

import { Loading } from '../../components/Loading';

interface Coffee {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: number;
  image: string;
  quantity: number;
};

export function Home() {
  const theme = useTheme();
  const [coffees, setCoffees] = useState<Coffee[]>([])

  async function getCoffes() {

    try {
      const result = await axios.get('http://localhost:3000/coffees')
      setCoffees(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCoffes()
  }, []);
  
  function incrementQuantity(id: string) {
    const coffee = coffees.find((coffee) => coffee.id === id);
    if (coffee) {
      coffee.quantity = coffee.quantity + 1;
      if (coffee.quantity > 5) {
        coffee.quantity = 5;
      }
      setCoffees((prevCoffees) =>
        prevCoffees.map((c) => (c.id === id ? { ...c, quantity: coffee.quantity } : c))
      );
    }
  }

  function decrementQuantity(id: string) {
    const coffee = coffees.find((coffee) => coffee.id === id);
    if (coffee) {
      coffee.quantity = coffee.quantity - 1;
      if (coffee.quantity < 0) {
        coffee.quantity = 0;
      }
      setCoffees((prevCoffees) =>
        prevCoffees.map((c) => (c.id === id ? { ...c, quantity: coffee.quantity } : c))
      );
    }
  }

  return (
    <div>
      <Hero>
        <HeroContent>
          <div>
            <Heading>
              <h1>Encontre o café perfeito para qualquer hora do dia</h1>

              <span>
                Com o Coffee Delivery você recebe seu café onde estiver, a
                qualquer hora
              </span>
            </Heading>

            <Info>
              <div>
                <ShoppingCart
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['yellow-dark'] }}
                />
                <span>Compra simples e segura</span>
              </div>

              <div>
                <Package
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['base-text'] }}
                />
                <span>Embalagem mantém o café intacto</span>
              </div>

              <div>
                <Timer
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors.yellow }}
                />
                <span>Entrega rápida e rastreada</span>
              </div>

              <div>
                <Coffee
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors.purple }}
                />
                <span>O café chega fresquinho até você</span>
              </div>
            </Info>
          </div>

          <img src="/images/hero.svg" alt="Café do Coffee Delivery" />
        </HeroContent>

        <img src="/images/hero-bg.svg" id="hero-bg" alt="" />
      </Hero>

      <CoffeeList>
        <h2>Nossos cafés</h2>

        <Loading></Loading>

        <div>
        {coffees.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={{
              id: coffee.id,
              title: coffee.title,
              description: coffee.description,
              tags: coffee.tags,
              price: coffee.price,
              image: coffee.image,
              quantity: coffee.quantity
            }}
            incrementQuantity={(id: string) => incrementQuantity(id)}
            decrementQuantity={(id: string) => decrementQuantity(id)}
            />
          ))}
        </div>
      </CoffeeList>
    </div>
  )
}
