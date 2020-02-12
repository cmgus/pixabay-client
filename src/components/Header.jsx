import React from "react";
import { Hero, Title, Container } from "rbx"
const Header = (props) => {
  return(
    <Hero color="black">
      <Hero.Body>
        <Container textAlign="centered">
          <Title size="5">Search your photo</Title>
          {props.children}
        </Container>
      </Hero.Body>
    </Hero>
  )
}

export default Header